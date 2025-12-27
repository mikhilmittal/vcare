# VCare - Production Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and offers the easiest deployment process.

### Step 1: Prepare Your Code
1. Make sure all your changes are saved
2. Verify your WhatsApp number is correct in `components/BookNowModal.tsx` (should be: 919206912547)

### Step 2: Create a GitHub Account (if you don't have one)
1. Go to https://github.com
2. Sign up for a free account
3. Verify your email

### Step 3: Initialize Git Repository
1. Open Terminal
2. Navigate to your project:
   ```bash
   cd /Users/mittal/vcare
   ```
3. Initialize git:
   ```bash
   git init
   ```
4. Add all files:
   ```bash
   git add .
   ```
5. Create first commit:
   ```bash
   git commit -m "Initial commit - VCare website"
   ```

### Step 4: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `vcare` (or any name you prefer)
3. Description: "VCare - Home Healthcare Website"
4. Choose: **Public** (free) or **Private**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### Step 5: Push Code to GitHub
1. Copy the commands shown on GitHub (they'll look like this):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/vcare.git
   git branch -M main
   git push -u origin main
   ```
2. Replace `YOUR_USERNAME` with your actual GitHub username
3. Run these commands in your terminal (from the vcare directory)

### Step 6: Deploy to Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"** (or "Log In" if you have an account)
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account
5. Click **"Add New Project"**
6. Select your `vcare` repository
7. Vercel will auto-detect Next.js settings - **click "Deploy"**
8. Wait 2-3 minutes for deployment to complete
9. Your site will be live at: `https://vcare-xxxxx.vercel.app` (you'll get a unique URL)

### Step 7: Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `vcare.com`)
4. Follow DNS instructions provided by Vercel

---

## 🌐 Alternative: Deploy to Netlify

### Step 1-5: Same as above (GitHub setup)

### Step 6: Deploy to Netlify
1. Go to https://www.netlify.com
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose GitHub and select your `vcare` repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click **"Deploy site"**
7. Your site will be live at: `https://random-name-123.netlify.app`

---

## 🖥️ Alternative: Deploy to Your Own Server

### Requirements:
- A server with Node.js 18+ installed
- Domain name (optional)

### Steps:
1. Build the project:
   ```bash
   npm run build
   ```
2. Upload the entire `vcare` folder to your server
3. On your server, install dependencies:
   ```bash
   npm install --production
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Use PM2 for process management (recommended):
   ```bash
   npm install -g pm2
   pm2 start npm --name "vcare" -- start
   pm2 save
   ```

---

## ✅ Post-Deployment Checklist

- [ ] Test the live website URL
- [ ] Click "Book Now" and verify WhatsApp opens correctly
- [ ] Test on mobile device
- [ ] Verify WhatsApp number receives messages
- [ ] Check all service cards are clickable
- [ ] Test the booking flow end-to-end

---

## 🔧 Troubleshooting

### Build Errors:
- Make sure all dependencies are in `package.json`
- Run `npm install` locally first to test

### WhatsApp Not Working:
- Verify WhatsApp number format: `919206912547` (with country code)
- Test the WhatsApp link manually: `https://wa.me/919206912547?text=Test`

### Domain Issues:
- DNS changes can take 24-48 hours to propagate
- Check DNS settings in your domain registrar

---

## 📝 Notes

- **Vercel** is recommended for Next.js apps (free tier available)
- Your site will auto-deploy when you push changes to GitHub
- Vercel provides free SSL certificates
- All deployments are automatically optimized

---

## 🆘 Need Help?

If you encounter any issues during deployment, check:
1. Vercel/Netlify build logs
2. GitHub repository is public (or Vercel/Netlify has access)
3. All files are committed to git
4. No syntax errors in your code

