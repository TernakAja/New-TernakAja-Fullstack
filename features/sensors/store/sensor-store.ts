import { create } from 'zustand';

/**
 * SENSOR STORE (ZUSTAND) - STATE MANAGEMENT BUAT DATA SENSOR
 */

interface SensorReading {
    temperature?: number;
    batteryUrl?: number;
    lastUpdated?: Date;
}

interface SensorStore {
    // Dictionary ini menyimpan data realtime dengan format: { "cow-001": { temperature: 38, ... } }
    data: Record<string, SensorReading>;

    // Fungsi ini dipanggil lansung dari WebSocket listener (useRealtimeSensors)
    updateSensor: (id: string, updates: SensorReading) => void;
}

export const useSensorStore = create<SensorStore>((set) => ({
    data: {},
    updateSensor: (id, updates) =>
        set((state) => ({
            data: {
                ...state.data,
                // Kita merge data sensor lama dengan data update yang baru masuk dari WebSocket
                [id]: {
                    ...(state.data[id] || {}),
                    ...updates,
                    lastUpdated: new Date()
                },
            },
        })),
}));
