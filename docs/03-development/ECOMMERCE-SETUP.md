# 🛍️ E-Commerce Setup Guide

## Overview

The John Flanders website now includes a complete e-commerce system for selling songs and albums with PayPal and Venmo integration.

## Features Added

✅ Product management (songs & albums)
✅ Shopping cart with local storage
✅ PayPal integration for instant payments
✅ Venmo support for peer-to-peer payments
✅ Order tracking system
✅ Digital download delivery
✅ Secure checkout process

## Setup Instructions

### 1. PayPal Integration

1. **Create PayPal Business Account**
   - Go to https://www.paypal.com/business
   - Sign up for a business account
   - Complete verification process

2. **Get API Credentials**
   - Visit https://developer.paypal.com/dashboard/applications
   - Create a new app
   - Copy your Client ID
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id_here
     ```

3. **Test Mode**
   - PayPal Sandbox for testing: https://developer.paypal.com/tools/sandbox
   - Create test accounts for buyer and seller
   - Use sandbox client ID during development
   - Switch to live client ID for production

### 2. Venmo Integration

Currently, Venmo integration is manual:

1. **Set Up Venmo Business Profile**
   - Download Venmo app
   - Create/upgrade to business profile
   - Choose your Venmo username (e.g., @JohnFlanders-Music)

2. **Update Configuration**
   - Add your Venmo username in CheckoutModal component
   - Currently set to: `@JohnFlanders-Music`
   - Edit in: `components/CheckoutModal.tsx` (line ~181)

3. **Manual Verification**
   - Venmo payments are marked as "pending"
   - Admin manually verifies payment received
   - Send download links after verification
   - Usually takes < 1 hour

### 3. Adding Products

#### Option A: Via Database (MongoDB)

```javascript
// Example: Add a song
{
  title: "Desert Winds",
  artist: "John Flanders",
  type: "song",
  price: 1.99,
  description: "A journey through the Southwest",
  coverImageUrl: "/images/desert-winds-cover.jpg",
  audioPreviewUrl: "/audio/desert-winds-preview.mp3",
  downloadUrl: "https://your-storage.com/desert-winds-full.mp3",
  duration: "4:32",
  genre: "Folk",
  featured: true,
  inStock: true,
  digitalDownload: true
}

// Example: Add an album
{
  title: "Red Rock Sessions",
  artist: "John Flanders",
  type: "album",
  price: 12.99,
  description: "Complete studio album",
  coverImageUrl: "/images/red-rock-cover.jpg",
  audioPreviewUrl: "/audio/album-preview.mp3",
  downloadUrl: "https://your-storage.com/red-rock-album.zip",
  trackListing: [
    "Desert Winds",
    "Canyon Dreams",
    "Sunset Serenade",
    // ... more tracks
  ],
  genre: "Folk/Americana",
  featured: true,
  inStock: true,
  digitalDownload: true
}
```

#### Option B: Via API

```bash
# Add a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Desert Winds",
    "type": "song",
    "price": 1.99,
    "description": "A beautiful acoustic piece",
    "featured": true
  }'
```

#### Option C: Via Admin Panel (Future)

The admin panel at `/admin` has placeholders for product management. Full CRUD operations can be added later.

### 4. File Storage for Downloads

You'll need to host the actual music files. Options:

#### A. AWS S3 (Recommended)
- Create S3 bucket
- Upload music files
- Set appropriate permissions
- Generate signed URLs for downloads
- Cost: ~$0.023/GB storage

#### B. DigitalOcean Spaces
- Similar to S3
- Simpler interface
- Cost: $5/month for 250GB

#### C. Cloudinary
- Great for media files
- Free tier available
- Easy integration

#### D. Your Own Server
- Store in `/public/downloads` (not recommended for security)
- Better: Use protected routes to serve files

### 5. Order Management

#### View Orders

```bash
# Get all orders
curl http://localhost:3000/api/orders

# Get orders by email
curl http://localhost:3000/api/orders?email=customer@example.com

