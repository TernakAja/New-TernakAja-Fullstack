import { create } from 'zustand';

/**
 * DASHBOARD STORE (ZUSTAND) - STATE MANAGEMENT BUAT UI LAYOUT
 * ------------------------------------------------------------------
 * Arsitektur State kita dibagi menjadi 3 pilar:
 * 1. SERVER STATE (Data DB seperti nama sapi) -> Dipegang oleh React Query (useLivestockData)
 * 2. EPHEMERAL STATE (Suhu real time 1000hz) -> Dipegang oleh Zustand sensor-store
 * 3. UI STATE (Sidebar kebuka/tutup, search box) -> Dipegang oleh store ini.
 * 
 * Kenapa UI State dipisah dan ditaruh di Zustand, bukan useState lokal?
 * Agar kita bisa membuka Modal dari ujung komponen Tree (contoh: Header bar) tanpa harus 
 * menurunkan props ('prop-drilling') puluhan tingkat.
 */

export type TimeRange = '24h' | '7d' | '30d';
export type ViewMode = 'table' | 'grid';
export type ModalType = 'none' | 'edit-cow' | 'add-cow';

interface DashboardUIState {
  // 1. Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // 2. Mobile Sidebar
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;

  // 3. Global Date Filters
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;

  // 4. UI Layout Preferences
  livestockViewMode: ViewMode;
  setLivestockViewMode: (mode: ViewMode) => void;

  // 5. Global Modals
  activeModal: ModalType;
  selectedCowIdForModal: string | null;
  openModal: (type: ModalType, cowId?: string | null) => void;
  closeModal: () => void;
}

export const useDashboardStore = create<DashboardUIState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  isMobileSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isMobileSidebarOpen: isOpen }),

  timeRange: '24h',
  setTimeRange: (range) => set({ timeRange: range }),

  livestockViewMode: 'table',
  setLivestockViewMode: (mode) => set({ livestockViewMode: mode }),

  activeModal: 'none',
  selectedCowIdForModal: null,
  openModal: (type, cowId = null) => set({ activeModal: type, selectedCowIdForModal: cowId ?? null }),
  closeModal: () => set({ activeModal: 'none', selectedCowIdForModal: null }),
}));

