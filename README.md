# 🚀 Premium Kanban Task Board

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![jsPDF](https://img.shields.io/badge/Reporting-jsPDF-DB2E2C?logo=adobe-acrobat-reader&logoColor=white)](https://github.com/parallax/jsPDF)

A high-performance, premium SaaS-style Kanban board designed for maximum interactivity and visual excellence. Built with **React 19**, **Vite**, and **Tailwind CSS v4**, this application features glassmorphism, fluid animations, and a robust feature set for efficient task management.

---

## 🏗️ Architecture Design

The project follows a **Modular Component Architecture** with a **Centralized State Hook** for data management and persistence.

```mermaid
graph TD
    subgraph State Management
        UT[useTasks Hook]
        LS[(Local Storage)]
    end

    subgraph UI Layer
        App[App.jsx]
        Header[Header.jsx]
        Column[Column.jsx]
        Card[TaskCard.jsx]
        Modal[TaskModal.jsx]
    end

    subgraph Utilities
        PDF[report-generator.js]
    end

    UT <--> LS
    App --> UT
    App --> Column
    Column --> Card
    Header --> UT
    Card --> Modal
    Header --> PDF
```

---

## 🔄 Project Flow & Logic

### 1. Initialization
When the app loads, `useTasks` initializes by reading from `localStorage`. If empty, it populates with default tasks.

### 2. Task Lifecycle
```mermaid
sequenceDiagram
    participant User
    participant UI as UI Component
    participant Hook as useTasks Hook
    participant DB as LocalStorage

    User->>UI: Create/Edit Task
    UI->>Hook: addTask() / updateTask()
    Hook->>Hook: Update State
    Hook->>DB: Persist to Storage
    Hook-->>UI: Re-render with new data
```

### 3. Reporting Flow
Users can trigger a **PDF Report** from the settings. The `report-generator.js` utility processes the current task state, calculates metrics (completed vs. pending), and generates a professional PDF document.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| --- | --- | --- |
| **Framework** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Core UI Library |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Lightning-fast development |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Modern Utility-First CSS |
| **Animations** | ![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) | Smooth UI Transitions |
| **Interactions** | ![dnd-kit](https://img.shields.io/badge/dnd--kit-FFCC00?style=for-the-badge) | Drag & Drop Functionality |
| **Reporting** | ![jsPDF](https://img.shields.io/badge/jsPDF-DB2E2C?style=for-the-badge) | Client-side PDF Generation |

---

## 📂 Project Structure

```bash
Kanban Task Board/
├── src/
│   ├── components/      # ✨ Pure & Interactive UI Components
│   │   ├── Column.jsx      # Task containers by status
│   │   ├── TaskCard.jsx    # Individual task display
│   │   ├── Header.jsx      # Navigation & Global Controls
│   │   └── TaskModal.jsx   # Create/Edit overlay
│   ├── hooks/           # ⚓ Business Logic & State
│   │   └── useTasks.js     # Centralized task management
│   ├── utils/           # 📦 Utility Functions
│   │   ├── local-storage.js # Persistence layer
│   │   └── report-generator.js # PDF logic
│   ├── styles/          # 🎨 Styling & Design Tokens
│   │   └── index.css       # Tailwind & Glassmorphism config
│   └── App.jsx          # 🏗️ Application Entry Point
└── public/              # 📢 Static Assets
```

---

## ✨ Key Features

- **🎯 Interactive Kanban Flow**: Manage tasks across `To Do`, `In Progress`, and `Done`.
- **🤏 Professional Drag & Drop**: Powered by `@dnd-kit` with sensor-based precision.
- **🌗 Dual-Tone Theme Engine**: 
  - Dynamic **Night Mode** and **Day Mode** toggle.
  - Custom glassmorphism effects tailored for both themes.
- **🔍 Advanced Search & Filter**:
  - Global searching by task title.
  - Multi-criteria filtering by priority and column status.
- **⚡ Global Shortcuts**: `Ctrl+K / Cmd+K` for instant search focus.
- **📊 Reporting System**: Generate detailed PDF analytics of your task board.
- **💾 Local Persistence**: All changes are automatically synced to `localStorage`.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Development
```bash
npm run dev
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

- **Glassmorphism**: Depth through blurs and translucent borders.
- **Performance**: Optimized re-renders through modular hooks.
- **Micro-interactions**: Hover feedback and fluid layout transitions.

---

Produced with Precision by **Antigravity** 🚀
