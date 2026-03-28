# 🚀 Premium Kanban Task Board

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)

A high-performance, premium SaaS-style Kanban board designed for maximum interactivity and visual excellence. Built with **React 19**, **Vite**, and **Tailwind CSS v4**, this application features glassmorphism, fluid animations, and a robust feature set for efficient task management.

---

## ✨ Key Features

- **🎯 Interactive Kanban Flow**: Seamlessly manage tasks across `To Do`, `In Progress`, and `Done`.
- **🤏 Smooth Drag & Drop**: Intuitive task movement powered by `@dnd-kit` with real-time visual feedback.
- **🌗 Dual-Tone Theme Engine**: 
  - Dynamic **Night Mode** and **Day Mode** toggle.
  - Custom Tailwind v4 variant support for perfect class-based theme switching.
- **🔍 Advanced Search & Filter**:
  - Global searching by task title.
  - Multi-criteria filtering by priority and column status.
- **⚡ Global Shortcuts**: industry-standard `Ctrl+K` / `Cmd+K` to immediately focus the search bar.
- **🏗️ Full Task Lifecycle**: Add, Edit, Move, and Delete tasks with a sleek modal interface.
- **💾 Local Persistence**: Automatic sync with `localStorage` ensures your data is never lost.
- **🛠️ Settings & Notifications**: Quick board actions and activity tracking for a complete SaaS feel.

---

## 🛠️ Technology Stack

| Core | Styles | Icons | Animations |
| --- | --- | --- | --- |
| **React 19** | **Tailwind v4** | **Lucide React** | **Framer Motion** |
| **Vite 8** | Vanilla CSS | SVG Based | Hardware Accelerated |

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Development Mode
Start the premium dev server:
```bash
npm run dev
```

---

## 📂 Project Architecture

```bash
src/
├── components/      # ✨ UI Components (Modals, Headers, Cards)
├── hooks/           # ⚓ useTasks: Centralized state & logic
├── utils/           # 📦 LocalStorage persistence layer
├── styles/          # 🎨 Tailwind v4 & Glassmorphism tokens
└── App.jsx          # 🏗️ Application orchestrator
```

---

## ⌨️ Power User Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `⌘ + K` | Focus Search Bar |
| `Esc` | Close Modals |
| `Enter` | Save Task (in Modal) |

---

## 💎 Design Philosophy
- **Glassmorphism**: Subtle backgrounds and blurs create a modern, deep UI.
- **Micro-interactions**: Hover effects and transitions make the app feel alive.
- **Accessibility**: High-contrast icons and clear focus states across all themes.

---

Produced with Precision by **Antigravity** 🚀
