# UI/UX Characteristics & Design Language

This document serves as a guide for AI Coding Agents and Developers to maintain a consistent visual and architectural language across the TernakAja codebase.

## 1. Core Aesthetic & Radix UI Alignment
The application strictly follows a **Radix UI / Vercel** style design language. It is unopinionated about specific component structures but highly opinionated about accessibility, composability, and the "premium technical" vibe.
*   **Design Philosophy:** "Form follows function." Components should be minimalist, data-dense, and deeply accessible, mapping closely to Radix UI Primitives (e.g., using `Accordion`, `Dialog`, `Popover` without heavy custom DOM structures).
*   **Vibe:** Modern SaaS, Developer-centric, Hardware-meets-Software, high-end analytics.
*   **Keywords:** Glassmorphism, subtle glows, pure contrasting typography, clean layouts.

## 2. Color Characteristics & Palette
The app is a **Dark-Mode-First** application. The primary accent color is a sharp, vibrant green.

### **Backgrounds & Surfaces**
The app leverages extremely deep blacks and dark grays to create physical "layers" of elevation.
*   **App Background:** Pure Black (`#0A0A0A` or `bg-black`). There should be no "washing out" of the main background.
*   **Cards & Containers (Layer 1):** Very dark grays (`#111111`, `#131313`, or `bg-zinc-950`).
*   **Elevated Surfaces (Layer 2):** Slightly lighter elements or hovers (`#1A1A1A`, `bg-[#1c1c1c]`, `bg-white/[0.02]`).

### **Typography & Text Colors**
Adhering to Radix UI's high-contrast accessibility rules:
*   **Primary Headings & Text:** Pure White (`text-white`) for maximum contrast and readability against pure black.
*   **Secondary/Muted Text:** Subdued grays (`#888888`, `#A3A3A3`, `text-zinc-400`, `text-gray-500`). Used for descriptions, subtitles, and table headers.

### **Primary Accent (Green)**
The application's signature color is a neon/emerald green, specifically used to denote health, connectivity, and primary calls to action.
*   **Core Hex:** `#00D654` (or Tailwind `emerald-500` / `green-500`).
*   **Usage:** Giant metric numbers (e.g., "14 days", "30%"), active checkmarks, and primary active states.
*   **Accent Badges:** Often implemented as a translucent green bg with solid green text (e.g., `bg-[#00D654]/10 text-[#00D654]` or `bg-emerald-500/10 text-emerald-500`).

### **Borders & Dividers**
Borders are never solid lines; they are subtle, translucent overlays that act as "glass edges."
*   **Standard Borders:** `border-white/5` to `border-white/10` (or `border-zinc-800`).
*   **Dividers:** Often `border-b border-white/5`.

## 3. Key UI Patterns & Effects

### Background Patterns
We frequently use subtle, technical backgrounds to break up empty space without adding noise:
*   **Dot Grids:** `radial-gradient` dots with heavily faded masking.
*   **Line Grids:** `linear-gradient` fine lines, masked with `mask-image: radial-gradient(...)` to fade out at the edges. (e.g., `[background-size:24px_24px]`).

### Ambient Glows
Many components (Hero sections, Product cards) feature a soft, blurred radial glow behind them to create a sense of depth and focus, often using the primary green or a subtle blue/emerald tint.
*   **Implementation:** An absolute div positioned behind the main content, e.g., `className="absolute w-96 h-96 bg-[#00D654]/10 blur-[100px] rounded-full z-0"`.

### Glassmorphism
Cards should feel like physical, premium objects.
*   Use transparent backgrounds with thin white borders (`bg-white/[0.02] border border-white/5`).
*   For blur effects: `backdrop-blur-md` combined with `bg-black/50`.

## 4. Common Component Structures (Radix Style)

### Badges / Tags
Used for statuses, versions, or feature flags (e.g., "INTEGRATED SOFTWARE").
*   **Style:** Monospace font, tiny text, high tracking, extremely rounded borders.
*   **Example:** `px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider bg-[#00D654]/10 text-[#00d654] border border-[#00D654]/20`.

### Tables & Data Grids
*   No standard heavy HTML tables. Use `grid` with flexible columns.
*   Rows separated by `border-b border-white/5`.
*   Hover states should apply a micro-interaction (e.g., `hover:bg-white/[0.02]`).

### Layout & Containers
*   **Constraints:** Sections usually wrap content in a max-width container, typically `max-w-5xl` or `max-w-6xl` with `mx-auto` and horizontal padding (`px-4` or `px-6`).
*   **Z-Indexing:** Because of absolute glows and grids, ALWAYS ensure the actual content container is relative with a higher z-index (`relative z-10`).

## 5. Development Checklist for New Work
When generating or editing code for this repo, verify:
1.  [ ] Are components composed efficiently matching Radix UI best practices (unadorned, accessible wrappers)?
2.  [ ] Are the backgrounds strictly `#0A0A0A` or `black` with cards stepping up slightly to `#111` or `#131313`?
3.  [ ] Are texts deeply contrasting (`white` for headers, `#888` for copy)?
4.  [ ] Is the primary accent color `#00D654` applied elegantly (not overbearing) on crucial data points, checkmarks, and primary badges?
5.  [ ] Are borders kept at `border-white/5` or `border-white/10` to maintain the glass layout effect?