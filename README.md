# 🌐 Mehedi Hasan Rafi - Portfolio Website

A modern, responsive portfolio website for showcasing research work, publications, projects, and achievements. Built with React, TypeScript, Vite, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🌓 **Dark Mode** - Complete dark/light theme support
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized with Vite and React 19
- 🎭 **Scroll Animations** - Smooth fade-in animations on scroll
- 📝 **Content Management** - Display projects, publications, news, and gallery
- 🔍 **SEO Optimized** - Meta tags and SEO-friendly structure
- 🎯 **Accessibility** - WCAG compliant components

### Pages
- **Home** - Hero section, about preview, research interests, skills, projects, publications, gallery, news, testimonials
- **About** - Biography, research interests, academic background, experience, skills, awards, clients, testimonials
- **Projects** - List of research projects with filtering and search
- **Publications** - Academic publications with detailed views
- **News** - News and updates section
- **Gallery** - Image and video gallery
- **Contact** - Contact form and information
- **Admin Panel** - Content management interface

### UI Components
- Comprehensive component library built with Radix UI
- Custom animations and transitions
- Form validation with React Hook Form + Zod
- Toast notifications
- Loading states and skeletons
- Error boundaries
- Theme provider

## 🛠️ Tech Stack

### Core
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4
- **Routing**: Wouter 3

### State Management
- **Server State**: TanStack React Query 5
- **Client State**: Redux Toolkit 2
- **Form State**: React Hook Form 7

### UI Libraries
- **Components**: Radix UI
- **Icons**: Lucide React
- **Editor**: BlockNote (TipTap)
- **Animations**: Framer Motion
- **Charts**: Recharts

### Utilities
- **HTTP Client**: Axios
- **Validation**: Zod
- **Date Handling**: date-fns
- **Theme**: next-themes

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - Package manager
- **Backend API** - Running portfolio server (see backend README)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mehdihasanrafi-portfolio.git
cd mehdihasanrafi-portfolio/mehdihasanrafi-portfolio-website
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Application URL
VITE_APP_URL=http://localhost:8080
```

**Note**: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:8080`

## 🎯 Usage

### Development

```bash
# Start development server
pnpm dev
```

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

Built files will be in the `dist/` directory.

### Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## 📁 Project Structure

```
mehdihasanrafi-portfolio-website/
├── public/                  # Static assets
│   ├── images/             # Image files
│   └── _redirects         # SPA routing redirects
├── src/
│   ├── assets/             # Assets and styles
│   │   └── styles/
│   │       ├── base/       # Base styles (variables, typography)
│   │       ├── components/  # Component styles
│   │       └── utilities/  # Utility styles (animations, etc.)
│   ├── components/         # React components
│   │   ├── appliers/       # Global appliers (Animation, Toast, etc.)
│   │   ├── cards/          # Card components
│   │   ├── editor/         # Rich text editor
│   │   ├── partials/       # Layout components (Header, Footer)
│   │   ├── ui/             # UI component library
│   │   └── wrappers/       # Wrapper components
│   ├── config/            # Configuration files
│   │   ├── env/           # Environment variables
│   │   ├── endpoints/     # API endpoints
│   │   └── urls/          # URL constants
│   ├── hooks/             # Custom React hooks
│   │   ├── observers/     # Intersection Observer hooks
│   │   ├── states/        # State management hooks
│   │   ├── ui/            # UI-related hooks
│   │   └── utils/         # Utility hooks
│   ├── lib/               # Library configurations
│   │   ├── api.ts         # Axios instance
│   │   ├── queryClient.ts # React Query client
│   │   └── utils.ts       # Utility functions
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── gallery.tsx
│   │   ├── home.tsx
│   │   ├── news.tsx
│   │   ├── projects.tsx
│   │   └── publications.tsx
│   ├── redux/             # Redux store
│   │   └── slices/        # Redux slices
│   ├── services/          # API service functions
│   │   ├── auth.service.ts
│   │   ├── gallery.service.ts
│   │   ├── news.service.ts
│   │   ├── project.service.ts
│   │   └── publication.service.ts
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🗺️ Pages & Routes

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with hero, about preview, and content sections |
| `/about` | About | Detailed about page with biography, skills, awards, clients |
| `/projects` | Projects | List of all research projects |
| `/projects/:slug` | ProjectDetail | Individual project detail page |
| `/publications` | Publications | List of all academic publications |
| `/publications/:slug` | PublicationDetail | Individual publication detail page |
| `/news` | NewsPage | List of news and updates |
| `/news/:slug` | NewsDetail | Individual news detail page |
| `/gallery` | Gallery | Image and video gallery |
| `/contact` | Contact | Contact form and information |

### Admin Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/login` | AdminLogin | Admin authentication |
| `/admin` | AdminDashboard | Admin dashboard |
| `/admin/projects` | AdminProjectsPage | Project management |
| `/admin/publications` | AdminPublicationsPage | Publication management |
| `/admin/news` | AdminNewsPage | News management |
| `/admin/gallery` | AdminGalleryPage | Gallery management |

