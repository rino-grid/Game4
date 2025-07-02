# Troubleshooting Guide - Steam Authentication

## 🔧 Steam Login Issues

### Issue: "Steam login redirects through Netlify staging URL"

**Problem**: When clicking Steam login, you see URLs like:
```
https://68653194e57b4f00088e0f91--persistent-object.netlify.app/dashboard/?success=true
```

**Solution**: This is normal during development/staging. The authentication still works correctly. Once you visit the actual domain (`po.gridbased.dev/dashboard`), you'll be properly logged in.

### Issue: "Steam avatar not showing / Default avatar displayed"

**Problem**: You see a generic Steam avatar instead of your actual Steam profile picture.

**Cause**: This happens when no Steam Web API key is configured.

**Solutions**:

1. **Quick Fix (Default Experience)**:
   - This is expected behavior without an API key
   - Authentication still works perfectly
   - You'll see your Steam ID correctly
   - Display name shows as "Player XXXX"

2. **Enhanced Fix (Full Profile)**:
   - Get a Steam Web API key from: https://steamcommunity.com/dev/apikey
   - Add it to your hosting platform environment variables:
     ```
     STEAM_WEB_API_KEY=your_actual_api_key_here
     ```
   - Redeploy the site
   - Now you'll see your actual Steam avatar and display name

### Issue: "Authentication failed" error

**Possible Causes & Solutions**:

1. **Domain Mismatch**:
   - Ensure you're using `po.gridbased.dev` not `persistent-object.gridbased.dev`
   - Check that your Steam API key (if any) is configured for the correct domain

2. **HTTPS Issues**:
   - Steam OpenID requires HTTPS in production
   - Local development (`localhost`) works with HTTP

3. **Cookie Issues**:
   - Clear browser cookies for the site
   - Try in incognito/private browsing mode

### Issue: "Session expires too quickly"

**Explanation**: Sessions are set to expire after 7 days for security.

**Solutions**:
- Normal behavior - just re-authenticate when needed
- Sessions automatically clean up expired data

## 🌐 Domain & Deployment Issues

### Issue: "Wrong domain in Steam redirect URLs"

**Check These Files** should all use `po.gridbased.dev`:
- `app/components/SteamAuth.tsx` (baseUrl variable)
- `app/layout.tsx` (metadataBase)
- `app/sitemap.ts` (baseUrl)
- `app/robots.ts` (sitemap URL)

### Issue: "Build fails with TypeScript errors"

**Common Solutions**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Issue: "API routes not working on Netlify"

**Check**:
- `netlify.toml` has `@netlify/plugin-nextjs` plugin enabled
- Environment variables are set in Netlify dashboard
- Functions are deploying correctly

## 🎮 User Experience Issues

### Issue: "Navigation title showing on homepage"

**Expected Behavior**: 
- Homepage: No "PERSISTENT OBJECT" title in nav
- Dashboard: Shows "PERSISTENT OBJECT" title in nav

**If broken**: Navigation component uses `usePathname()` to conditionally show title.

### Issue: "Globe icon not showing in navigation"

**Check**: Navigation component should have a globe/world icon, not dashboard squares.

## 🚀 Performance Issues

### Issue: "Fonts not loading properly"

**Solutions**:
- Check Google Fonts preconnect links in `layout.tsx`
- Verify BIZ UDMincho font family declarations in CSS
- Clear browser cache

### Issue: "WebGL shader not rendering"

**Debugging**:
1. Check browser console for WebGL errors
2. Test in different browsers
3. Verify WebGL support: https://get.webgl.org/
4. Check `ShaderCanvas` component for errors

## 🔍 Development Debugging

### Local Steam Testing

**Setup**:
```bash
npm run dev
# Visit http://localhost:3000/dashboard
# Steam auth will work in development
```

**Note**: Use actual Steam account for testing - no sandbox needed.

### Production Testing

**Steps**:
1. Deploy to staging URL first
2. Test Steam auth flow
3. Check console for JavaScript errors
4. Verify all redirects work correctly
5. Test on mobile devices

### Environment Variables

**Required for Enhanced Steam Profiles**:
```bash
# In Netlify dashboard or .env.local
STEAM_WEB_API_KEY=your_steam_api_key
```

**Auto-set by Platform**:
```bash
NODE_ENV=production
NETLIFY=true (on Netlify)
VERCEL=1 (on Vercel)
```

## 📞 Getting Help

### Check These First
1. **Browser Console**: Look for JavaScript errors
2. **Network Tab**: Check failed requests
3. **Steam Status**: https://steamstat.us/
4. **Hosting Platform Status**: Check Netlify/Vercel status pages

### Useful Tools
- **Steam ID Finder**: https://steamidfinder.com/
- **OpenID Validator**: Manual testing tools
- **WebGL Test**: https://get.webgl.org/

### Community Support
- Create GitHub issue with:
  - Browser and version
  - Steps to reproduce
  - Console error messages
  - Screenshot if relevant

## 🔐 Security Notes

### What's Safe
- ✅ Steam OpenID is secure and approved by Valve
- ✅ No passwords or sensitive data stored
- ✅ Only public Steam ID and profile data accessed
- ✅ Sessions expire automatically for security

### What to Monitor
- 🔍 Check access logs for unusual activity
- 🔍 Monitor session duration and cleanup
- 🔍 Keep dependencies updated for security patches

### Best Practices
- 🛡️ Never log sensitive user data
- 🛡️ Use HTTPS everywhere in production
- 🛡️ Regularly rotate Steam API keys
- 🛡️ Monitor for failed authentication attempts