/**
 * EXAMEN - WebGL Shader Implementation
 * Provides a dynamic background effect for the game's header
 */

// Set up WebGL context and shader
const canvas = document.getElementById('shader-canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    console.error('WebGL not supported in your browser');
    document.body.classList.add('fallback');
}

// Vertex shader program
const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
    
    varying vec2 v_uv;
    
    void main() {
        gl_Position = aVertexPosition;
        v_uv = aTextureCoord;
    }
`;

// Fragment shader program (modified for compatibility)
const fsSource = `
    precision highp float;
    
    uniform vec2 u_resolution;
    uniform float u_time;
    
    varying vec2 v_uv;
    
    // Noise functions
    vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
    
    float cnoise(vec2 P) {
      vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
      Pi = mod289(Pi);
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;
      vec4 i = permute(permute(ix) + iy);
      vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
      vec4 gy = abs(gx) - 0.5;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;
      vec2 g00 = vec2(gx.x, gy.x);
      vec2 g10 = vec2(gx.y, gy.y);
      vec2 g01 = vec2(gx.z, gy.z);
      vec2 g11 = vec2(gx.w, gy.w);
      vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
      g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
      float n00 = dot(g00, vec2(fx.x, fy.x));
      float n10 = dot(g10, vec2(fx.y, fy.y));
      float n01 = dot(g01, vec2(fx.z, fy.z));
      float n11 = dot(g11, vec2(fx.w, fy.w));
      vec2 fade_xy = fade(Pf.xy);
      vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
      return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
    }
    
    #define OCTAVES 6
    float fbm(vec2 p, float frequency, float amplitude) {
      float value = 0.0;
      float amp = 1.0;
      float freq = frequency;
      
      for (int i = 0; i < OCTAVES; i++) {
        value += amp * abs(cnoise(p));
        p *= freq;
        amp *= amplitude;
      }
      return value;
    }
    
    float pattern(vec2 p, float time, float waveSpeed, float frequency, float amplitude) {
      vec2 p2 = p - time * waveSpeed;
      return fbm(p - fbm(p + fbm(p2, frequency, amplitude), frequency, amplitude), frequency, amplitude);
    }
    
    // Modified dithering function without using array literals
    float getBayerValue(int x, int y) {
      // Bayer matrix 4x4 (smaller for compatibility)
      if (x == 0 && y == 0) return 0.0/16.0;
      if (x == 0 && y == 1) return 8.0/16.0;
      if (x == 0 && y == 2) return 2.0/16.0;
      if (x == 0 && y == 3) return 10.0/16.0;
      
      if (x == 1 && y == 0) return 12.0/16.0;
      if (x == 1 && y == 1) return 4.0/16.0;
      if (x == 1 && y == 2) return 14.0/16.0;
      if (x == 1 && y == 3) return 6.0/16.0;
      
      if (x == 2 && y == 0) return 3.0/16.0;
      if (x == 2 && y == 1) return 11.0/16.0;
      if (x == 2 && y == 2) return 1.0/16.0;
      if (x == 2 && y == 3) return 9.0/16.0;
      
      if (x == 3 && y == 0) return 15.0/16.0;
      if (x == 3 && y == 1) return 7.0/16.0;
      if (x == 3 && y == 2) return 13.0/16.0;
      if (x == 3 && y == 3) return 5.0/16.0;
      
      return 0.0;
    }
    
    vec3 dither(vec2 uv, vec3 color, float colorNum, float pixelSize) {
      // Snap to pixel grid to prevent artifacts
      vec2 pixelCoord = floor(uv * u_resolution / pixelSize) * pixelSize;
      
      // Use 4x4 Bayer matrix instead of 8x8
      int x = int(mod(pixelCoord.x, 4.0));
      int y = int(mod(pixelCoord.y, 4.0));
      
      // Apply threshold dithering
      float threshold = getBayerValue(x, y) - 0.25;
      color += threshold;
      
      // Apply color quantization
      return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
    }
    
    void main() {
      // Adjust for aspect ratio
      vec2 uv = v_uv - 0.5;
      uv.x *= u_resolution.x / u_resolution.y;
      
      // Wave parameters - adjusted for darker theme
      float waveSpeed = 0.02;
      float waveFrequency = 2.2;
      float waveAmplitude = 0.4;
      vec3 waveColor = vec3(0.7, 0.7, 0.7);
      
      // Generate wave pattern
      float f = pattern(uv, u_time, waveSpeed, waveFrequency, waveAmplitude);
      
      // Map pattern to color
      vec3 color = mix(vec3(0.1, 0.1, 0.1), waveColor, f);
      
      // Apply dithering
      float colorNum = 4.0;
      float pixelSize = 2.0;
      color = dither(v_uv, color, colorNum, pixelSize);
      
      gl_FragColor = vec4(color, 1.0);
      
      // Prevent diagonal line artifacts by rounding to a fixed precision
      gl_FragColor.rgb = floor(gl_FragColor.rgb * 255.0) / 255.0;
    }
`;

// Initialize shader program
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
    if (!vertexShader || !fragmentShader) {
        return null;
    }
    
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    
    return shaderProgram;
}

// Create a shader of the given type
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

// Initialize buffers for the quad
function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Create a square
    const positions = [
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0,
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    
    const textureCoordinates = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    
    return {
        position: positionBuffer,
        textureCoord: textureCoordBuffer,
    };
}

// Draw the scene
function drawScene(gl, programInfo, buffers, time) {
    // Set canvas size to window size
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Check if program is valid
    if (!programInfo || !programInfo.program) {
        console.error("Invalid shader program");
        return;
    }
    
    // Tell WebGL how to pull out the positions from the position buffer
    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }
    
    // Tell WebGL how to pull out the texture coordinates from buffer
    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
        gl.vertexAttribPointer(
            programInfo.attribLocations.textureCoord,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
    }
    
    // Tell WebGL to use our program
    gl.useProgram(programInfo.program);
    
    // Set the uniforms
    gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(programInfo.uniformLocations.time, time);
    
    // Draw
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
}

// Resize canvas to match display size
function resizeCanvasToDisplaySize(canvas) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
    
    if (needResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    
    return needResize;
}

// Initialize the shader program
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

if (!shaderProgram) {
    console.error("Failed to create shader program. Falling back to basic background.");
    document.querySelector('.header').style.background = "linear-gradient(135deg, #333 0%, #111 100%)";
} else {
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
            resolution: gl.getUniformLocation(shaderProgram, 'u_resolution'),
            time: gl.getUniformLocation(shaderProgram, 'u_time'),
        },
    };
    
    // Initialize buffers
    const buffers = initBuffers(gl);
    
    // Animation loop
    function render(now) {
        now *= 0.001;  // Convert to seconds
        
        drawScene(gl, programInfo, buffers, now);
        
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
}
