// Dedicated Web Worker for Data Processing 
// Run intensive sorting, array mapping, or analytics off the main UI thread

self.onmessage = (event: MessageEvent) => {
    const { type, payload } = event.data;

    switch (type) {
        case 'CALCULATE_ANOMALIES': {
            // Simulate heavy processing loop on 50k sensor points
            const anomalies = payload.data.filter((item: any) => item.temperature > 40.0 || item.temperature < 35.0);
            self.postMessage({ type: 'ANOMALIES_RESULT', data: anomalies });
            break;
        }

        case 'PROCESS_CHART_DOWN_SAMPLING': {
            // Takes high frequency data (e.g. 1 point per second for a month)
            // and downsamples it via LTTB (Largest Triangle Three Buckets) or naive averages
            // so Chart.js doesn't crash trying to render 100,000 points.

            const { rawData, targetPoints } = payload;

            // Naive implementation for template
            const step = Math.ceil(rawData.length / targetPoints);
            const downsampled = [];

            for (let i = 0; i < rawData.length; i += step) {
                downsampled.push(rawData[i]);
            }

            self.postMessage({ type: 'CHART_DATA_READY', data: downsampled });
            break;
        }

        default:
            console.warn('Unknown message type received in telemetry worker');
    }
};

export { };
