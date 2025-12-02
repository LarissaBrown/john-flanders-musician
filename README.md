# John Flanders - Professional Musician Website

A beautiful, modern website for professional multi-instrumentalist musician John Flanders. Features a Southwest canyon-inspired design with warm terracotta and red rock colors.

## 🎵 Features

- **Responsive Design** - Beautiful UI that works on all devices
- **Performance Calendar** - Display upcoming shows and events
- **Media Gallery** - Showcase audio and video recordings
- **Contact/Booking System** - Easy booking form with calendar integration
- **Database Integration** - MongoDB for managing events, media, and contacts
- **SEO Optimized** - Built with Next.js for excellent search engine visibility
- **Fast Performance** - Optimized loading and smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account (recommended)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the repository**:
   ```bash
   cd /path/to/john-flanders-musician
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🗄️ Database Setup

### Using MongoDB Atlas (Recommended for Production)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/john-flanders
   ```

### Using Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use the local connection string in `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/john-flanders
   ```

## 📱 Sections

### Home/Hero
- Eye-catching hero section with call-to-action buttons
- Gradient background with Southwest canyon colors

### About
- Biography and professional highlights
- Multi-instrumentalist credentials
- Experience showcase

### Shows
- Upcoming performance dates
- Venue information and locations
- Ticket purchase links
- Featured event highlighting

### Media Gallery
- Audio recordings player
- Video performances
- Filterable by media type
- Beautiful grid layout

### Contact/Booking
- Comprehensive booking form
- Event type selection
- Calendar date picker
- Direct email integration

## 🎨 Design Theme

The website uses a warm Southwest canyon color palette:
- **Canyon Red**: `#C1440E`
- **Canyon Orange**: `#E67E22`
- **Canyon Terracotta**: `#D35400`
- **Canyon Sand**: `#F4E4C1`
- **Canyon Clay**: `#9B4819`
- **Background**: `#FFF8F0`

## 🔧 Customization

### Adding Events

Events can be added through the API or directly in the database:

```typescript
POST /api/events
{
  "title": "Concert Name",
  "venue": "Venue Name",
  "location": "City, State",
  "date": "2024-12-31",
  "time": "8:00 PM",
  "description": "Event description",
  "ticketUrl": "https://tickets.example.com",
  "featured": true
}
```

### Adding Media

```typescript
POST /api/media
{
  "title": "Song/Video Title",
  "type": "audio" | "video",
  "url": "https://media-url.com",
  "description": "Description",
  "duration": "4:32",
  "featured": true
}
```

## 🌐 Deployment

### Deploying to GoDaddy

Since the site is hosted on GoDaddy:

1. **Build the static version**:
   ```bash
   npm run build
   ```

2. **Export static files** (add to package.json scripts):
   ```json
   "export": "next export"
   ```

3. **Upload the `out` directory** to your GoDaddy hosting via FTP/cPanel

For better performance, consider using:
- **Vercel** (Recommended - Zero config deployment)
- **Netlify**
- **AWS**
- **DigitalOcean**

### Environment Variables for Production

Make sure to set these on your hosting platform:
- `MONGODB_URI` - Your MongoDB connection string
- `NEXT_PUBLIC_SITE_URL` - Your production URL

## 📧 Contact Form Integration

The contact form currently saves to the database. To enable email notifications:

1. Add SMTP credentials to `.env.local`
2. Implement email sending in `/app/api/contact/route.ts`
3. Consider using services like:
   - SendGrid
   - Mailgun
   - AWS SES
   - Nodemailer with Gmail

## 📚 Documentation

### Complete documentation is organized in the `docs/` folder:

**→ [📖 Documentation Hub](./docs/README.md)** - Start here for all documentation

#### Quick Links:
- 🚀 **[Getting Started](./docs/01-getting-started/)** - Setup and project overview
- 🎨 **[Design System](./docs/02-design-system/)** - Colors, typography, and UI standards
- 🔧 **[Development](./docs/03-development/)** - Implementation notes and history
- 🚢 **[Deployment](./docs/04-deployment/)** - Deploy to production
- ⚡ **[Features](./docs/05-features/)** - Feature documentation
- 📋 **[Planning](./docs/06-planning/)** - Roadmap and future plans

---

## 🎯 Future Enhancements

- [ ] **Admin dashboard** - Content management system (in planning - see [docs/06-planning/](./docs/06-planning/))
- [ ] Calendar integration (Google Calendar, iCal)
- [ ] Newsletter subscription
- [ ] Blog/News section
- [ ] Streaming service integration
- [ ] Social media feed integration
- [ ] Analytics dashboard

See [docs/06-planning/](./docs/06-planning/) for detailed roadmap.

---

## 📄 License

© 2024 John Flanders. All rights reserved.

## 🤝 Support

For questions or support, contact: larissa.johnson.brown@gmail.com

---

Built with ❤️ for musicians who want to connect with their audience.
