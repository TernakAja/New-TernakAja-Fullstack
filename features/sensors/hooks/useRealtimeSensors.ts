import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { LivestockDict, LivestockData } from '@/features/livestock/hooks/useLivestockData';

interface SensorPayload {
    livestock_id: number | string;
    temperature?: number;
    battery?: number; // assuming battery might be sent
}

export function useRealtimeSensors(throttleMs = 1000) {
    const queryClient = useQueryClient();
    const bufferRef = useRef<Record<string, Partial<LivestockData>>>({});
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const supabase = createClient();

        // Start interval to flush buffer conditionally
        intervalRef.current = setInterval(() => {
            const updates = bufferRef.current;

            // If no updates in buffer, do nothing
            if (Object.keys(updates).length === 0) return;

            // Batch update the TanStack Query cache
            queryClient.setQueryData<LivestockDict>(['livestock'], (oldData) => {
                if (!oldData) return oldData;

                const newData = { ...oldData };
                let hasChanges = false;

                for (const [id, partial] of Object.entries(updates)) {
                    if (newData[id]) {
                        newData[id] = { ...newData[id], ...partial };
                        hasChanges = true;
                    }
                }

                // Clear buffer after processing
                bufferRef.current = {};

                // Only return new reference if changes occurred to trigger React render
                return hasChanges ? newData : oldData;
            });

        }, throttleMs);

        // Subscribe to realtime via Supabase
        const channel = supabase.channel('public:sensor_data')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'sensor_data' },
                (payload) => {
                    const newData = payload.new as SensorPayload;
                    const id = String(newData.livestock_id);

                    // Add to buffer, don't update state directly!
                    if (!bufferRef.current[id]) {
                        bufferRef.current[id] = {};
                    }

                    if (newData.temperature !== undefined) {
                        bufferRef.current[id].temperature = newData.temperature;
                    }
                    if (newData.battery !== undefined) {
                        bufferRef.current[id].batteryUrl = newData.battery;
                    }
                }
            )
            .subscribe();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            supabase.removeChannel(channel);
        };
    }, [queryClient, throttleMs]);
}
