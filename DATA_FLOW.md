# TernakAja: Data Flow & State Management Architecture

Dokumen ini menjelaskan restrukturisasi arsitektur *State Management* terbaru yang digunakan dalam aplikasi TernakAja. Tujuannya adalah memastikan aplikasi tetap berjalan di 60fps tanpa DOM-Lag meskipun menerima ribuan update data IoT per detik.

---

## 🏗️ 3 Pilar State Management

Aplikasi ini tidak menggunakan satu sistem *State Management* (seperti global Redux atau React Context) untuk semua hal. Alih-alih, kita memecahnya menjadi 3 pilar utama berdasarkan "seberapa sering data itu berubah":

### 1. Server State (React Query / TanStack Query)
*   **Digunakan untuk:** Data asli dari database yang jarang berubah (ID Sapi, Nama, Spesies, Status Dasar).
*   **Lokasi File:** `/features/livestock/hooks/useLivestockData.ts`
*   **Kenapa?** React Query menangani *caching* dan deduplikasi. Jika data di-fetch, data akan disimpan di cache selama beberapa menit. Kita **TIDAK** menyimpan data realtime (suhu/detak jantung yang berubah per detik) di dalam React Query karena akan menyebabkan *javascript memory garbage collection* yang berat.

### 2. Ephemeral State (Zustand Sensor Store)
*   **Digunakan untuk:** Data Live IoT / Telemetry (Suhu saat ini, status baterai sensor).
*   **Lokasi File:** `/features/sensors/store/sensor-store.ts`
*   **Kenapa?** Ephemeral data berubah sangat cepat (bisa < 1 detik). Zustand mengizinkan komponen untuk **berlangganan (subscribe) langsung** ke bagian kecil dari memori tanpa menggunakan React Context. Jika sapi A suhunya berubah, komponen tabel utama **tidak re-render**, yang re-render hanyalah angka suhu milik Sapi A.

### 3. UI Layout State (Zustand Dashboard Store)
*   **Digunakan untuk:** Status Antarmuka Web (Apakah sidebar terbuka? Apa kata kunci di *search box*? Modal edit mana yang sedang terbuka?).
*   **Lokasi File:** `/features/dashboard/store/dashboard-store.ts`
*   **Kenapa?** Menghindari *prop-drilling* (melempar parameter dari komponen kakek ke cucu). Tombol di "Header" bisa langsung memicu sidebar terbuka tanpa harus merender ulang seluruh komponen *layout*.

---

## ⚡ Alur Data Realtime (IoT WebSocket Flow)

Berikut adalah bagaimana data berjalan dari kandang ke layar user:

1.  **Koneksi:** Komponen di client akan memanggil hook `useRealtimeSensors()`. Hook ini membuka koneksi ke Supabase via **Broadcast Channel** (bukan `postgres_changes`).
2.  **Terima Data:** Saat sinyal suhu masuk melalui WebSockets, fungsi callback di `useRealtimeSensors.ts` memotong siklus React State.
3.  **Update Memori Diam-diam:** Alih-alih memanggil `setState()` yang memicu render massal, kita langsung menginjeksi data ke dalam Zustand (Sensor Store) secara atomik: `useSensorStore.getState().updateSensor(id, data);`
4.  **Isolated Re-rendering (Pola Kunci Skalabilitas):** 
    Di dalam `livestock-table.tsx`, kita tidak memetakan komponen tabel berdasarkan data global yang live. Kita membuat komponen kecil:
    ```tsx
    function TempCell({ cowId }) {
        // Komponen HANYA render ulang jika suhu SAPI INI yang berubah
        const sensor = useSensorStore(state => state.data[cowId])
        return <span>{sensor.temperature}</span>
    }
    ```
    Tabel utama yang memuat ratusan row akan diam. Satu sel (Cell) suhu akan berkedip dan meng-update angkanya secara mandiri.

---

## 🗑️ Apa yang Dihapus / Ditinggalkan?

-   **Redudansi Mock Array:** Fetcher React Query versi lama memiliki array *dummy fallback* yang rumit. Ini dihapus agar flow API lebih bersih.
-   **Tipe Data Menyatukan Suhu:** Awalnya objek `LivestockData` (sapi) menempelkan value `temperature` secara bawaan. Ini sudah diceraikan (decoupled) karena data tabel stabil dan data iot ephemeral harus terpisah lifecycle rendernya. 
-   **Client-Side Web Workers:** Kode *Worker* yang berat dihapus dengan asumsi proses pemotongan (downsampling) beban query sebaiknya dikerjakan oleh Server Database (TimescaleDB), bukan browser *end-user* (misal handphone petugas di lapangan).
