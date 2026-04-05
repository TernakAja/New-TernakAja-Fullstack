# TernakAja

> Industrial-Scalable Next.js Livestock IoT Telemetry Dashboard

An enterprise-ready, vertically modular dashboard designed to track thousands of livestock entities simultaneously. Built to ingest and visualize real-time IoT sensor data (temperature, heart rate, physical movements) without crashing the browser DOM or overwhelming the main JavaScript thread.

##  Core Features

- **Domain-Driven Modularization:** Strict separation of concerns leveraging feature-sliced architecture (`/features/livestock`, `/features/sensors`, `/features/dashboard`) for enterprise-level scaling and team colocation.
- **Aggressive Real-Time Buffering:** Utilizes Web Workers (`telemetry.worker.ts`) and buffered React Hooks (`useRealtimeSensors`) to batch incoming Supabase WebSocket emissions so the React DOM only repaints periodically rather than on every individual ping.
- **Massive Data Rendering:** Implements `O(1)` data lookups dicts alongside `@tanstack/react-virtual` allowing users to render tens of thousands of IoT data rows smoothly without DOM lagging.
- **Hybrid State Management:** 
  - **Server State:** Managed strictly via `@tanstack/react-query` v5 for caching, deduplication, and stale-while-revalidate cycles.
  - **UI/Transient State:** Managed seamlessly via strictly scoped `zustand` stores (search filters, modal toggles, mobile sidebars).
- **Authentication & Security:** Native integration with Supabase Auth handling SSR protections and middleware redirects across Next.js Route Groups (`(auth)`, `(marketing)`).
- **Optimized UI Engine:** Powered by Radix UI, Tailwind CSS, and `shadcn/ui` with Next.js specific CSS optimizations.

---

##  Architecture

Instead of organizing files by their technical type (e.g. all `hooks/`, all `components/`), this repository uses a **Vertical Feature Slicing** strategy. Every feature acts as a complete domain module:

```text
📦 features/
 ┣ 📂 dashboard/     # Layout shells, active sidebars, search logic
 ┃ ┣ 📂 components/ 
 ┃ ┗ 📂 store/       # Zustand UI store strictly tailored to layout
 ┣ 📂 livestock/     # Cattle entities, table maps, data models
 ┃ ┣ 📂 components/  # DOM Virtualized Tables
 ┃ ┣ 📂 hooks/       # React Query data fetching cycles 
 ┃ ┗ 📂 services/    # Pure Supabase database functions
 ┗ 📂 sensors/       # Telemetry logic, batching mechanisms, worker threads
   ┣ 📂 components/  # Health Metrics Charting
   ┣ 📂 hooks/       # Buffered Websocket Subscriptions
   ┗ 📂 workers/     # WebWorkers for off-main-thread processing
```

---

##  Tech Stack

- **Framework:** Next.js 15+ (App Router, Route Groups, Server Actions)
- **Database & Auth:** Supabase (PostgreSQL + RLS + GoTrue + Realtime)
- **Language:** TypeScript
- **Server State:** `@tanstack/react-query` v5
- **UI State:** `zustand`
- **Virtualization:** `@tanstack/react-virtual`
- **Utility:** `lodash` (Debouncing, Throttling), `clsx`, `tailwind-merge`
- **Styling:** Tailwind CSS & `shadcn/ui`

---

##  Getting Started

### 1. Requirements

- `Node.js` v18+ 
- `pnpm` (Recommended) or `npm` / `yarn`
- A configured [Supabase](https://supabase.com/) Project.

### 2. Environment Setup

Create `.env.local` based on `.env.example`:

```bash
cp .env.example .env.local
```

Fill in your Supabase variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### 3. Installation

```bash
pnpm install
```

### 4. Running Locally

Execute the Next.js Turbopack development server:

```bash
pnpm dev
# or: npm run dev
```

Visit `http://localhost:3000` to view the landing page, and navigate to `/dashboard` to load the application.

---

##  Scalability Roadmap

TernakAja is built specifically to address the pain points of massive IoT ingestion on the UI layer. Future planned milestones:
- [ ] Migrate raw socket ingestion from native Supabase channels to an MQTT Protocol -> TimescaleDB event streaming bridge for >100,000 requests/sec.
- [ ] Implement deeper WASM (WebAssembly) computations inside `telemetry.worker.ts` for predictive anomaly detection mapping on the client side.
- [ ] Expand the e2e testing suite tailored to the domain-driven feature nodes utilizing Playwright.

---

*Engineered with performance and structure for massive IoT pipelines.*
