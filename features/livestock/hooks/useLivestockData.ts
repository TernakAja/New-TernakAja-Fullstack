import { useQuery } from '@tanstack/react-query';

export interface LivestockData {
    id: string; // or number depending on backend 
    name: string;
    health: 'Good' | 'Needs Attention' | 'Critical';
}

export type LivestockDict = Record<string, LivestockData>;

/**
 * 💾 HOOK: fetchLivestockData (API Core Fetcher)
 * ------------------------------------------------------------------
 * Mengambil data "STABLE" (data yang jarang berubah) dari database.
 * Contoh data stable: Nama Sapi, ID Tag Sapi, Status Kesehatan Fundamental.
 */
async function fetchLivestockData(): Promise<LivestockDict> {
    const res = await fetch('/api/livestock');
    
    // We remove the hardcoded fallback block to let the application organically handle missing API responses
    // or return a natural empty state rather than obfuscated mocked arrays.
    if (!res.ok) {
        throw new Error('Failed to fetch livestock data');
    }

    const json = await res.json();
    const rawData = json.data || [];

    // Normalize array to object dictionary mapped by ID for O(1) lookups
    const normalized: LivestockDict = {};
    rawData.forEach((item: any) => {
        // PERHATIAN TIM: 
        // Kita SENGAJA mengeluarkan (strip) data temperatur & baterai dari dict ini.
        // Kenapa? Karena React Query cache ini ("livestock") hanya diperbarui setiap 5 menit.
        // Data sensor live (yang berubah tiap detik) diatur terpisah oleh Zustand (sensor-store.ts).
        normalized[item.id] = {
            id: String(item.id),
            name: item.name || `Cow-${item.id}`,
            health: item.health || 'Good', 
        };
    });

    return normalized;
}

/**
 * 🔄 HOOK: useLivestockData (React Query Wrapper)
 * ------------------------------------------------------------------
 * Kenapa pakai React Query?
 * 1. Caching: Jika user pindah halaman bolak-balik, tidak perlu fetch ulang API.
 * 2. Background Re-fetching: Data akan diperbarui otomatis di belakang layar.
 * 3. Separation of Concern: Memisahkan "Server State" (React Query) dengan "UI State" (Zustand).
 */
export function useLivestockData() {
    return useQuery({
        queryKey: ['livestock'],
        queryFn: fetchLivestockData,
        staleTime: 5 * 60 * 1000, // Cache data inti selama 5 menit agar aplikasi terasa instan.
    });
}
