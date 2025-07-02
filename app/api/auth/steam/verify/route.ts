import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const steamSession = request.cookies.get('steam_session')
    
    if (!steamSession) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 })
    }
    
    const sessionData = JSON.parse(steamSession.value)
    const { steamid, timestamp } = sessionData
    
    // Check if session is expired (7 days)
    const sessionAge = Date.now() - timestamp
    const maxAge = 60 * 60 * 24 * 7 * 1000 // 7 days in milliseconds
    
    if (sessionAge > maxAge) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 })
    }
    
    // Fetch user data from Steam Web API if API key is available
    const steamApiKey = process.env.STEAM_WEB_API_KEY
    
    if (steamApiKey) {
      try {
        const steamResponse = await fetch(
          `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamid}`
        )
        
        if (steamResponse.ok) {
          const steamData = await steamResponse.json()
          const player = steamData.response.players[0]
          
          if (player) {
            return NextResponse.json({
              steamid: player.steamid,
              personaname: player.personaname,
              avatar: player.avatar,
              avatarfull: player.avatarfull,
              profileurl: player.profileurl
            })
          }
        }
      } catch (error) {
        console.error('Failed to fetch Steam data:', error)
      }
    }
    
    // Fallback: return basic session data without Steam API
    return NextResponse.json({
      steamid,
      personaname: `Player ${steamid.slice(-4)}`,
      avatar: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
      avatarfull: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
      profileurl: `https://steamcommunity.com/profiles/${steamid}`
    })
    
  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }
}