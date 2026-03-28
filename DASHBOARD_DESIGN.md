# Dashboard UI/UX Design Characteristics

This document outlines the essential design characteristics, aesthetic rules, and the component inventory specifically for the TernakAja Dashboard. It builds upon the core foundation established in the project's UI design language.

## 1. Core Aesthetic & Radix UI Alignment
The application strictly follows a **Radix UI / shadcn/ui** style design language. It is opinionated about accessibility, composability, and maintaining a "premium, technical" SaaS vibe.
*   **Design Philosophy:** "Form follows function." Components should be minimalist, data-dense, and deeply accessible, mapping closely to Radix UI Primitives (e.g., using headless, unstyled functional bases with clean utility class applications).
*   **Vibe:** Modern SaaS, Developer-centric, Hardware-meets-Software, high-end analytics (Vercel/Linear/Stripe-esque).
*   **Keywords:** Glassmorphism, subtle glows, high-contrast typography, zero CSS bleed.

## 2. Color Characteristics & Palette
The dashboard mandates **strict parity between Dark and Light mode**. The primary accent color is a sharp, vibrant green.
*   **Accent Color:** Green (`#00D654` / `emerald-500`) used for health metrics, active states, and primary actions.
*   **Dark Mode:** Deep blacks (`#0A0A0A`), glowing accents for depth, pure white typography for high contrast.
*   **Light Mode:** Clean whites, off-whites (`bg-zinc-50`), crisp gray borders, pure black typography.

## 3. Dashboard Component Inventory (To Be Created)
The following is a list of essential architectural components specifically required for the Dashboard screens, implementing the above aesthetic rules:

### Layout & Navigation
*   **Sidebar Navigation (`DashboardSidebar`):** Minimalist collapsible sidebar. Uses glassmorphism (e.g., `backdrop-blur-md` with `border-white/5` in dark mode) and subtle active state highlights using the primary green.
*   **Top Header Bar:** Contains breadcrumbs, global search input, quick notification bell (with a glowing green dot indicator), and a User Avatar dropdown (Radix Dropdown Menu).
*   **Main Content Wrapper:** A structured layout enforcing proper spacing (`p-6` or `p-8`) to prevent CSS bleed and ensure clean data alignment.

### Data Visualization & Metrics
*   **Stat Cards (`StatCard`):** Data-dense metric boxes (e.g., "Total Livestock", "System Health"). Should feature giant metric numbers using high-contrast typography and subtle inner glows or crisp physical shadows depending on the active theme.
*   **Metrics Grid (`StatGrid`):** Responsive CSS Grid layout to neatly arrange Stat Cards.
*   **Charts (`HealthMetricsChart`, `SpeciesDistribution`):** High-end analytics visuals utilizing the primary green accent for positive trends/active data lines. Tooltips should be styled as minimal glassmorphism cards.

### Interactive Elements & Controls
*   **Data Tables / Data Grids:** For listing livestock or devices. Avoid heavy table borders. Use `border-b` styling with thin translucent borders (`border-white/5` or `border-gray-200`). Apply micro-interactions (`hover:bg-white/[0.02]`) on rows.
*   **Status Badges:** Small Radix-style tags for livestock/device status. Example: Translucent green bg (`bg-[#00D654]/10`) with solid green text (`text-[#00D654]`) for active/healthy states.
*   **Filter & Sort Dropdowns:** Minimalist Radix select primitives styled with zero CSS bleed.
*   **Action Buttons:** 
    *   *Primary:* High contrast blocks (e.g., White background, Black text in Dark Mode).
    *   *Secondary:* Transparent with subtle border transitions.

### Feedback & Alerts
*   **Toast Notifications (`sonner`):** Deeply integrated toast notifications for success/error alerts, maintaining the Vercel-esque high-contrast look.
*   **Empty States:** Premium empty state placeholders with muted icons and crisp, subdued typography when no data is available in tables or charts.

*STRICTLY MOBILE RESPONSIVE DESIGN*