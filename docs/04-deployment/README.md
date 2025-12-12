# 🚢 Deployment Documentation

Everything you need to deploy the John Flanders website to production.

## 📄 Documents in This Section

### [DEPLOYMENT.md](./DEPLOYMENT.md)
**Comprehensive deployment guide** - Deploy to any platform.

- 🌐 Multi-platform instructions
- ⚙️ Environment configuration
- 🔒 Security best practices
- 🐛 Troubleshooting guide

**Use this when:** Deploying for the first time or to a new platform.

---

### [VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md)
**Vercel-specific guide** - Recommended deployment platform.

- ⚡ Fastest deployment method
- 🔄 Automatic deployments
- 📊 Built-in analytics
- 💚 Zero configuration

**Use this when:** Deploying to Vercel (recommended).

---

### [QUICK-DEPLOY.md](./QUICK-DEPLOY.md)
**Quick reference** - Fast deployment commands and checklist.

- 🏃 Quick command reference
- ✅ Pre-deploy checklist
- ⚡ Common deployment tasks
- 🔧 Quick troubleshooting

**Use this when:** You need a quick reminder or reference.

---

## 🎯 Recommended Deployment: Vercel

### Why Vercel?
- ✅ **Easiest** - Zero configuration needed
- ✅ **Free tier** - Perfect for personal sites
- ✅ **Automatic deployments** - Push to Git = instant deploy
- ✅ **Built for Next.js** - Optimal performance
- ✅ **Global CDN** - Fast worldwide
- ✅ **SSL included** - Secure by default

### Quick Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# That's it! 🎉
```

For detailed instructions: [VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md)

---

## 🌐 Alternative Platforms

### GoDaddy
Currently hosting domain, can also host the site.
- ⚠️ More complex setup
- Requires Node.js hosting plan
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for full guide

### Netlify
Similar to Vercel, great alternative.
- Free tier available
- Easy Git integration
- Good performance

### DigitalOcean
More control, more complexity.
- VPS hosting
- Full server control
- Requires more DevOps knowledge

### AWS
Enterprise-scale option.
- Most powerful
- Most complex
- Higher cost

---

## ✅ Pre-Deployment Checklist

### Required
- [ ] MongoDB connection string configured
- [ ] Environment variables set
- [ ] Build succeeds locally (`npm run build`)
- [ ] All tests passing
- [ ] Real content added
- [ ] Domain configured

### Recommended
- [ ] Analytics setup
- [ ] Error monitoring (Sentry)
- [ ] Performance testing
- [ ] SEO optimization
- [ ] Social media tags
- [ ] Favicon and metadata

### Optional
- [ ] Custom domain
- [ ] Email integration
- [ ] Payment processing
- [ ] Admin dashboard
- [ ] Backup strategy

---

## 🔒 Security Checklist

### Before Going Live
- [ ] No credentials in code
- [ ] Environment variables secured
- [ ] HTTPS enabled (SSL)
- [ ] API routes protected
- [ ] Database secured
- [ ] Rate limiting on forms
- [ ] Input validation everywhere
- [ ] CORS configured properly

### After Launch
- [ ] Monitor error logs
- [ ] Check for security updates
- [ ] Review access logs
- [ ] Test forms for spam
- [ ] Monitor database usage

---

## ⚙️ Environment Variables

### Required for Production
```env
# Database
MONGODB_URI=mongodb+srv://...

# Site URL
NEXT_PUBLIC_SITE_URL=https://johnflanders.com

