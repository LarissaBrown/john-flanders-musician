# 🚀 Vercel Deployment Guide - John Flanders Website

## Why Vercel?

✅ **Perfect for Next.js** - Built by the creators of Next.js
✅ **Free Tier** - Free for personal/small business sites
✅ **Automatic Deployments** - Push to GitHub = instant deploy
✅ **Preview URLs** - Share with client before going live
✅ **Easy Domain Connection** - Connect johnflanders.com later
✅ **No Server Management** - Everything handled for you

## Step-by-Step Deployment

### Part 1: GitHub Setup (5 minutes)

You'll need to push this code to GitHub first, so Vercel can deploy from there.

#### Option A: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop** (if you don't have it)
   - Visit: https://desktop.github.com
   - Install and sign in

2. **Create Repository**
   - Click "File" → "Add Local Repository"
   - Navigate to this folder
   - Click "Publish Repository"
   - Name: `john-flanders-musician`
   - Keep it Private (unless you want it public)
   - Click "Publish Repository"

#### Option B: Using Command Line

```bash
# 1. Create new repo on GitHub.com first
# Go to github.com/new and create "john-flanders-musician"

# 2. Add remote and push
cd /Users/larissabrown/Desktop/john-flanders-musician/john-flanders-musician
git remote add origin https://github.com/YOUR_USERNAME/john-flanders-musician.git
git branch -M main
git push -u origin main
```

### Part 2: MongoDB Setup (10 minutes)

**IMPORTANT**: You need this BEFORE deploying to Vercel!

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Sign up (use Google/GitHub for easy signup)

2. **Create Database Cluster**
   - Choose "M0 FREE" tier
   - Select region closest to you (US West for Utah)
   - Cluster name: `john-flanders` (or any name)
   - Click "Create Deployment"

3. **Create Database User**
   - Username: `johnflanders` (or any username)
   - Password: Generate a secure password (SAVE THIS!)
   - Click "Create Database User"

4. **Set Network Access**
   - Click "Network Access" in sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in sidebar
   - Click "Connect" on your cluster
   - Click "Drivers"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Replace `?` with `/john-flanders?`
   
   Final format:
   ```
   mongodb+srv://username:yourpassword@cluster.mongodb.net/john-flanders?retryWrites=true&w=majority
   ```

**SAVE THIS CONNECTION STRING** - You'll need it for Vercel!

### Part 3: PayPal Setup (Optional - 5 minutes)

Only if you want the shop to work immediately:

1. **Create PayPal Developer Account**
   - Go to: https://developer.paypal.com
   - Log in with your PayPal account (or create one)

2. **Create App**
   - Go to "Dashboard" → "Apps & Credentials"
   - Make sure you're on "Sandbox" tab for testing
   - Click "Create App"
   - Name: `John Flanders Shop`
   - Click "Create App"

3. **Get Client ID**
   - Copy the "Client ID" shown
   - **SAVE THIS** for Vercel

4. **For Production (Later)**
   - Switch to "Live" tab
   - Create another app
   - Get the Live Client ID

### Part 4: Deploy to Vercel (5 minutes)

1. **Create Vercel Account**
   - Go to: https://vercel.com/signup
   - Sign up with GitHub (easiest)
   - Authorize Vercel to access GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your `john-flanders-musician` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Add Environment Variables** ⚠️ CRITICAL!
   
   Click "Environment Variables" and add these:

   ```
   Key: MONGODB_URI
   Value: mongodb+srv://username:password@cluster.mongodb.net/john-flanders?retryWrites=true&w=majority
   
   Key: NEXT_PUBLIC_SITE_URL
   Value: https://john-flanders-musician.vercel.app (Vercel will show you this)
   
   Key: NEXT_PUBLIC_PAYPAL_CLIENT_ID
   Value: Your_PayPal_Client_ID_Here (if you set up PayPal)
   ```

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes while Vercel builds
   - ✅ Success! You'll get a URL

