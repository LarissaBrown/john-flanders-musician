# 🔐 Admin Dashboard Setup Guide

Complete guide to setting up and using the admin dashboard.

## 🚀 Quick Setup (5 Minutes)

### Step 1: Generate Admin Password Hash

```bash
cd /Users/larissabrown/Desktop/john-flanders-musician/john-flanders-musician
npx tsx lib/generate-hash.ts YourSecurePassword123
```

This will output something like:
```
🔐 Admin Password Hash Generated!

Password: YourSecurePassword123
Hash: $2a$10$abcdef...

📝 Add this to your .env.local file:
ADMIN_PASSWORD_HASH="$2a$10$abcdef..."
```

### Step 2: Create `.env.local` File

Create a file called `.env.local` in the project root with these variables:

```env
# MongoDB Connection (you should already have this)
MONGODB_URI=your-mongodb-connection-string

# NextAuth Configuration (NEW - REQUIRED)
NEXTAUTH_SECRET=generate-with-command-below
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (NEW - REQUIRED)
ADMIN_EMAIL=admin@johnflanders.com
ADMIN_PASSWORD_HASH=paste-the-hash-from-step-1-here
```

**To generate `NEXTAUTH_SECRET`:**
```bash
openssl rand -base64 32
```

### Step 3: Restart Development Server

```bash
npm run dev
```

### Step 4: Access Admin Dashboard

1. Visit: `http://localhost:3000/admin/login`
2. Login with:
   - **Email:** admin@johnflanders.com (or whatever you set in `.env.local`)
   - **Password:** YourSecurePassword123 (or whatever you used in Step 1)

---

## 📋 Admin Dashboard Features

### 1. Dashboard Home
`/admin/dashboard`

- **Statistics Overview**
  - Upcoming shows count
  - Total media items
  - Products in catalog
  - Pending orders
  - Unread messages

- **Quick Actions**
  - Jump to any management section
  - View recent activity

---

### 2. Shows Management
`/admin/dashboard/shows`

**Add/Edit/Delete Shows:**
- Event title and description
- Venue name and location
- Date and time
- Ticket purchase URL
- Featured toggle (shows highlighted on homepage)

**Features:**
- ✅ Full CRUD operations
- ✅ Mark shows as featured
- ✅ Beautiful card display
- ✅ Responsive grid layout

---

### 3. Media Gallery
`/admin/dashboard/media`

**Manage Audio & Video:**
- Add audio tracks (MP3, WAV)
- Embed YouTube/Vimeo videos
- Or upload video files
- Set duration
- Add descriptions
- Feature media items

**How to Add Media:**
1. Upload files to `/public/audio/` or `/public/video/`
2. In admin, add new media with path: `/audio/song.mp3`
3. Or use YouTube URL directly

---

### 4. Products (Shop)
`/admin/dashboard/products`

**Manage Music Catalog:**
- Add albums or singles
- Set pricing
- Upload cover art
- Add track listings
- Product descriptions
- Toggle availability

**Product Types:**
- Single (one track)
- Album (multiple tracks)

---

### 5. Orders Management
`/admin/dashboard/orders`

**View & Fulfill Orders:**
- See all customer orders
- Filter by status (pending/completed/cancelled)
- View customer contact info
- Update order status
- Track revenue

**Order Workflow:**
1. Customer places order → Status: **Pending**
2. You fulfill order → Mark as **Completed**
3. Or cancel if needed → Mark as **Cancelled**

---

### 6. Messages (Contact Form)
`/admin/dashboard/messages`

**View Booking Inquiries:**
- Inbox-style interface
- View customer details
- See event type and date
- Quick reply via email/phone
- Delete old messages

**Features:**
- Contact information displayed
- One-click email reply
- Phone call links
- Organized by date

---

### 7. Images Gallery
`/admin/dashboard/images`

**Image Management:**
Currently uses file system approach:
1. Upload images to `/public/images/`
2. Reference in products/shows as `/images/filename.jpg`

**Current Images:**
- Displays all images in `/public/images/`
- Instructions for adding new images
- Best practices and recommended sizes

---

## 🔒 Security Features

### Authentication
- ✅ Secure JWT sessions (24-hour expiration)
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Middleware route protection

