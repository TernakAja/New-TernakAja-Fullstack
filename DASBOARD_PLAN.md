Phase 1: Core Infrastructure & State Decoupling
Before building components, the foundation must support high-frequency data updates (eartag telemetry) without crashing the main UI thread.

Initialize shadcn/ui & Tailwind: Configure tailwind.config.js with strict CSS variables for the color palette (--background, --foreground, --accent-green). Map #00D654 to a semantic variable, not hardcoded utilities.

Theme Provider: Implement next-themes (or equivalent) to handle the light/dark toggle. Map the distinct visual styles (glows vs. shadows) to the .dark and .light root classes.

State Architecture: Do not store high-frequency incoming IoT sensor data in standard React Context. Use a lightweight, atomic state manager (like Zustand or Jotai) to ensure that a temperature update on a single StatCard does not trigger a re-render of the entire DashboardSidebar and TopHeaderBar.

Phase 2: Mobile-First Layout Skeleton
Build from xs screens up to prevent CSS bleed and layout shifts.

Responsive Shell (DashboardLayout):

Mobile (< 768px): The DashboardSidebar must be replaced by a bottom tab navigation for core routes, with a Radix Sheet (Drawer) triggered from the TopHeaderBar for deeper settings.

Desktop (>= 768px): The DashboardSidebar locks to the left. Implement a collapsible state to reclaim horizontal pixels for data visualization.

Top Header Bar: Implement the global search. Ensure the Radix DropdownMenu for the user avatar is portaled (<DropdownMenu.Portal>) so it is not trapped by overflow-hidden containers in the main layout.

Phase 3: Data Visualization & Performance
The dashboard's primary utility relies on rendering cattle health and system metrics quickly.

StatCard Implementation: Use Radix primitives for tooltips if the metric requires explanation.

Edge Case: If a sensor drops offline, the card must gracefully degrade to a muted #888888 "No Data" state rather than displaying 0 or NaN, which implies a dead animal rather than a dead battery.

Charts (HealthMetricsChart): * Bottleneck: Do not use SVG-based charting libraries (like Recharts) if you are rendering historical telemetry data exceeding a few hundred points. Use a Canvas-based library (like Chart.js or ECharts) integrated into a React wrapper to prevent memory leaks and maintain 60fps scrolling on mobile.

Phase 4: Data Grids & Complex Interactions
Handling the livestock and hardware inventory.

Responsive Data Tables:

Desktop: Implement the standard table with border-b rows. Integrate a headless table library (like TanStack Table) to handle sorting and filtering without tying it to the DOM structure.

Mobile Fallback: When the viewport hits the mobile breakpoint, the <table> element must hide. Render the identical dataset using a stacked Card layout (e.g., one card per cow/eartag) vertically.

Pagination vs. Virtualization: If the herd size or device count exceeds 200 rows, implement virtual scrolling (windowing). Rendering massive DOM trees will freeze lower-end mobile devices used in the field.

Phase 5: Feedback, Edge Cases, & Polish
Finalizing the UX layer.

sonner Toast Integration: Configure toasts to appear at bottom-center on mobile (easier thumb reach) and bottom-right on desktop.

Empty States: Create a standardized <EmptyState /> component. If a user filters the device list to "Critical Battery" and none exist, display an illustration, a clear message ("No devices currently in critical state"), and a primary action button to clear the active filters.