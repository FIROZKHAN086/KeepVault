# KeepVault - Secure Document Management System 🛡️

Welcome to the **KeepVault** frontend application! KeepVault is a secure, modern, and privacy-first document storage and management platform. It allows users to safely upload, manage, and organize their sensitive files with ease. 

This repository contains the Next.js client application for the KeepVault ecosystem.

---

## 📖 What is KeepVault?
In the modern digital age, keeping sensitive documents (like IDs, contracts, or financial records) safe is critical. KeepVault provides a "digital vault" where users can register, log in securely, and store their private files. 

### Key Features
1. **Secure Authentication:** Complete Login and Registration flows.
2. **Dashboard Management:** A protected dashboard to view and manage uploaded files.
3. **Advanced Settings:** Account profiling and security preference management.
4. **Seamless UI/UX:** Built with a beautiful, fast, and responsive user interface using modern design principles.
5. **Dark Mode Integration:** Full support for system-preference dark and light mode themes.

---

## 🚀 Tech Stack

We utilize cutting-edge web technologies to ensure maximum performance and developer experience:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **State Management:** Ready for integration (e.g., Zustand)
- **API Communication:** Axios via dedicated service files.

---

## 📂 Project Structure

The project strictly separates UI components from business logic for ultimate scalability:

```text
client/
├── app/                    # Next.js App Router (Pages & Layouts)
│   ├── (auth)/             # Login & Register routes
│   ├── dashboard/          # Protected User Dashboard & Settings
│   └── page.tsx            # Main Landing Page
├── components/             # Reusable UI Components
│   ├── home/               # Landing page sections (Hero, Features)
│   ├── layout/             # Navbar, Footer, Sidebars
│   ├── ui/                 # Shadcn base components (Buttons, Inputs)
│   └── theme-provider.tsx  # Next-themes configuration
├── lib/                    # Core utilities (Tailwind merges, Axios setup)
├── hooks/                  # Custom React hooks (useAuth, useToast)
├── services/               # API Data fetching layer (Auth & Docs)
├── types/                  # Global TypeScript Interfaces
└── constants/              # Application Configs & Route variables
```

---

## 🏃‍♂️ Getting Started 

Follow these instructions to run the KeepVault client locally.

### 1. Installation

First, ensure you have Node.js installed. Then, run:

```bash
npm install
# or
yarn install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory based on the configuration constants needed for the API:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run the Development Server

Start the application in development mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!


## 👥 For Admins and Developers

Context for new developers/admins exploring this codebase:
- **API Integration:** All backend calls should be routed through the `services/` directory to keep components clean.
- **Client Components:** Components needing interactivity (like `ThemeToggle` or forms) use the `"use client"` directive. 
- **Theming:** Theming functionality is provided globally by `next-themes` wrapped in `app/layout.tsx`. Tailwind classes like `dark:bg-black` handle element-specific dark mode styling.