# Get specific order
curl http://localhost:3000/api/orders?orderNumber=JF-ABC123-XYZ
```

#### Order Flow

1. Customer adds items to cart
2. Proceeds to checkout
3. Fills in name and email
4. Selects payment method (PayPal or Venmo)
5. Completes payment
6. Order created in database
7. Download links sent via email (TODO: implement email)
8. Customer receives confirmation

### 6. Email Notifications (TODO)

To send download links automatically, integrate an email service:

#### Option A: SendGrid

```bash
npm install @sendgrid/mail
```

```javascript
// In app/api/orders/route.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: customerEmail,
  from: 'noreply@johnflanders.com',
  subject: 'Your Music Download Links',
  html: `
    <h1>Thank you for your purchase!</h1>
    <p>Order #: ${orderNumber}</p>
    <p>Download your music:</p>
    ${downloadLinks.map(link => `<a href="${link}">Download</a>`).join('<br>')}
  `,
};

await sgMail.send(msg);
```

#### Option B: Mailgun
#### Option C: AWS SES
#### Option D: Nodemailer with Gmail

### 7. Security Considerations

🔒 **Download Link Protection**

```javascript
// Generate time-limited signed URLs for downloads
// Prevents unauthorized access

import crypto from 'crypto';

function generateSecureDownloadLink(fileUrl, expiresIn = 3600) {
  const expiry = Date.now() + (expiresIn * 1000);
  const signature = crypto
    .createHmac('sha256', process.env.DOWNLOAD_SECRET)
    .update(`${fileUrl}${expiry}`)
    .digest('hex');
  
  return `${fileUrl}?expires=${expiry}&signature=${signature}`;
}
```

🔒 **Verify PayPal Payments**

Use PayPal webhooks to verify payments:
```javascript
// app/api/paypal-webhook/route.ts
// Verify payment was actually received
// Update order status accordingly
```

### 8. Testing the Shop

1. **Start dev server**: `npm run dev`
2. **Navigate to Shop section** on homepage
3. **Add products to cart**
4. **Click cart icon** in navigation
5. **Proceed to checkout**
6. **Test payment** (use PayPal sandbox accounts)

### 9. Going Live

Before launching:

- [ ] Set up MongoDB Atlas database
- [ ] Configure production PayPal Client ID
- [ ] Set up file storage (S3/Spaces)
- [ ] Implement email notifications
- [ ] Add actual products with real files
- [ ] Test complete purchase flow
- [ ] Set up Venmo business account
- [ ] Configure download link security
- [ ] Test on multiple devices
- [ ] Set up order tracking/management

### 10. Pricing Recommendations

**Single Songs**: $0.99 - $2.99
- Standard single: $1.99
- Premium/longer tracks: $2.99

**Albums**: $9.99 - $14.99
- EP (4-6 tracks): $5.99 - $7.99
- Full album (10+ tracks): $9.99 - $12.99
- Deluxe edition: $14.99+

**Bundles**: Offer discounts
- Buy 3 songs, get 1 free
- Album + merch bundles

### 11. Marketing Features (Future Enhancements)

- [ ] Discount codes/coupons
- [ ] Limited-time sales
- [ ] Pre-orders for new releases
- [ ] Gift purchases
- [ ] Wishlists
- [ ] Review/rating system
- [ ] Sample previews
- [ ] Related products
- [ ] Newsletter signup at checkout
- [ ] Social sharing of purchases

### 12. Analytics

Track these metrics:
- Products viewed
- Add-to-cart rate
- Cart abandonment rate
- Conversion rate
- Average order value
- Top-selling products
- Revenue by product type

## Database Models

### Product
- title, artist, type (song/album)
- price, description
- coverImageUrl, audioPreviewUrl
- downloadUrl (where the file is hosted)
- trackListing (for albums)
- genre, duration
- featured, inStock, digitalDownload

### Order
- orderNumber (unique)
- customerName, customerEmail
- products array
- totalAmount
- paymentMethod, paymentId, paymentStatus
- downloadLinks
- status, timestamps

## API Endpoints

```
GET  /api/products           - List all products
POST /api/products           - Create product (admin)
GET  /api/orders             - List orders
POST /api/orders             - Create order (checkout)
GET  /api/orders?email=...   - Get customer orders
```

## Support

Common issues:

**Cart not persisting?**
- Check browser localStorage
- Ensure CartContext is wrapping app

**PayPal not loading?**
- Verify CLIENT_ID in .env.local
- Check browser console for errors
- Ensure @paypal/react-paypal-js is installed

**Orders not saving?**
- Check MongoDB connection
- Verify API route is being called
- Check browser network tab

## Next Steps

1. Set up PayPal developer account
2. Add your actual music products
3. Configure file hosting
4. Test the complete flow
5. Launch! 🚀

---

For questions or issues, check the main documentation or reach out for support!

