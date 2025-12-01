# Deployment Guide for John Flanders Website

## Overview

This guide covers deploying the John Flanders musician website to various hosting platforms, including GoDaddy (current host).

## Prerequisites

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Access to your hosting platform
- Domain configured (johnflanders.com)

## Option 1: Deploying to Vercel (Recommended)

Vercel is the easiest and most performant option for Next.js applications.

### Steps:

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Connect your repository** (if using Git):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Import project to Vercel**:
   - Go to vercel.com/new
   - Import your Git repository
   - Vercel will auto-detect Next.js

4. **Configure Environment Variables**:
   - Add `MONGODB_URI` in Vercel dashboard
   - Add `NEXT_PUBLIC_SITE_URL=https://johnflanders.com`

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically

6. **Configure Custom Domain**:
   - In Vercel dashboard, go to Settings → Domains
   - Add `johnflanders.com`
   - Update DNS records at GoDaddy:
     - Type: CNAME
     - Name: www
     - Value: cname.vercel-dns.com
     - Type: A
     - Name: @
     - Value: 76.76.21.21

## Option 2: Deploying to GoDaddy (Current Host)

GoDaddy shared hosting requires a static build or Node.js hosting.

### Method A: Static Export (Simpler, but limited features)

1. **Modify `next.config.ts`**:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   export default nextConfig;
   ```

2. **Build the site**:
   ```bash
   npm run build
   ```

3. **Upload via FTP/cPanel**:
   - Connect to GoDaddy via FTP
   - Upload contents of `out` folder to `public_html`
   - Ensure `.htaccess` file is present for routing

4. **Limitations**:
   - No API routes (database won't work)
   - No server-side rendering
   - Consider using external services for forms/data

### Method B: Node.js Hosting (Full features)

GoDaddy offers Node.js hosting on some plans:

1. **Check if Node.js is available**:
   - Log into cPanel
   - Look for "Setup Node.js App"

2. **Configure Node.js App**:
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: /home/username/john-flanders-musician
   - Application URL: johnflanders.com

3. **Upload files via SSH or cPanel File Manager**

4. **Install dependencies**:
   ```bash
   npm install --production
   ```

5. **Set environment variables** in cPanel:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   ```

6. **Start the application**:
   ```bash
   npm run build
   npm start
   ```

## Option 3: DigitalOcean/AWS/Other VPS

For full control:

1. **Create a VPS/Droplet**

2. **Install Node.js and PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Clone/Upload your code**

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Create `.env.local`**:
   ```bash
   MONGODB_URI=your_mongodb_uri
   NEXT_PUBLIC_SITE_URL=https://johnflanders.com
   ```

6. **Build and start**:
   ```bash
   npm run build
   pm2 start npm --name "john-flanders" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx as reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name johnflanders.com www.johnflanders.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Set up SSL with Let's Encrypt**:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d johnflanders.com -d www.johnflanders.com
   ```

## Database Setup (MongoDB Atlas)

Regardless of hosting platform, use MongoDB Atlas:

1. **Create free account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster**:
   - Choose free tier (M0)
   - Select region closest to your hosting

3. **Set up database access**:
   - Create database user with password
   - Add IP address to whitelist (0.0.0.0/0 for all, or specific IPs)

4. **Get connection string**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/john-flanders
   ```

5. **Add to environment variables**

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All sections are visible
- [ ] Navigation works
- [ ] Contact form submits (if database connected)
- [ ] Media players work
- [ ] Mobile responsive
- [ ] SSL certificate installed (HTTPS)
- [ ] DNS properly configured
- [ ] Google Analytics added (optional)
- [ ] SEO meta tags verified

## Monitoring & Maintenance

### Recommended Tools:

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Plausible
- **Error Tracking**: Sentry
- **Performance**: Lighthouse, GTmetrix

### Regular Tasks:

- Update dependencies monthly: `npm update`
- Backup database weekly
- Monitor disk space and bandwidth
- Check for security updates

## Troubleshooting

### Build Errors:

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues:

- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity

### Site Not Loading:

- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
- Verify server is running: `pm2 status`
- Check server logs: `pm2 logs john-flanders`

## Need Help?

For deployment assistance:
- Next.js Docs: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- MongoDB Atlas Support: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

---

**Recommendation**: Use Vercel for the easiest deployment experience with best performance. It's free for personal projects and handles everything automatically.

