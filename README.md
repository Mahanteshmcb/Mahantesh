# Mahantesh Biradar - Game Developer Portfolio

A futuristic, cyberpunk-inspired portfolio website showcasing game development projects, simulations, and AI-powered experiences. Built with React, TypeScript, and Express.js with stunning visual effects.

## 🎮 Features

- **Holographic 3D Logo** - Animated gaming-themed logo with particle effects
- **Enhanced Particle Background** - Flowing grid waves with 120+ animated particles
- **AI Chatbot** - Interactive AI assistant to answer visitor questions
- **Project Showcase** - Display your game development and simulation projects
- **Blog Section** - Share insights about game development and technical topics
- **Contact Form** - Let visitors reach out to you
- **Dark Mode Theme** - Cyberpunk aesthetic with cyan and purple neon gradients
- **Fully Responsive** - Works beautifully on all devices

---

## 📝 How to Customize - Making It Yours

### 1. Personal Information & Links

#### **Navigation and Header (Home.tsx)**
Location: `client/src/pages/Home.tsx`

**Your Name and Title:**
- Line 132: Change `"Hi, I'm Mahantesh Biradar"` to your name
- Line 136: Change `"Game Developer | Simulation Engineer | Creator of VrindaAI"` to your title

**Social Media Links:**
- Line 197-201: GitHub link - `https://github.com/mahanteshbiradar`
- Line 202-206: LinkedIn link - `https://linkedin.com/in/mahanteshbiradar`
- Line 300-305: LinkedIn (footer)
- Line 307-312: GitHub (footer)
- Line 314: Email - `mahantesh@example.com`

**Resume & Certificates:**
- Line 269: Resume link - `https://drive.google.com/file/d/your_resume_id/view`
- Line 281: Certificates folder - `https://drive.google.com/drive/folders/your_certificates_folder_id`
- Line 505: Download Resume link (duplicate)

**Navigation Logo:**
- Line 170: Change `MB` to your initials or brand name

#### **About Section**
Location: `client/src/pages/Home.tsx` (Lines 368-383)

Update the three paragraphs to describe:
1. Your professional background and passion
2. Your current projects and specializations
3. Your vision and what you do in your free time

#### **Experience Section**
Location: `client/src/pages/Home.tsx` (Lines 44-63)

Update the `experiences` array with your work history:
```typescript
{
  role: 'Your Job Title',
  company: 'Company/Project Name',
  period: 'Start Year - End Year',
  description: 'What you accomplished in this role.',
}
```

### 2. Projects and Blog Posts

#### **Projects**
Location: `server/storage.ts` (Lines 39-94)

Edit the `projectsData` array to showcase your own projects:
```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  description: 'Brief description of what this project does.',
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  imageUrl: null, // Or add image URL
  link: null, // Or add project link
  featured: 'true',
}
```

#### **Blog Posts**
Location: `server/storage.ts` (Lines 96-118)

Update the `blogData` array with your articles:
```typescript
{
  id: 'unique-id',
  title: 'Blog Post Title',
  excerpt: 'Short summary of the post.',
  content: 'Full article content goes here...',
  publishedAt: new Date('2025-01-15'),
}
```

### 3. Meta Information & SEO

Location: `client/index.html`

Update the following for better SEO:
- `<title>` tag: Your portfolio name
- `<meta name="description">` tag: Brief description of your portfolio
- Open Graph tags for social media sharing

---

## 📁 Project Structure - What Each File Does

### **Frontend (client/)**

#### **Pages**
- `client/src/pages/Home.tsx` - Main landing page with all sections (hero, about, projects, experience, blog, contact)
- `client/src/pages/not-found.tsx` - 404 error page

#### **Components**
- `client/src/components/HolographicLogo.tsx` - 3D animated gaming logo with particle effects
- `client/src/components/ParticleBackground.tsx` - Animated background with particles and flowing grid
- `client/src/components/AIChat.tsx` - AI chatbot interface component
- `client/src/components/CursorFollow.tsx` - Custom cursor trail effect
- `client/src/components/MatrixRain.tsx` - Matrix-style falling text effect
- `client/src/components/FeedbackModal.tsx` - User feedback form modal
- `client/src/components/ui/*` - Reusable UI components (buttons, cards, forms, etc.)

#### **Configuration & Utilities**
- `client/src/App.tsx` - Main app router and layout
- `client/src/main.tsx` - Application entry point
- `client/src/index.css` - Global styles and theme colors (customize colors here!)
- `client/src/lib/queryClient.ts` - API request utilities and React Query setup
- `client/src/lib/utils.ts` - Helper functions
- `client/index.html` - HTML template (update meta tags here)

### **Backend (server/)**

- `server/index.ts` - Express server setup and initialization
- `server/routes.ts` - API endpoints (/api/projects, /api/blog, /api/contact, /api/chat)
- `server/storage.ts` - In-memory data storage (projects, blog posts) - **Edit this for your content!**
- `server/vite.ts` - Vite development server integration

### **Shared**

- `shared/schema.ts` - TypeScript types and database schemas

### **Configuration Files**

