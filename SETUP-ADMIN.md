# 🔐 Quick Admin Setup Guide

## Step 1: Generate Your Password Hash

In your terminal, run:

```bash
cd /Users/larissabrown/Desktop/john-flanders-musician/john-flanders-musician
npx tsx lib/generate-hash.ts MyPassword123
```

**Replace `MyPassword123` with your desired password!**

You'll see output like:
```
🔐 Admin Password Hash Generated!

Password: MyPassword123
Hash: $2a$10$abcdefghijklmnopqrstuvwxyz...

📝 Add this to your .env.local file:
ADMIN_PASSWORD_HASH="$2a$10$abcdef..."
```

**Copy the hash that gets generated!**

---

## Step 2: Generate NextAuth Secret

Run this command:

```bash
openssl rand -base64 32
```

This will output something like:
```
abc123xyz789randomstring456def...
```

**Copy this value!**

---

## Step 3: Create `.env.local` File

Create a new file called `.env.local` in your project root folder:

```
/Users/larissabrown/Desktop/john-flanders-musician/john-flanders-musician/.env.local
```

Paste this content (replace the values with your actual values):

```env
# MongoDB Connection (you should already have this)
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/john-flanders

# NextAuth Configuration (REQUIRED)
NEXTAUTH_SECRET=paste-the-secret-from-step-2-here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (REQUIRED)
ADMIN_EMAIL=admin@johnflanders.com
ADMIN_PASSWORD_HASH="paste-the-hash-from-step-1-here"

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### ⚠️ IMPORTANT: Password Hash Formatting

**The password hash MUST be wrapped in quotes!** 

Because bcrypt hashes contain `$` symbols, they need to be quoted in `.env` files:

✅ **CORRECT (Use backslash escaping):**
```env
ADMIN_PASSWORD_HASH=\$2a\$10\$ZFx9C3xGQvGHJKL4MNP7QOe.RSTUVWXYZabcdefghijklmnopqr12345
```

❌ **WRONG (Double quotes don't work with Next.js):**
```env
ADMIN_PASSWORD_HASH="$2a$10$ZFx9C3xGQvGHJKL4MNP7QOe.RSTUVWXYZabcdefghijklmnopqr12345"
```

> **Note:** Due to how Next.js processes environment variables, the `$` symbols in bcrypt hashes must be escaped with backslashes (`\$`). Do not use quotes.

### Example of filled-in `.env.local`:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://myuser:mypass123@cluster0.mongodb.net/john-flanders

# NextAuth Configuration
NEXTAUTH_SECRET=Kj7H9mN2pQ4rS8tV1wX3yZ5aB6cD8eF0gI2jL4mN6oP8qR0sT2uV4wX6yZ8aB1cD3
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@johnflanders.com
ADMIN_PASSWORD_HASH=\$2a\$10\$ZFx9C3xGQvGHJKL4MNP7QOe.RSTUVWXYZabcdefghijklmnopqr12345

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Step 4: Restart Your Dev Server

Stop your current dev server (Ctrl+C) and restart it:

```bash
npm run dev
```

---

## Step 5: Login to Admin Dashboard

1. Open your browser to: `http://localhost:3000/admin/login`

2. Use these credentials:
   - **Email:** `admin@johnflanders.com` (or whatever you set as ADMIN_EMAIL)
   - **Password:** `MyPassword123` (or whatever you used in Step 1)

3. Click "Sign In" 🎉

---

## ⚠️ Important Security Notes

### Do NOT commit `.env.local` to Git!

It's already in `.gitignore`, so it won't be committed. But double-check:

```bash
git status
```

If you see `.env.local` listed, DO NOT commit it!

### For Production

When you deploy to Vercel/Netlify:

1. Go to your project settings
2. Find "Environment Variables"
3. Add all the same variables from your `.env.local`
4. Make sure to use `https://` for `NEXTAUTH_URL` in production

---

## 🆘 Troubleshooting

### "Invalid credentials" error

**Check:**
- Did you wrap the password hash in quotes? `ADMIN_PASSWORD_HASH="$2a$10$..."`
- Did you copy the full hash (including `$2a$10$...`)?
- Is your email exactly the same as in `.env.local`?
- Did you restart the dev server after creating `.env.local`?
- Are there any extra spaces before or after the hash?

### Can't run the hash generator

**Try:**
```bash
npm install  # Make sure dependencies are installed
npx tsx lib/generate-hash.ts test123
```

### .env.local not working

**Check:**
- File is named exactly `.env.local` (with the dot at the start)
- File is in the project root (same folder as `package.json`)
- No extra spaces or quotes around values
- You restarted the dev server

---

## 📞 Need Help?

Check the detailed guide: [ADMIN-SETUP.md](./ADMIN-SETUP.md)

---

**You're all set! Happy managing! 🎸**

