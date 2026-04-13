import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useSensorStore } from '../store/sensor-store';

interface SensorPayload {
    livestock_id: number | string;
    temperature?: number;
    battery?: number;
}

/**
 * HOOK: useRealtimeSensors
 * ------------------------------------------------------------------
 * Hook ini buat bikin koneksi DUA ARAH (WebSocket) ke backend Supabase.
 * Saat aplikasi pertama kali dirender (misal di Dashboard), hook ini akan aktif dan "mendengarkan"
 * pancaran data (broadcast) dari sensor IoT/backend.
 */
export function useRealtimeSensors() {
    useEffect(() => {
        const supabase = createClient();

        // 1. MEMBUKA CHANNEL TELEMETRY:
        // Kita menggunakan Supabase "broadcast" (bukan postgres_changes).
        // Broadcast jauh lebih ringan dan scalable untuk IoT karena datanya langsung ditembak ke client
        // tanpa harus di-insert ke dalam Database PostgreSQL terlebih dahulu (mencegah DB nge-hang kalau ada 10.000 sapi).
        const channel = supabase.channel('telemetry')
            .on(
                'broadcast',
                { event: 'sensor_update' },
                (payload) => {
                    const newData = payload.payload as SensorPayload;
                    if (!newData.livestock_id) return;

                    const id = String(newData.livestock_id);

                    // 2. MENGIRIM DATA KE STATE (DATA FULL FLOW):
                    // Begitu data JSON masuk dari webhook/sensor, kita MASUKKAN secara diam-diam
                    // langsung ke dalam useSensorStore (Zustand) tanpa menggunakan state lokal (useState).
                    // Ini menghindari React melakukan render ulang untuk komponen-komponen besar.
                    useSensorStore.getState().updateSensor(id, {
                        temperature: newData.temperature,
                        batteryUrl: newData.battery,
                    });
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Successfully connected to telemetry broadcasts.');
                }
            });

        // 3. CLEANUP:
        // Penting: Ketika user pindah halaman (unmount), putus koneksi WebSocket 
        // supaya tidak terjadi memory leak (kebocoran memori) / aplikasi jadi lemot.
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
}
