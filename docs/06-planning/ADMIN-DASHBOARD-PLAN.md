# Admin Dashboard - Implementation Plan

## Overview
Secure admin dashboard for John Flanders to manage site content without code changes.

## 🔐 Authentication System

### Phase 1: Basic Authentication
- **NextAuth.js** integration
- Credentials provider (email/password)
- Session management
- Protected routes with middleware

### Environment Variables Needed:
```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@johnflanders.com
ADMIN_PASSWORD=hashed-password
```

## 📊 Admin Dashboard Features

### 1. Shows Management
**Location:** `/admin/shows`

**Features:**
- ✅ Create new show cards
- ✅ Edit existing shows
- ✅ Delete shows
- ✅ Upload show images
- ✅ Set featured shows (appear in gold cards on homepage)
- ✅ Manage show details:
  - Venue name and address
  - Date and time
  - Ticket link
  - Description
  - Image/poster

**Database Schema:**
```typescript
{
  _id: ObjectId,
  title: string,
  venue: string,
  address: string,
  city: string,
  state: string,
  date: Date,
  time: string,
  description: string,
  imageUrl: string,
  ticketUrl?: string,
  isFeatured: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Media Management
**Location:** `/admin/media`

**Features:**
- ✅ Upload audio files (.mp3, .wav)
- ✅ Upload video files (or embed YouTube/Vimeo links)
- ✅ Edit media details:
  - Title
  - Description
  - Duration
  - Thumbnail image
  - Type (audio/video)
- ✅ Delete media
- ✅ Reorder media gallery

**Storage Options:**
1. **Self-hosted:** Upload to `/public/media` folder
2. **Cloud storage:** AWS S3, Cloudinary, or Vercel Blob
3. **Video embeds:** YouTube/Vimeo URLs

### 3. Shop/Products Management
**Location:** `/admin/products`

**Features:**
- ✅ Add new products (singles/albums)
- ✅ Edit product details:
  - Name
  - Price
  - Type (single/album)
  - Cover art image
  - Description
  - Track listing
  - Download link (for digital delivery)
- ✅ Toggle product availability
- ✅ View sales/orders

### 4. Image Gallery Management
**Location:** `/admin/gallery`

**Features:**
- ✅ Upload images for show cards
- ✅ Upload album/single cover art
- ✅ Upload hero/background images
- ✅ Crop and resize images
- ✅ Organize images by category
- ✅ Delete unused images

**Image Categories:**
- Show posters
- Album covers
- Profile photos
- Background images
- Press photos

### 5. Orders Management
**Location:** `/admin/orders`

**Features:**
- ✅ View all orders
- ✅ Filter by status (pending/completed/refunded)
- ✅ Export order data (CSV)
- ✅ Send download links to customers
- ✅ Refund handling

### 6. Contact Form Submissions
**Location:** `/admin/contacts`

**Features:**
- ✅ View all contact form submissions
- ✅ Mark as read/unread
- ✅ Reply to inquiries (email integration)
- ✅ Archive old messages
- ✅ Export data

## 🎨 Admin UI Design
- **Dark theme** matching main site (#1C1612 + #F6B800)
- **Sidebar navigation** for all admin sections
- **Dashboard home** with quick stats:
  - Upcoming shows count
  - Total products
  - Recent orders
  - New messages
- **WYSIWYG editors** for descriptions
- **Drag & drop** file uploads
- **Preview** before publishing

## 🛠️ Technical Stack

### File Upload Handler
```typescript
// app/api/upload/route.ts
- Handle multipart form data
- Validate file types and sizes
- Store files or upload to cloud storage
- Return file URLs
```

### Middleware Protection
```typescript
// middleware.ts
- Protect /admin/* routes
- Check authentication session
- Redirect to login if not authenticated
```

### Admin Layout
```typescript
// app/admin/layout.tsx
- Sidebar navigation
- Header with logout button
- Consistent styling
```

## 📦 Required Packages

```json
{
  "next-auth": "^4.24.5",
  "bcryptjs": "^2.4.3",
  "react-dropzone": "^14.2.3",
  "sharp": "^0.33.1",
  "@vercel/blob": "^0.19.0",
  "react-quill": "^2.0.0"
}
```

## 🚀 Implementation Priority

### Phase 1 (Essential):
1. ✅ Authentication system
2. ✅ Shows management
3. ✅ Basic image upload

### Phase 2 (Important):
4. ✅ Media management
5. ✅ Products management
6. ✅ Contact form viewing

### Phase 3 (Enhanced):
7. ✅ Orders management
8. ✅ Advanced image gallery
9. ✅ Analytics/statistics

## 🔒 Security Considerations

1. **Authentication:**
   - Use NextAuth.js
   - Store passwords with bcrypt
   - Implement session timeout

2. **File Upload:**
   - Validate file types
   - Limit file sizes
   - Scan for malware (in production)
   - Use secure storage

3. **API Routes:**
   - Check authentication on all admin API routes
   - Validate input data
   - Rate limiting

4. **Environment Variables:**
   - Never commit secrets to Git
   - Use `.env.local` for local development
   - Set variables in Vercel dashboard for production

## 📝 Next Steps

Would you like me to:
1. **Start with authentication setup** (NextAuth.js)
2. **Build the admin dashboard layout** first
3. **Implement shows management** as the first feature

Let me know your preference and I'll begin implementation! 🎸

