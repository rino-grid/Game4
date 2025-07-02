'use client'

import React, { useEffect, useRef, useState } from 'react'

interface DashboardShaderProps {
  avatarUrl?: string
}

export default function DashboardShader({ avatarUrl }: DashboardShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dominantColor, setDominantColor] = useState([0.2, 0.2, 0.4]) // Default blue-ish
  
  // Extract dominant color from avatar
  useEffect(() => {
    if (!avatarUrl) return
    
    const extractColor = async () => {
      try {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) return
          
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          
          // Extract dominant color using color quantization
          const colorCounts: { [key: string]: number } = {}
          
          for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            const a = data[i + 3]
            
            if (a > 128) { // Skip transparent pixels
              // Quantize colors to reduce variations
              const qR = Math.floor(r / 32) * 32
              const qG = Math.floor(g / 32) * 32
              const qB = Math.floor(b / 32) * 32
              
              const colorKey = `${qR},${qG},${qB}`
              colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1
            }
          }
          
          // Find most common color
          let maxCount = 0
          let dominantRGB = [64, 64, 128] // Default fallback
          
          for (const [colorKey, count] of Object.entries(colorCounts)) {
            if (count > maxCount) {
              maxCount = count
              dominantRGB = colorKey.split(',').map(Number)
            }
          }
          
          // Normalize to 0-1 range and adjust for shader
          const normalizedColor = [
            dominantRGB[0] / 255 * 0.8, // Reduce intensity
            dominantRGB[1] / 255 * 0.8,
            dominantRGB[2] / 255 * 0.8
          ]
          
          setDominantColor(normalizedColor)
        }
        
        img.src = avatarUrl
      } catch (error) {
        console.log('Could not extract color from avatar:', error)
      }
    }
    
    extractColor()
  }, [avatarUrl])

  // WebGL shader setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader with dynamic color
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_color;
      
      float noise(vec2 p) {
        return sin(p.x * 12.0 + p.y * 8.0 + u_time * 0.5) * 0.5 + 0.5;
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        
        // Create flowing pattern based on extracted color
        float n1 = noise(uv * 3.0 + u_time * 0.1);
        float n2 = noise(uv * 5.0 - u_time * 0.15);
        float n3 = noise(uv * 2.0 + u_time * 0.08);
        
        // Combine noise patterns
        float pattern = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
        
        // Apply user's avatar color with subtle variations
        vec3 color1 = u_color;
        vec3 color2 = u_color * 0.6;
        vec3 color3 = u_color * 1.2;
        
        // Mix colors based on pattern
        vec3 finalColor = mix(color1, color2, pattern);
        finalColor = mix(finalColor, color3, smoothstep(0.7, 1.0, pattern));
        
        // Add some depth with gradient
        float gradient = 1.0 - length(uv - 0.5) * 0.8;
        finalColor *= gradient;
        
        // Subtle alpha for background effect
        gl_FragColor = vec4(finalColor, 0.3);
      }
    `

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) return null
      
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      
      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    // Set up buffers
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const colorLocation = gl.getUniformLocation(program, 'u_color')

    function resize() {
      if (!canvas || !gl) return
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
    }

    function render(time: number) {
      if (!gl || !canvas || !program) return
      
      resize()
      
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      
      gl.useProgram(program)
      
      gl.enableVertexAttribArray(positionLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      
      gl.uniform1f(timeLocation, time * 0.001)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform3f(colorLocation, dominantColor[0], dominantColor[1], dominantColor[2])
      
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      
      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

    return () => {
      if (gl && program) gl.deleteProgram(program)
      if (gl && vertexShader) gl.deleteShader(vertexShader)
      if (gl && fragmentShader) gl.deleteShader(fragmentShader)
    }
  }, [dominantColor])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  )
}