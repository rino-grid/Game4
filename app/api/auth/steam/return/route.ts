import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

// Helper function to get the correct redirect URL
function getRedirectUrl(request: NextRequest): string {
  const hostname = new URL(request.url).hostname
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
  
  return isLocalhost 
    ? 'http://localhost:3000'
    : 'https://po.gridbased.dev'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  try {
    // Verify OpenID response
    const mode = searchParams.get('openid.mode')
    const identity = searchParams.get('openid.identity')
    
    if (mode !== 'id_res' || !identity) {
      const redirectUrl = getRedirectUrl(request)
      return NextResponse.redirect(new URL('/dashboard?error=invalid_response', redirectUrl))
    }

    // Extract Steam ID from identity URL
    const steamIdMatch = identity.match(/https:\/\/steamcommunity\.com\/openid\/id\/(\d+)/)
    if (!steamIdMatch) {
      const redirectUrl = getRedirectUrl(request)
      return NextResponse.redirect(new URL('/dashboard?error=invalid_steam_id', redirectUrl))
    }
    
    const steamId = steamIdMatch[1]

    // Verify the OpenID signature with Steam
    const verifyParams = new URLSearchParams()
    searchParams.forEach((value, key) => {
      if (key.startsWith('openid.')) {
        verifyParams.append(key, value)
      }
    })
    verifyParams.set('openid.mode', 'check_authentication')

    const verifyResponse = await fetch('https://steamcommunity.com/openid/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: verifyParams.toString(),
    })

    const verifyText = await verifyResponse.text()
    
    if (!verifyText.includes('is_valid:true')) {
      const redirectUrl = getRedirectUrl(request)
      return NextResponse.redirect(new URL('/dashboard?error=verification_failed', redirectUrl))
    }

    // Fetch user data from Steam Web API (optional, requires API key)
    // For now, we'll just use the Steam ID and redirect to success
    
    // Create a simple session token (in production, use proper JWT or session management)
    const sessionToken = crypto.randomBytes(32).toString('hex')
    
    // In production, store this in a database or Redis
    // For now, we'll use a cookie with the steam ID
    
    const redirectUrl = getRedirectUrl(request)
    const response = NextResponse.redirect(new URL('/dashboard?success=true', redirectUrl))
    
    // Set session cookie
    response.cookies.set('steam_session', JSON.stringify({
      steamid: steamId,
      token: sessionToken,
      timestamp: Date.now()
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    return response
    
  } catch (error) {
    console.error('Steam auth error:', error)
    const redirectUrl = getRedirectUrl(request)
    return NextResponse.redirect(new URL('/dashboard?error=server_error', redirectUrl))
  }
}