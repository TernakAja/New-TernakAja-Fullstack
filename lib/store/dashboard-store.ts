import { create } from 'zustand';

export interface LivestockData {
  id: string;
  name: string;
  health: 'Good' | 'Needs Attention' | 'Critical';
  batteryUrl: number;
  temperature: number | null; // null if sensor offline
}

interface DashboardState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  livestock: LivestockData[];
  setLivestock: (data: LivestockData[]) => void;
  updateLivestockSensor: (id: string, temp: number | null, battery: number) => void;
}

// Simulated initial data
const initialData: LivestockData[] = [
  { id: 'cow-001', name: 'Bessie', health: 'Good', batteryUrl: 85, temperature: 38.6 },
  { id: 'cow-002', name: 'Daisy', health: 'Needs Attention', batteryUrl: 40, temperature: 39.5 },
  { id: 'cow-003', name: 'Bella', health: 'Critical', batteryUrl: 15, temperature: 40.2 },
  { id: 'cow-004', name: 'Moo-Moo', health: 'Good', batteryUrl: 0, temperature: null }, // Offline
];

export const useDashboardStore = create<DashboardState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  livestock: initialData,
  setLivestock: (data) => set({ livestock: data }),
  updateLivestockSensor: (id, temp, battery) => set((state) => ({
    livestock: state.livestock.map(cow => 
      cow.id === id ? { ...cow, temperature: temp, batteryUrl: battery } : cow
    )
  })),
}));
