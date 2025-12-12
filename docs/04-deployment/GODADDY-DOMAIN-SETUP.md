# Connecting Your GoDaddy Domain to Vercel

This guide will help you connect your existing GoDaddy domain to your Next.js site deployed on Vercel.

## Prerequisites

- ✅ Site deployed on Vercel
- ✅ GoDaddy account with domain ownership
- ✅ Access to GoDaddy DNS settings

## Estimated Time: 15 minutes (+ 24-48 hours for DNS propagation)

---

## Step 1: Add Domain in Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `john-flanders-musician`

2. **Navigate to Domains**
   - Click on **Settings** tab
   - Click on **Domains** in the sidebar

3. **Add Your Domain**
   - Enter your domain (e.g., `johnflanders.com`)
   - Click **Add**

4. **Add www Subdomain (Optional but Recommended)**
   - Also add `www.johnflanders.com`
   - Vercel will automatically redirect www to non-www or vice versa

5. **Get DNS Records**
   - Vercel will display the DNS records you need to add
   - Keep this page open or take a screenshot
   - You'll need these values for GoDaddy

**Typical DNS Records:**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel's IP - yours may differ)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Step 2: Configure DNS in GoDaddy

1. **Log into GoDaddy**
   - Visit: https://godaddy.com
   - Sign in to your account

2. **Access Domain Settings**
   - Go to **My Products**
   - Find your domain
   - Click **DNS** or **Manage DNS**

3. **Update A Record**
   - Find the existing A record with name `@`
   - Click **Edit** (pencil icon)
   - Change the **Points to** value to Vercel's IP (from Step 1)
   - Set **TTL** to `600 seconds` (10 minutes) for faster propagation
   - Click **Save**

4. **Add or Update CNAME Record**
   - Look for a CNAME record with name `www`
   - If it exists, click **Edit**
   - If not, click **Add** → Select **CNAME**
   - Set:
     - **Name**: `www`
     - **Value**: `cname.vercel-dns.com` (from Vercel)
     - **TTL**: `1 Hour` (default is fine)
   - Click **Save**

5. **Remove Conflicting Records (Important!)**
   - Look for any **Forwarding** or **Parked** records
   - Remove any A records pointing to GoDaddy parking pages
   - Remove any conflicting CNAME records
   - Keep only the records Vercel specified

---

## Step 3: Verify Configuration

### In GoDaddy

Your DNS records should look like this:

| Type  | Name | Value                  | TTL    |
|-------|------|------------------------|--------|
| A     | @    | 76.76.21.21            | 600    |
| CNAME | www  | cname.vercel-dns.com   | 1 Hour |

### In Vercel

1. Return to Vercel → Settings → Domains
2. Wait for verification (can take a few minutes)
3. Status should change from "Invalid Configuration" to "Valid Configuration"
4. You'll see a green checkmark when successful

---

## Step 4: Wait for DNS Propagation

**DNS propagation takes time:**
- **Minimum**: 10 minutes to a few hours
- **Typical**: 4-8 hours
- **Maximum**: 24-48 hours

**Check Propagation Status:**
- Visit: https://dnschecker.org
- Enter your domain: `johnflanders.com`
- Select **A** record type
- Check if it shows Vercel's IP globally

---

## Step 5: Test Your Domain

Once DNS has propagated:

1. **Visit your domain**
   - Go to `https://johnflanders.com` (or your domain)
   - Go to `https://www.johnflanders.com`

2. **Check SSL Certificate**
   - Vercel automatically provisions SSL
   - Look for the padlock icon in browser
   - Certificate should be valid

3. **Test Admin Login**
   - Go to `https://yourdomain.com/admin/login`
   - Verify admin dashboard works
   - Check all functionality

---

## Troubleshooting

### ❌ Domain Not Working After 48 Hours

**Check DNS Records:**
```bash
# In terminal, check A record
nslookup johnflanders.com

# Check CNAME record  
nslookup www.johnflanders.com
```

**Common Issues:**
1. **Wrong IP Address** - Double-check Vercel's IP in your dashboard
2. **Conflicting Records** - Remove all parking/forwarding from GoDaddy
3. **DNS Cache** - Clear your browser cache and DNS cache
4. **Propagation Incomplete** - Wait longer, check dnschecker.org

### ❌ SSL Certificate Error

- Wait 30 minutes after DNS propagates
- Vercel auto-generates SSL certificates
- If still failing, go to Vercel → Domains → Refresh SSL

### ❌ "Invalid Configuration" in Vercel

- Verify A record points to correct IP
- Verify CNAME points to `cname.vercel-dns.com`
- Remove any @ CNAME records (conflicts with A record)
- Wait 10-15 minutes and refresh Vercel page

### ❌ Redirects to GoDaddy Parking Page

- GoDaddy has domain forwarding enabled
- Go to GoDaddy → Domain Settings
- Turn OFF "Forwarding" feature
- Update DNS records as described above

---

## Environment Variables (Important!)

After connecting your domain, update your environment variables:

### In Vercel:

1. Go to project **Settings** → **Environment Variables**
2. Update `NEXTAUTH_URL`:
   ```
   NEXTAUTH_URL=https://yourdomain.com
   ```
3. Update `NEXT_PUBLIC_SITE_URL`:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```
4. Click **Save**
5. Go to **Deployments** → **Redeploy** latest deployment

### In Local `.env.local`:

Update for local development:
```bash
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Post-Setup Checklist

- [ ] Domain loads correctly (https://yourdomain.com)
- [ ] www subdomain redirects properly
- [ ] SSL certificate is valid (padlock icon)
- [ ] Admin login works on custom domain
- [ ] All pages load correctly
- [ ] Environment variables updated in Vercel
- [ ] Site redeployed after env var changes

---

## DNS Record Reference

### Minimal Setup (Required)

```
Type: A
Name: @
Value: [Vercel's IP from dashboard]
TTL: 600

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Advanced Setup (Optional)

**Email Records** - If you use GoDaddy for email, keep these:
```
Type: MX
Name: @
Value: [Your email server]
Priority: 10
```

**Subdomains** - To add subdomains:
```
Type: CNAME
Name: blog (or any subdomain)
Value: cname.vercel-dns.com
```

---

## Support Resources

**Vercel Documentation:**
- Custom Domains: https://vercel.com/docs/concepts/projects/domains

**GoDaddy Support:**
- DNS Management: https://www.godaddy.com/help/manage-dns-680

**DNS Propagation Checker:**
- https://dnschecker.org

**Need Help?**
- Vercel Support: https://vercel.com/support
- Check deployment logs in Vercel dashboard

---

## Success!

Once everything is working:

✅ Your site is live at your custom domain  
✅ Automatic HTTPS/SSL enabled  
✅ Global CDN for fast loading worldwide  
✅ Automatic deployments when you push to GitHub  
✅ Admin dashboard accessible at yourdomain.com/admin  

**Next Steps:**
- Share your website URL with clients and fans!
- Update business cards, social media, etc.
- Consider adding a contact email at your domain (optional)

---

## Notes

- **Keep Vercel Free Plan**: Perfect for most websites, includes custom domains
- **GoDaddy Hosting**: You don't need GoDaddy's hosting, just the domain registration
- **SSL Renewal**: Vercel automatically renews SSL certificates (no action needed)
- **DNS Updates**: Future DNS changes take effect in 10 minutes to 48 hours

---

*Last Updated: December 2025*





