'use client'

import React, { useState, useEffect } from 'react'

interface SteamAuthProps {
  onLoginSuccess: (userData: any) => void
}

export default function SteamAuth({ onLoginSuccess }: SteamAuthProps) {
  const [loading, setLoading] = useState(false)
  const [steamUrl, setSteamUrl] = useState<string>('')

  useEffect(() => {
    // Generate Steam OpenID URL on component mount
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    
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
    
    setSteamUrl(steamOpenIdUrl)
  }, [])

  const handleSteamLogin = (e: React.MouseEvent) => {
    // Prevent clicking if already loading
    if (loading) {
      e.preventDefault()
      return
    }
    
    // Log for debugging
    console.log('Steam login clicked, redirecting to:', steamUrl)
    
    // Add loading state for enhanced experience
    setLoading(true)
    // Let the natural link behavior handle the redirect
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <a
        href={steamUrl}
        onClick={handleSteamLogin}
        className={`steam-auth-button flex items-center gap-3 bg-[#171a21] hover:bg-[#1b2129] border border-[#2a475e] text-white px-6 py-3 rounded-md transition-colors text-decoration-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        {...(loading ? { 'aria-disabled': true } : {})}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.979 0C5.678 0 0.511 4.86 0.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.62 20.51 6.363 24.571 11.979 24.571c6.649 0 12.021-5.373 12.021-12.021C24 5.372 18.628.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.255 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.393 1.497.993 2.454-.4.957-1.497 1.393-2.454.993-.001 0-.001 0-.001.001l.016.014z"/>
            </svg>
            <span>Sign in through Steam</span>
          </>
        )}
      </a>
      
      <p className="text-xs text-gray-500 text-center max-w-sm">
        We use Steam OpenID to verify your identity. No passwords or sensitive data are shared.
      </p>
    </div>
  )
}