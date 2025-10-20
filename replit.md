# Mahantesh Biradar AI Portfolio

## Overview

This is a modern, futuristic portfolio website for Mahantesh Biradar, an AI Engineer specializing in IoT and Cybersecurity. The application showcases projects, experiences, and provides an interactive AI chatbot for visitors to learn more about his work. The design follows a cyberpunk-inspired aesthetic with dark mode, neon gradients (cyan and purple), and glassmorphism effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: shadcn/ui components built on top of Radix UI primitives, providing accessible and customizable UI elements. The component system uses the "new-york" style variant with custom theming.

**Styling Approach**: 
- Tailwind CSS for utility-first styling
- Custom CSS variables for theming (defined in `index.css`)
- Dark mode by default with a futuristic cyberpunk color palette
- Glassmorphism effects (`backdrop-blur-xl`, `bg-white/5`)
- Neon gradient accents using cyan (189 97% 55%) and purple (270 91% 65%)

**State Management & Data Fetching**:
- TanStack Query (React Query) for server state management and caching
- Custom `apiRequest` utility for API communication
- Query client configured with infinite stale time and no automatic refetching

**Routing**: Wouter for lightweight client-side routing (currently single-page with Home route).

**Design System**:
- Typography: Space Grotesk font family (with Inter fallback) for futuristic aesthetic
- Color palette: Deep charcoal backgrounds, cyan/purple neon accents, neutral text colors
- Spacing: Tailwind's standard spacing scale (4, 8, 12, 16, 20, 24, 32)
- Border radius: Custom values (.5625rem, .375rem, .1875rem)

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Structure**:
- RESTful endpoints under `/api` prefix
- `/api/contact` - POST endpoint for contact form submissions
- `/api/chat` - POST endpoint for AI chatbot interactions
- `/api/projects` - GET endpoint for fetching project listings
- `/api/blog` - GET endpoint for blog post listings

**Request Handling**:
- JSON body parsing with `express.json()`
- URL-encoded form data support
- Custom logging middleware for API requests (with response capture)
- Centralized error handling middleware

**Development Features**:
- Vite middleware integration in development mode
- Hot module replacement (HMR) support
- Runtime error overlay plugin for development
- Replit-specific development tools (cartographer, dev banner)

### Data Storage Solutions

**ORM**: Drizzle ORM for type-safe database operations.

**Database Schema** (PostgreSQL):
- `projects` - Stores portfolio projects with technologies array, images, links, and featured flag
- `blog_posts` - Blog content with title, excerpt, full content, and publication dates
- `contact_messages` - User contact form submissions with timestamps
- `chat_messages` - Chat conversation history with user messages and AI responses

**Database Provider**: Neon serverless PostgreSQL (configured via `@neondatabase/serverless`).

**Storage Abstraction**: 
- `IStorage` interface defining data access methods
- `MemStorage` in-memory implementation for development/testing with seeded data
- Includes hardcoded project examples (VrindaAI, Blender Automation, Unreal Engine Integration, AI Video Editing Agent)
- Hardcoded experience timeline and chatbot response logic

**Validation**: Zod schemas (via `drizzle-zod`) for runtime type validation of insert operations.

### Authentication and Authorization

Currently not implemented. The application is a public portfolio site without authentication requirements.

### External Dependencies

**UI & Styling**:
- Radix UI primitives for accessible components
- Tailwind CSS for styling
- class-variance-authority (CVA) for variant-based component styling
- Framer Motion for animations and transitions
- Embla Carousel for carousel functionality

**Forms & Validation**:
- React Hook Form for form state management
- @hookform/resolvers for schema validation integration
- Zod for schema validation

**Development Tools**:
- tsx for TypeScript execution in development
- esbuild for production builds
- Vite plugins for Replit integration (@replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner)

**Database & ORM**:
- Drizzle ORM and Drizzle Kit
- Neon serverless PostgreSQL driver
- connect-pg-simple (likely for session storage, though not actively used)

**Build & Deployment**:
- Separate client and server builds
- Client builds to `dist/public`
- Server bundles with esbuild to `dist/index.js`
- Environment-based configuration (NODE_ENV)

**Special Features**:
- Particle background animation canvas
- AI chatbot with rule-based responses (currently hardcoded, not using external LLM API)
- Animated gradient text effects
- Glassmorphic card designs
- Responsive design with mobile hooks