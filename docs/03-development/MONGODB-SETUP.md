# MongoDB Setup Guide

This guide explains how to switch from localStorage to MongoDB for persistent data storage.

## Current Status

The site currently uses **localStorage** for:
- Contact form messages
- Shows/Events
- Products
- Media items
- Image gallery settings

This works for demo/development but **data is browser-specific and will be lost** if the user clears their browser data.

## When to Switch to MongoDB

Switch to MongoDB when:
1. You need data to persist across all users/devices
2. You want messages to be stored server-side
3. You need email notifications for new messages
4. You're ready for production

## Setup Steps

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Create a database user with read/write access
5. Add your IP address to the whitelist (or use `0.0.0.0/0` for all IPs)
6. Get your connection string

### 2. Add Environment Variable

Add to `.env.local`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

Add to Vercel Environment Variables:
- Go to Project Settings → Environment Variables
- Add `MONGODB_URI` with your connection string

### 3. Enable MongoDB in Code

In `app/api/contact/route.ts`, change:

```typescript
const USE_MONGODB = false;
```

to:

```typescript
const USE_MONGODB = true;
```

And uncomment the MongoDB imports and code blocks.

### 4. Verify Models Exist

The Contact model should already exist at `models/Contact.ts`:

```typescript
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  eventType: { type: String },
  eventDate: { type: String },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
```

### 5. Update Admin Dashboard

In `app/admin/dashboard/messages/page.tsx`, the code already has fallback to API. Once MongoDB is enabled, it will automatically fetch from the database.

## Email Notifications (Optional)

To send email notifications when someone submits the contact form:

### Using Resend (Recommended)

1. Sign up at [Resend](https://resend.com)
2. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ADMIN_EMAIL=your-email@example.com
   ```

3. Install Resend:
   ```bash
   npm install resend
   ```

4. Add to `app/api/contact/route.ts`:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // After saving to MongoDB:
   await resend.emails.send({
     from: 'John Flanders Website <noreply@johnflanders.com>',
     to: process.env.ADMIN_EMAIL!,
     subject: `New Booking Inquiry from ${savedMessage.name}`,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${savedMessage.name}</p>
       <p><strong>Email:</strong> ${savedMessage.email}</p>
       <p><strong>Phone:</strong> ${savedMessage.phone || 'Not provided'}</p>
       <p><strong>Event Type:</strong> ${savedMessage.eventType || 'Not specified'}</p>
       <p><strong>Event Date:</strong> ${savedMessage.eventDate || 'Not specified'}</p>
       <p><strong>Message:</strong></p>
       <p>${savedMessage.message}</p>
     `,
   });
   ```

## Data Migration

When switching from localStorage to MongoDB, existing localStorage data won't automatically transfer. Options:

1. **Start fresh** - Easiest, just enable MongoDB
2. **Manual migration** - Export localStorage data and import to MongoDB
3. **Hybrid approach** - Check both sources during transition period

## Testing

After enabling MongoDB:

1. Submit a test contact form on the website
2. Check MongoDB Atlas to verify the data was saved
3. Check the admin dashboard to see the message
4. Test the delete functionality
5. Verify email notifications (if configured)

## Troubleshooting

### Connection Issues
- Verify your IP is whitelisted in MongoDB Atlas
- Check the connection string format
- Ensure the database user has correct permissions

### Data Not Showing
- Check browser console for errors
- Verify `USE_MONGODB = true` is set
- Check Vercel logs for server-side errors

### Email Not Sending
- Verify Resend API key is correct
- Check Resend dashboard for delivery status
- Ensure `ADMIN_EMAIL` is set correctly

