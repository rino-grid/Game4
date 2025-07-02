'use client'

import React, { useState } from 'react'

interface SteamAuthProps {
  onLoginSuccess: (userData: any) => void
}

export default function SteamAuth({ onLoginSuccess }: SteamAuthProps) {
  const [loading, setLoading] = useState(false)

  const handleSteamLogin = async () => {
    setLoading(true)
    
    try {
      // Redirect to Steam OpenID authentication
      // Force the correct domain regardless of hosting environment
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const baseUrl = isLocalhost 
        ? 'http://localhost:3000'
        : 'https://po.gridbased.dev'
      
      const returnUrl = `${baseUrl}/api/auth/steam/return`
      
      const steamOpenIdUrl = `https://steamcommunity.com/openid/login?` +
        `openid.ns=http://specs.openid.net/auth/2.0&` +
        `openid.mode=checkid_setup&` +
        `openid.return_to=${encodeURIComponent(returnUrl)}&` +
        `openid.realm=${encodeURIComponent(baseUrl)}&` +
        `openid.identity=http://specs.openid.net/auth/2.0/identifier_select&` +
        `openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`
      
      // Redirect to Steam
      window.location.href = steamOpenIdUrl
      
    } catch (error) {
      console.error('Steam login failed:', error)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleSteamLogin}
        disabled={loading}
        className="flex items-center gap-3 bg-[#171a21] hover:bg-[#1b2129] border border-[#2a475e] text-white px-6 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.234-.636-.395-.636-.395l-.009.006c-.219-.092-.462-.092-.708-.03l-.003-.003c-.128.042-.25.114-.354.213l-.125.124c-.16.176-.268.38-.268.616v3.426l.246.098c.55.22 1.014.594 1.327 1.073.313.479.473 1.034.473 1.614 0 .816-.299 1.56-.796 2.129-.497.569-1.199.904-1.973.904-.774 0-1.476-.335-1.973-.904-.497-.569-.796-1.313-.796-2.129 0-.58.16-1.135.473-1.614.313-.479.777-.853 1.327-1.073l.246-.098V9.09c0-.236-.108-.44-.268-.616l-.125-.124c-.104-.099-.226-.171-.354-.213l-.003.003c-.246-.062-.489-.062-.708.03l-.009-.006s-.467.161-.636.395c-.169.234-.169.519 0 .753.169.234.636.395.636.395l.009-.006c.219.092.462.092.708.03l.003.003c.128-.042.25-.114.354-.213l.125-.124c.16-.176.268-.38.268-.616V5.302l-.246-.098c-.55-.22-1.014-.594-1.327-1.073C7.773 3.652 7.613 3.097 7.613 2.517c0-.816.299-1.56.796-2.129C8.906-.181 9.608-.516 10.382-.516c.774 0 1.476.335 1.973.904.497.569.796 1.313.796 2.129 0 .58-.16 1.135-.473 1.614-.313.479-.777.853-1.327 1.073l-.246.098V8.91c0 .236.108.44.268.616l.125.124c.104.099.226.171.354.213l.003-.003c.246.062.489.062.708-.03l.009.006s.467-.161.636-.395c.169-.234.169-.519 0-.753z"/>
            </svg>
            <span>Sign in through Steam</span>
          </>
        )}
      </button>
      
      <p className="text-xs text-gray-500 text-center max-w-sm">
        We use Steam OpenID to verify your identity. No passwords or sensitive data are shared.
      </p>
    </div>
  )
}