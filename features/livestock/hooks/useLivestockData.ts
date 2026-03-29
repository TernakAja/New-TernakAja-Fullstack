import { useQuery } from '@tanstack/react-query';


export interface LivestockData {
    id: string; // or number depending on backend 
    name: string;
    health: 'Good' | 'Needs Attention' | 'Critical';
    batteryUrl: number;
    temperature: number | null;
}

export type LivestockDict = Record<string, LivestockData>;

async function fetchLivestockData(): Promise<LivestockDict> {
    // In a real implementation this might fetch from an API route or supabase directly
    const res = await fetch('/api/livestock/sensor');
    if (!res.ok) {
        throw new Error('Failed to fetch livestock data');
    }

    const json = await res.json();
    const rawData = json.data || [];

    // Normalize array to object dictionary mapped by ID for O(1) lookups
    const normalized: LivestockDict = {};
    rawData.forEach((item: any) => {
        // Adapter mapping backend structure to frontend structure
        normalized[item.id] = {
            id: String(item.id),
            name: item.name || `Cow-${item.id}`,
            // mock health/battery if backend doesn't provide them yet
            health: 'Good',
            batteryUrl: 100,
            temperature: item.sensor_data?.[0]?.temperature || null,
        };
    });

    // Fallback if API hasn't been implemented yet, simulate data so the UI doesn't break
    if (Object.keys(normalized).length === 0) {
        return {
            'cow-001': { id: 'cow-001', name: 'Bessie', health: 'Good', batteryUrl: 85, temperature: 38.6 },
            'cow-002': { id: 'cow-002', name: 'Daisy', health: 'Needs Attention', batteryUrl: 40, temperature: 39.5 },
            'cow-003': { id: 'cow-003', name: 'Bella', health: 'Critical', batteryUrl: 15, temperature: 40.2 },
            'cow-004': { id: 'cow-004', name: 'Moo-Moo', health: 'Good', batteryUrl: 0, temperature: null },
        };
    }

    return normalized;
}

export function useLivestockData() {
    return useQuery({
        queryKey: ['livestock'],
        queryFn: fetchLivestockData,
        staleTime: 60 * 1000,
    });
}
