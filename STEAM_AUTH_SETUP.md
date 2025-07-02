# Steam Authentication Setup Guide

## 🎮 Steam OpenID Integration

This project uses **Steam OpenID** for user authentication - no API key required from Valve! This allows players to log in with their Steam accounts to access the game dashboard.

## ⚡ Quick Start

The Steam authentication is **ready to use** immediately after deployment. No additional setup required!

### How It Works

1. **User clicks "Sign in through Steam"**
2. **Redirected to Steam's OpenID login**
3. **User authenticates with Steam**
4. **Steam redirects back with identity verification**
5. **Our backend verifies the response with Steam**
6. **User is logged in with basic profile info**

## 🔧 Configuration Options

### Basic Setup (Current - No API Key)
- ✅ **Works immediately**
- ✅ **Verifies Steam identity**
- ✅ **Gets Steam ID**
- ❌ Limited profile information (uses fallback data)

### Enhanced Setup (Optional - Requires Steam Web API Key)
- ✅ **Full Steam profile data**
- ✅ **Avatar images**
- ✅ **Display names**
- ✅ **Profile URLs**

## 🚀 Getting Steam Web API Key (Optional)

If you want full Steam profile information:

1. **Visit**: https://steamcommunity.com/dev/apikey
2. **Sign in** with your Steam account
3. **Fill out the form**:
   - Domain: `persistent-object.gridbased.dev`
   - Agree to terms
4. **Get your API key**
5. **Add to Netlify environment variables**:
   ```
   STEAM_WEB_API_KEY=your_api_key_here
   ```

## 🔐 Security Features

### Steam OpenID Verification
- **Signature verification** with Steam servers
- **Identity URL validation** 
- **Secure session management**
- **HttpOnly cookies** for session storage
- **7-day session expiration**

### No Sensitive Data
- **No passwords stored**
- **No Steam credentials handled**
- **Only Steam ID and public profile data**
- **Steam handles all authentication**

## 🌐 Production Deployment

### Netlify Configuration
The project is configured for Netlify with:
- **Next.js Plugin** for full feature support
- **Serverless Functions** for API routes
- **Environment variables** for Steam API key (optional)

### Environment Variables (Netlify Dashboard)
```bash
# Optional - only needed for enhanced profile data
STEAM_WEB_API_KEY=your_steam_api_key

# These are automatically set by the application
NODE_ENV=production
```

## 🛠️ Technical Implementation

### API Routes
- `/api/auth/steam/return` - Handles Steam OpenID callbacks
- `/api/auth/steam/verify` - Verifies user sessions
- `/api/auth/steam/logout` - Handles user logout

### Session Management
- **Secure HTTP-only cookies**
- **JSON Web Token style session data**
- **Automatic expiration handling**
- **Cross-request persistence**

### Fallback Handling
Without Steam Web API key:
- Uses generic Steam avatar
- Shows "Player XXXX" display name
- Still provides full authentication
- All core features work

## 🎯 User Experience

### Login Flow
1. User visits `/dashboard`
2. Sees Steam login button
3. Clicks "Sign in through Steam"
4. Redirected to Steam (OpenID)
5. Authenticates with Steam
6. Redirected back to dashboard
7. Automatically logged in

### Dashboard Features
- **Steam profile display**
- **Game status updates**
- **Community integration**
- **Settings management**
- **News and updates**

## 🔧 Development

### Local Testing
```bash
npm run dev
# Visit http://localhost:3000/dashboard
# Test Steam login flow
```

### Environment Variables (.env.local)
```bash
# Optional for local development
STEAM_WEB_API_KEY=your_api_key
```

## 📝 Notes

- **No approval needed** from Valve for OpenID
- **Production ready** immediately
- **Scales automatically** with Netlify
- **Secure by design** using Steam's infrastructure
- **Future-proof** for game integrations

## 🆘 Troubleshooting

### Common Issues

**"Authentication failed"**
- Check domain configuration in Steam API
- Verify HTTPS in production
- Check console for errors

**"Session expired"**
- Normal after 7 days
- User needs to re-authenticate
- Session automatically cleared

**"No profile data"**
- Expected without Steam Web API key
- Basic functionality still works
- Consider adding API key for enhanced experience

### Support Resources
- Steam OpenID Documentation: https://steamcommunity.com/dev
- Next.js API Routes: https://nextjs.org/docs/api-routes/introduction
- Netlify Functions: https://docs.netlify.com/functions/overview/