### Protected Routes
All admin routes under `/admin/dashboard/*` are protected:
- Unauthenticated users → Redirected to login
- Expired sessions → Automatic logout
- No unauthorized API access

---

## 🎨 Admin UI Features

### Responsive Design
- ✅ Mobile-friendly sidebar (hamburger menu)
- ✅ Tablet and desktop layouts
- ✅ Touch-friendly on mobile devices

### Southwest Theme
- Consistent with main site colors
- Canyon red, terracotta, gold accents
- Professional dark sidebar
- Clean, modern interface

### User Experience
- Confirmation dialogs for destructive actions
- Loading states
- Error handling
- Toast notifications (future)

---

## 📦 Database Integration

All admin changes save directly to MongoDB:

### Collections Used
- `events` - Shows and performances
- `media` - Audio and video content
- `products` - Shop inventory
- `orders` - Customer purchases
- `contacts` - Booking inquiries

### Real-Time Updates
- Changes appear immediately on public site
- No cache clearing needed
- Instant synchronization

---

## 🚀 Production Deployment

### Environment Variables for Production

Set these in your hosting platform (Vercel, Netlify, etc.):

```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://johnflanders.com
ADMIN_EMAIL=admin@johnflanders.com
ADMIN_PASSWORD_HASH=your-generated-hash
```

### Security Checklist
- [ ] Use strong, unique password
- [ ] Never commit `.env.local` to Git
- [ ] Use HTTPS in production (NEXTAUTH_URL)
- [ ] Keep NEXTAUTH_SECRET secure
- [ ] Regularly update dependencies

---

## 🐛 Troubleshooting

### Can't Login

**Problem:** "Invalid credentials" error

**Solutions:**
1. Check `ADMIN_EMAIL` matches what you're typing
2. Verify password hash was generated correctly
3. Ensure `.env.local` file exists
4. Restart dev server after changing `.env.local`

### Session Expires Too Quickly

**Solution:**  
Edit `/app/api/auth/[...nextauth]/route.ts`:
```typescript
session: {
  strategy: 'jwt',
  maxAge: 7 * 24 * 60 * 60, // 7 days instead of 1 day
}
```

### Can't Access Admin Routes

**Problem:** Redirected to login even after signing in

**Solutions:**
1. Check browser console for errors
2. Verify `NEXTAUTH_URL` matches your current URL
3. Clear browser cookies and try again
4. Check middleware.ts configuration

### Changes Don't Appear on Site

**Problem:** Updated content in admin but not showing on site

**Solutions:**
1. Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
2. Check MongoDB connection
3. Verify API routes are working
4. Check browser console for errors

---

## 💡 Tips & Best Practices

### Content Management
- ✅ Mark important shows/media as "Featured"
- ✅ Keep product descriptions concise and compelling
- ✅ Respond to booking inquiries promptly
- ✅ Update show information immediately if changed

### Images
- Use WebP format for best performance
- Compress images before uploading
- Recommended sizes:
  - Hero images: 1920x1080
  - Product covers: 800x800
  - Show posters: 1000x1400

### SEO
- Write detailed product descriptions
- Use descriptive show titles
- Include location information in shows
- Keep content fresh and updated

---

## 📞 Need Help?

### Common Tasks

**Change Admin Password:**
1. Generate new hash: `npx tsx lib/generate-hash.ts NewPassword`
2. Update `ADMIN_PASSWORD_HASH` in `.env.local`
3. Restart server

**Add New Admin User:**
Currently supports single admin. For multiple users:
- Extend authentication system
- Add User model to database
- Update NextAuth configuration

**Reset Everything:**
```bash
# Stop server
# Delete .env.local
# Regenerate credentials (Steps 1-2)
# Restart server
```

---

## 🎯 Next Steps

Now that the admin dashboard is set up:

1. ✅ Add your real shows and events
2. ✅ Upload your music and videos
3. ✅ List your albums/singles in the shop
4. ✅ Respond to booking inquiries
5. ✅ Manage orders as they come in

---

**🎸 Ready to manage your website like a pro!**

For more information, see [docs/06-planning/ADMIN-DASHBOARD-PLAN.md](./docs/06-planning/ADMIN-DASHBOARD-PLAN.md)