- `package.json` - Dependencies and npm scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS theme and colors
- `drizzle.config.ts` - Database ORM configuration
- `.gitignore` - Files excluded from git

### **Documentation**

- `README.md` - This file! Complete guide for customization
- `replit.md` - Project architecture and technical documentation
- `design_guidelines.md` - Design system and styling guidelines

---

## 🚀 Running the Project in VSCode

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/) (v20 or higher)
2. Install [Git](https://git-scm.com/)
3. Install [VSCode](https://code.visualstudio.com/)

### **Initial Setup**

1. **Open Terminal in VSCode**
   - Press `` Ctrl + ` `` (backtick) or go to `Terminal > New Terminal`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   
   The app will start on `http://localhost:5000`

### **Available Commands**

```bash
# Start development server (frontend + backend)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Type checking
npm run check

# Push database schema (if using PostgreSQL)
npm run db:push
```

---

## 🔧 Git Operations via VSCode Terminal

### **1. First Time Setup - Fork & Clone**

#### **Fork the Repository** (if starting from someone else's repo)
1. Go to the original repository on GitHub
2. Click the "Fork" button in the top right
3. This creates a copy under your GitHub account

#### **Clone Your Repository**
```bash
# Replace 'yourusername' with your GitHub username
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

### **2. Making Changes**

#### **Check Current Status**
```bash
# See which files have been modified
git status
```

#### **Stage Your Changes**
```bash
# Add all changed files
git add .

# Or add specific files
git add client/src/pages/Home.tsx
```

#### **Commit Your Changes**
```bash
# Commit with a descriptive message
git commit -m "Updated personal information and projects"
```

### **3. Push Changes to GitHub**

```bash
# Push to your main branch
git push origin main

# If it's your first push
git push -u origin main
```

### **4. Pull Latest Changes**

```bash
# Get latest updates from GitHub
git pull origin main
```

### **5. Create a New Branch** (for features)

```bash
# Create and switch to a new branch
git checkout -b feature/new-animation

# Make your changes, then:
git add .
git commit -m "Added new animation effect"
git push origin feature/new-animation
```

### **6. Common Git Workflows**

#### **Daily Development Workflow:**
```bash
# 1. Make sure you're up to date
git pull origin main

# 2. Create a new branch for your feature
git checkout -b feature/update-projects

# 3. Make your changes in VSCode
# ... edit files ...

# 4. Check what changed
git status

# 5. Stage and commit
git add .
git commit -m "Updated projects section with new game"

# 6. Push to GitHub
git push origin feature/update-projects

# 7. Go to GitHub and create a Pull Request
```

#### **Merge Branch to Main:**
```bash
# Switch to main branch
git checkout main

# Merge your feature branch
git merge feature/update-projects

# Push to GitHub
git push origin main
```

#### **Undo Changes** (before commit):
```bash
# Discard changes in a specific file
git checkout -- client/src/pages/Home.tsx

# Discard all uncommitted changes
git reset --hard
```

### **7. Viewing History**

```bash
# See commit history
git log

# See compact history
git log --oneline

# See changes in last commit
git show
```

### **8. Working with Remotes**

```bash
# View remote repositories
git remote -v

# Add a new remote
git remote add upstream https://github.com/original-owner/original-repo.git

# Fetch updates from upstream (original repo)
git fetch upstream
git merge upstream/main
```

---

## 🎨 Customizing Colors

Location: `client/src/index.css`

The cyberpunk color scheme is defined in CSS variables:

```css
--cyan: 189 97% 55%;      /* Cyan accent color */
--violet: 270 91% 65%;     /* Violet/purple accent */
--background: 0 0% 5%;     /* Dark background */
```

Change these HSL values to customize your theme!

---

## 🌐 Deployment

### **Deploy to Replit**
1. Click the "Deploy" button in Replit
2. Configure your deployment settings
3. Your site will be live!

### **Deploy to Vercel/Netlify**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist/public`
4. Deploy!

---

## 💡 Tips

1. **Test Locally First** - Always run `npm run dev` and test changes before pushing
2. **Commit Often** - Make small, frequent commits with clear messages
3. **Use Branches** - Create feature branches for major changes
4. **Backup Important Changes** - Push to GitHub regularly
5. **Read Error Messages** - They usually tell you exactly what's wrong

---

## 🆘 Troubleshooting

### **Port Already in Use**
```bash
# Kill the process using port 5000
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# On Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### **Git Push Rejected**
```bash
# Pull latest changes first
git pull origin main --rebase
git push origin main
```

### **Dependencies Not Installing**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Need Help?

- **Git Documentation:** [https://git-scm.com/doc](https://git-scm.com/doc)
- **React Docs:** [https://react.dev](https://react.dev)
- **Tailwind CSS:** [https://tailwindcss.com](https://tailwindcss.com)

---

## ⭐ Credits

Built with:
- React + TypeScript
- Express.js
- Tailwind CSS
- Framer Motion
- shadcn/ui components
- Drizzle ORM

---

**Made with 💜 and ⚡ by game developers, for game developers**