### Part 5: Share with Client

Once deployed, you'll get a URL like:
```
https://john-flanders-musician.vercel.app
```

**Share this with your client** to show progress! 🎉

Every time you push to GitHub, Vercel will automatically deploy updates.

### Part 6: Connect Custom Domain (Later)

When ready to use johnflanders.com:

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add: `johnflanders.com`
   - Add: `www.johnflanders.com`

2. **In GoDaddy**
   - Go to DNS settings for johnflanders.com
   - Add these records (Vercel will tell you exactly what):
   
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS** (can take 24-48 hours)

## Information You Need for Vercel

### Required:
- ✅ GitHub account (to store code)
- ✅ MongoDB connection string (database)

### Optional but Recommended:
- ⚠️ PayPal Client ID (for shop to work)
- ⚠️ Custom domain (johnflanders.com) - can add later

### Not Needed Immediately:
- ❌ Email service (can add later)
- ❌ Payment verification (can add later)

## Is It Specific to This Repo?

**Yes and No:**

**Yes** - The Vercel project will be connected to this specific GitHub repository:
- Only this repo's code will be deployed
- Automatic deployments only from this repo
- Other repos won't affect this deployment

**No** - You can create multiple Vercel projects:
- Different repos can have different Vercel projects
- One Vercel account can host many sites
- Each gets its own URL

## Quick Setup Checklist

### Before Deploying:
- [x] Code committed to Git ✅ (Done!)
- [ ] GitHub repository created
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string saved
- [ ] (Optional) PayPal Client ID obtained

### During Deployment:
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Environment variables added
- [ ] First deployment successful

### After Deployment:
- [ ] Test the preview URL
- [ ] Share with client
- [ ] Make updates → Push to GitHub → Auto-deploy!

## Making Updates

Once deployed, the workflow is simple:

```bash
# 1. Make changes to your code
# 2. Commit changes
git add .
git commit -m "Updated hero image"

# 3. Push to GitHub
git push

# 4. Vercel automatically deploys! (takes ~2 minutes)
```

You'll get a notification in Vercel dashboard and can see:
- Build logs
- Preview of changes
- Automatic production deployment

## Costs

### Free Tier Includes:
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Preview deployments
- Custom domain

### This is perfect for:
- Showing client progress
- Testing before going live
- Small to medium traffic sites

### You only pay if:
- Traffic exceeds 100GB/month
- Need advanced features (unlikely for this site)

## Troubleshooting

### Build Fails?
- Check environment variables are set correctly
- Look at build logs in Vercel dashboard
- MongoDB connection string must be exact

### Site Works Locally But Not on Vercel?
- Environment variables not set
- Image paths incorrect (use `/images/file.jpg`)
- API routes need MongoDB connection

### Shop Not Working?
- Add PayPal Client ID to environment variables
- Make sure MongoDB is connected
- Check API routes are deployed

## Next Steps

1. **Right Now**: Push to GitHub
2. **Today**: Create MongoDB Atlas cluster
3. **Today**: Deploy to Vercel
4. **Today**: Share preview URL with client
5. **Later**: Get PayPal Client ID for shop
6. **Later**: Connect johnflanders.com domain

## Support Links

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **PayPal Developer**: https://developer.paypal.com/docs
- **GitHub Help**: https://docs.github.com

## Questions?

Common questions:

**Q: Do I need to pay for Vercel?**
A: No, free tier is perfect for this site

**Q: Will my GitHub repo be public?**
A: No, you can keep it private

**Q: Can I deploy without MongoDB?**
A: Yes, but database features won't work (forms, shop, etc.)

**Q: Can I use a different domain?**
A: Yes! You can use any domain you own

**Q: Can I change the Vercel URL?**
A: Yes, in project settings you can change the project name

---

**Ready to deploy?** Follow the steps above and you'll have a live preview link to share with your client in about 20 minutes! 🚀

Need help with any step? Just ask!