## 🧩 Components

### UI Components (Radix UI based)
- Accordion, Alert, Alert Dialog
- Avatar, Badge, Button
- Card, Checkbox, Dialog
- Dropdown Menu, Form, Input
- Select, Tabs, Toast
- Tooltip, and many more...

### Custom Components
- **AnimationApplier** - Handles scroll animations
- **ProjectCard** - Project display card
- **PublicationCard** - Publication display card
- **NewsCard** - News display card
- **Header** - Navigation header
- **Footer** - Site footer
- **HTMLEditor** - Rich text editor

### Features
- Theme switching (light/dark)
- Responsive navigation
- Scroll animations
- Form validation
- Error handling
- Loading states

## 🎨 Styling

### Tailwind CSS
- Custom theme configuration
- Dark mode support
- Responsive utilities
- Custom animations

### CSS Custom Properties
- Theme variables for colors
- Typography scales
- Spacing system

## 🔌 API Integration

The frontend communicates with the backend API through service functions:

- `auth.service.ts` - Authentication
- `project.service.ts` - Projects
- `publication.service.ts` - Publications
- `news.service.ts` - News
- `gallery.service.ts` - Gallery

All API calls use Axios with interceptors for:
- Automatic token attachment
- Token refresh on expiration
- Error handling
- Request/response logging

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `VITE_API_URL` - Your backend API URL
   - `VITE_APP_URL` - Your frontend URL
3. Build command: `pnpm build`
4. Output directory: `dist`
5. Deploy

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set environment variables
3. Build command: `pnpm build`
4. Publish directory: `dist`
5. Add `_redirects` file for SPA routing

### Static Hosting

The built files in `dist/` can be hosted on any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Any CDN

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://mehdihasanrafi.com` |
| `VITE_APP_URL` | Frontend application URL | `https://mehdihasanrafi.com` |

### API Configuration

API base URL is configured in `src/config/env/index.ts` and can be overridden with environment variables.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Focus management

## 🎭 Animations

### Scroll Animations
- Fade up
- Fade down
- Fade left
- Fade right

Animations are handled by `AnimationApplier` component using Intersection Observer API.

## 🔒 Security

- Environment variables for sensitive data
- Secure API communication
- Token-based authentication
- XSS protection
- CSRF protection (via backend)

## 📊 Performance

- Code splitting with Vite
- Lazy loading for images
- Optimized bundle size
- Fast page loads
- Efficient re-renders with React Query

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test
```

## 📝 Code Quality

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Husky** - Git hooks (optional)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Mehedi Hasan Rafi**
- Portfolio: [https://mehdihasanrafi.com](https://mehdihasanrafi.com)
- Email: mehedi.rafi@university.edu

## 🙏 Acknowledgments

- React team
- Vite team
- Tailwind CSS team
- Radix UI team
- All open-source contributors

---

**Built with ❤️ for research portfolio showcase**

