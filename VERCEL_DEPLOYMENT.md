# Deploying to Vercel via GitHub

This guide will help you deploy your portfolio website to Vercel using GitHub integration.

## ⚠️ Important Note About Backend

This portfolio uses a full-stack architecture with an Express backend. Vercel is optimized for frontend deployments and serverless functions. For the best experience, you have two options:

### Option 1: Frontend-Only Deployment (Recommended for Static Portfolio)
Deploy just the frontend to Vercel and either:
- Use in-memory storage (projects/blog posts are hardcoded in `server/storage.ts`)
- Remove backend dependencies

### Option 2: Split Deployment (For Full-Stack Features)
- **Frontend**: Deploy to Vercel (fast, CDN-backed)
- **Backend**: Deploy to Railway, Render, or keep on Replit
- Update API URLs in frontend to point to your backend service

This guide covers **Option 1** (Frontend-only). For Option 2, see the "Backend Deployment" section below.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at https://vercel.com)
- Git installed on your computer

## Step 1: Push Your Code to GitHub

### First-time Setup

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name your repository (e.g., `mahantesh-portfolio`)
   - Make it Public or Private (your choice)
   - Don't initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

3. **Connect your local repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### For Future Updates

```bash
git add .
git commit -m "Your commit message describing the changes"
git push
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Log in to Vercel**:
   - Go to https://vercel.com
   - Sign in with your GitHub account

2. **Import Your Project**:
   - Click "Add New..." → "Project"
   - Vercel will show your GitHub repositories
   - Find and select your portfolio repository
   - Click "Import"

3. **Configure Your Project**:
   - **Framework Preset**: Select "Other" or "Vite"
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

4. **Environment Variables** (if needed):
   - Click "Environment Variables"
   - Add any required variables (e.g., `DATABASE_URL` if using a database)
   - For this project, most variables are optional for frontend-only deployment

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a live URL like `your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Confirm project settings
   - Your site will be deployed!

## Step 3: Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain (e.g., `mahantesh.dev`)
3. Follow Vercel's instructions to configure DNS records
4. Vercel automatically handles SSL certificates

## Step 4: Automatic Deployments

Once connected to GitHub:
- **Every push to `main` branch** triggers a production deployment
- **Pull requests** get preview deployments automatically
- **Rollbacks** are easy - just redeploy a previous commit

## Important Notes

### Database Considerations

This project uses in-memory storage by default. For production with persistent data:

1. **Use a hosted PostgreSQL database**:
   - Vercel Postgres
   - Neon
   - Supabase
   - Railway

2. **Update Environment Variables** in Vercel:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - Any other secrets your app needs

3. **Update `server/storage.ts`**:
   - Switch from `MemStorage` to `DbStorage`
   - Ensure migrations run on deployment

### Build Configuration

The `vercel.json` file is configured for frontend-only deployment:
- Client builds to `dist/public`
- SPA routing with fallback to index.html
- Simple and optimized for static sites

## Backend Deployment Options

If you need the full backend with API routes, contact forms, and database features, here are recommended platforms:

### Railway (Recommended)

**Pros**: Easy deployment, supports full Express apps, free tier available

1. Go to https://railway.app and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects your Node.js app
5. Add environment variables if needed (DATABASE_URL, etc.)
6. Railway provides a live URL for your backend
7. Update your frontend API URLs to point to Railway

### Render

**Pros**: Free tier, automatic SSL, easy setup

1. Go to https://render.com and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment: Node
5. Add environment variables
6. Deploy and get your backend URL

### Keep Backend on Replit

**Pros**: Already working, no migration needed

1. Your backend is already running on Replit
2. Deploy frontend to Vercel
3. Update `apiRequest` in `client/src/lib/queryClient.ts`:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'https://your-replit-url.replit.dev';
   ```
4. Add `VITE_API_URL` environment variable in Vercel pointing to your Replit backend

### Troubleshooting

**Build Fails**:
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

**API Routes Not Working**:
- Check `vercel.json` configuration
- Ensure serverless function limits aren't exceeded
- Verify environment variables are set

**Styling Issues**:
- Clear browser cache
- Check that Tailwind CSS build completed successfully
- Verify all CSS imports are present

## Monitoring and Analytics

Vercel provides:
- **Analytics**: Track page views and performance
- **Logs**: Real-time function logs
- **Speed Insights**: Core Web Vitals monitoring

Access these in your project dashboard.

## Support

- Vercel Docs: https://vercel.com/docs
- Community: https://vercel.com/community
- GitHub Issues: Create issues in your repository

---

**Quick Reference Commands**:

```bash
# Update code and deploy
git add .
git commit -m "Update: description of changes"
git push

# Check deployment status
vercel ls

# Open project in browser
vercel --prod
```

Your portfolio is now live and will automatically update with every GitHub push! 🚀
