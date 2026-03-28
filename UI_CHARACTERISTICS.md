# UI/UX Characteristics & Design Language

This document serves as a guide for AI Coding Agents and Developers to maintain a consistent visual and architectural language across the TernakAja codebase.

## 1. Core Aesthetic & Radix UI Alignment
The application strictly follows a **Radix UI / shadcn/ui** style design language. It is opinionated about accessibility, composability, and maintaining a "premium, technical" SaaS vibe.
*   **Design Philosophy:** "Form follows function." Components should be minimalist, data-dense, and deeply accessible, mapping closely to Radix UI Primitives (e.g., using headless, unstyled functional bases with clean utility class applications).
*   **Vibe:** Modern SaaS, Developer-centric, Hardware-meets-Software, high-end analytics (Vercel/Linear/Stripe-esque).
*   **Keywords:** Glassmorphism, subtle glows, high-contrast typography, zero CSS bleed.

## 2. Color Characteristics & Palette
The app mandates **strict parity between Dark and Light mode**. The primary accent color is a sharp, vibrant green.

### **Primary Accent (Green)**
The application's signature color is a neon/emerald green, specifically used to denote health, connectivity, and primary calls to action.
*   **Core Hex:** `#00D654` (or Tailwind `emerald-500` / `green-500`).
*   **Usage:** Giant metric numbers (e.g., "14 days", "30%"), active checkmarks, and primary active states.
*   **Accent Badges:** Often implemented as a translucent green bg with solid green text.
    *   *Dark Mode:* `bg-[#00D654]/10 text-[#00D654]`
    *   *Light Mode:* `bg-[#00D654]/15 text-[#00A040]`

### **Dark Mode Characteristics**
Dark mode leverages extremely deep blacks and dark grays to create physical "layers" of elevation with glowing accents. 
*   **App Background:** Pure Black (`#0A0A0A` or `bg-black`). There should be no "washing out" of the main background.
*   **Cards & Containers (Layer 1):** Very dark grays (`#111111`, `#131313`, or `bg-zinc-950`).
*   **Elevated Surfaces (Layer 2):** Slightly lighter elements or hovers (`#1A1A1A`, `bg-[#1c1c1c]`, `bg-white/[0.02]`).
*   **Typography:** Pure White (`text-white`) for headings. Subdued grays (`#888888`, `#A3A3A3`, `text-zinc-400`) for secondary text.
*   **Borders:** Subtle translucent overlays `border-white/5` to `border-white/10` (or `border-zinc-800`).

### **Light Mode Characteristics**
Light mode flips the paradigm to clean, airy, and clinical whites and grays, relying on subtle physical shadows and crisp lines instead of neon glows.
*   **App Background:** Clean White (`bg-white`) or off-white (`bg-zinc-50`).
*   **Cards & Containers (Layer 1):** Solid white or very faint gray (`bg-white` or `bg-gray-50`).
*   **Elevated Surfaces (Layer 2):** Hover states slightly darken the surface (`hover:bg-gray-100`).
*   **Typography:** Pure Black (`text-black`) or deep gray (`text-zinc-900`) for headings. Slate/mid-grays (`text-gray-500`, `text-gray-600`) for secondary text.
*   **Borders:** Crisp, faint solid grays `border-gray-200` or `border-black/5`.
*   **Shadows:** In light mode, swap glowing effects for real physical elevation: `shadow-sm`, `shadow-md`.

## 3. Key UI Patterns & Effects

### Background Patterns
We frequently use subtle, technical backgrounds to break up empty space without adding noise:
*   **Dot Grids:** `radial-gradient` dots with heavily faded masking.
*   **Line Grids:** `linear-gradient` fine lines, masked with `mask-image: radial-gradient(...)` to fade out at the edges. (e.g., `[background-size:24px_24px]`).

### Ambient Glows (Dark Mode Speciality)
Many components (Hero sections, Product cards) feature a soft, blurred radial glow behind them to create a sense of depth and focus, often using the primary green or a subtle blue/emerald tint.
*   **Implementation:** An absolute div positioned behind the main content, e.g., `className="absolute w-96 h-96 bg-[#00D654]/10 blur-[100px] rounded-full z-0"`.
*   *Note:* Ensure glows are disabled or inverted to soft drop-shadows in **Light Mode**.

### Glassmorphism
Cards should feel like physical, premium objects.
*   **Dark Mode:** Transparent backgrounds with thin white borders (`bg-white/[0.02] border border-white/5`).
*   **Light Mode:** Solid backing with thin gray borders (`bg-white border border-gray-200`).
*   For blur effects: `backdrop-blur-md` is used behind navigation and sticky headers.

## 4. Common Component Structures (Radix Style)

### Badges / Tags
Used for statuses, versions, or feature flags (e.g., "INTEGRATED SOFTWARE").
*   **Style:** Monospace font, tiny text, high tracking, extremely rounded borders.
*   **Example:** `px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider bg-[#00D654]/10 text-[#00d654] border border-[#00D654]/20`.

### Tables & Data Grids
*   Avoid standard heavy HTML tables. Use CSS `grid` with flexible columns.
*   Rows separated by `border-b border-white/5` (Dark) or `border-b border-gray-100` (Light).
*   Hover states should apply a micro-interaction (e.g., `hover:bg-white/[0.02]` or `hover:bg-gray-50`).

### Buttons
*   **Primary:** High contrast block.
    *   *Dark mode:* White background, black text (`bg-white text-black hover:bg-gray-200`).
    *   *Light mode:* Black background, white text (`bg-black text-white hover:bg-neutral-800`).
*   **Secondary:** Transparent with subtle border transition.
    *   *Classes:* `bg-transparent border border-transparent hover:border-gray-200 dark:hover:border-white/10`.

### Layout & Containers
*   **Constraints:** Sections usually wrap content in a max-width container, typically `max-w-5xl` or `max-w-6xl` with `mx-auto` and horizontal padding (`px-4` or `px-6`).
*   **Z-Indexing:** Because of absolute glows and grids, ALWAYS ensure the actual content container is relative with a higher z-index (`relative z-10`).

## 5. Development Checklist for New Work
When generating or editing code for this repo, verify:
1.  [ ] Are components composed efficiently matching Radix UI best practices (unadorned, accessible wrappers)?
2.  [ ] Does the UI perfectly support BOTH Dark mode (`dark:` prefixes) and Light mode?
3.  [ ] Are texts deeply contrasting (`white`/`black` for headers, `#888`/`gray-500` for copy)?
4.  [ ] Is the primary accent color `#00D654` applied elegantly (not overbearing) on crucial data points, checkmarks, and primary badges?
5.  [ ] Are borders kept ultra-thin (`border-white/5` dark, `border-gray-200` light) to maintain the premium glass/layout effect?