# Session (if using auth)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://johnflanders.com
```

### Setting Variables

**Vercel:**
1. Project Settings → Environment Variables
2. Add each variable
3. Redeploy

**GoDaddy:**
1. cPanel → Node.js App
2. Environment Variables section
3. Restart app

**Netlify:**
1. Site Settings → Build & deploy
2. Environment → Environment variables
3. Add each variable

---

## 🚀 Deployment Workflow

### Initial Deployment
1. **Prepare codebase**
   ```bash
   npm run build  # Test build
   npm run lint   # Check for errors
   ```

2. **Configure environment**
   - Set up MongoDB
   - Add environment variables
   - Configure domain

3. **Deploy**
   - Follow platform-specific guide
   - Verify deployment
   - Test live site

4. **Post-deployment**
   - Check all pages
   - Test forms
   - Verify media loads
   - Check mobile responsive

### Updating After Initial Deploy

**Vercel (automatic):**
```bash
git push origin main  # Automatic deployment!
```

**Manual:**
```bash
npm run build
# Upload build files to hosting
```

---

## 🐛 Deployment Troubleshooting

### Build Fails
**Error:** "Module not found"  
**Solution:** Run `npm install`, ensure dependencies in `package.json`

**Error:** "Type error"  
**Solution:** Run `npm run type-check`, fix TypeScript errors

**Error:** "Environment variable missing"  
**Solution:** Verify all env vars are set in hosting platform

### Site Loads But Broken
**Problem:** Blank page  
**Solution:** Check browser console, verify API routes working

**Problem:** Images missing  
**Solution:** Check `public/` folder uploaded, verify paths

**Problem:** API errors  
**Solution:** Verify MongoDB connection string, check logs

### Database Issues
**Problem:** Can't connect to MongoDB  
**Solution:** 
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has permissions

---

## 📊 Post-Deployment Monitoring

### What to Monitor
- **Uptime** - Is site accessible?
- **Performance** - Load times acceptable?
- **Errors** - Any 500 errors in logs?
- **Traffic** - Getting visitors?
- **Forms** - Submissions working?

### Monitoring Tools
- **Vercel Analytics** (built-in with Vercel)
- **Google Analytics** (free)
- **Sentry** (error tracking)
- **UptimeRobot** (uptime monitoring)

### Regular Checks
- **Daily:** Quick visual check
- **Weekly:** Review analytics
- **Monthly:** Performance audit
- **Quarterly:** Security review

---

## 🔄 CI/CD Pipeline (Optional)

### Automatic Deployments
With Vercel or Netlify, you get this automatically:

```
Git Push → Build → Test → Deploy → Live
```

### Manual CI/CD
If using other hosting:

1. **GitHub Actions** for automated testing
2. **Build on successful tests**
3. **Deploy to hosting**
4. **Notify team**

---

## 📈 Performance Optimization

### Before Deploy
- [ ] Optimize images (WebP, correct sizes)
- [ ] Minify CSS/JS (automatic with Next.js)
- [ ] Enable compression
- [ ] Set cache headers

### After Deploy
- [ ] Test with Lighthouse
- [ ] Check PageSpeed Insights
- [ ] Monitor Core Web Vitals
- [ ] Optimize based on metrics

---

## 🌐 Domain Configuration

### Connecting Custom Domain

**Vercel:**
1. Project Settings → Domains
2. Add `johnflanders.com`
3. Follow DNS instructions
4. Wait for propagation (can take 48 hours)

**GoDaddy:**
1. Domain Management
2. DNS Settings
3. Update A/CNAME records
4. Point to hosting

### DNS Records
```
Type    Name    Value
A       @       [hosting IP]
CNAME   www     [hosting domain]
```

---

## ✅ Launch Day Checklist

### 1 Day Before
- [ ] Final content review
- [ ] Test all functionality
- [ ] Backup current site
- [ ] Notify stakeholders

### Launch Day
- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Test all critical paths
- [ ] Monitor for errors
- [ ] Update DNS (if needed)

### 1 Day After
- [ ] Check analytics
- [ ] Review error logs
- [ ] Test from multiple devices
- [ ] Gather initial feedback

---

## 🆘 Emergency Rollback

If something goes wrong:

**Vercel:**
1. Deployments → Previous deployment
2. Click "Promote to Production"
3. Instant rollback ✅

**Manual:**
1. `git revert HEAD`
2. Redeploy previous version
3. Fix issue in separate branch

---

## 📞 Getting Help

### Deployment Issues
1. Check platform status pages
2. Review deployment logs
3. Consult platform documentation
4. Check community forums

### Platform Support
- **Vercel:** https://vercel.com/support
- **Netlify:** https://www.netlify.com/support/
- **GoDaddy:** https://www.godaddy.com/help

---

[← Back to Documentation Hub](../README.md)





