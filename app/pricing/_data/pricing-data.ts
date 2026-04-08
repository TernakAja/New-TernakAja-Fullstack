/**
 * pricing-data.ts — Shared static data module for the pricing page.
 *
 * Extracted so RSC parent and Client Component islands can import the same
 * constants without coupling or prop-drilling large data structures.
 */

// Reuse a single formatter instance — Intl.NumberFormat construction is expensive
const rpFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})
export const formatRp = (num: number) => rpFormatter.format(num)

export const SLIDER_MARKS = [10, 30, 50, 100, 200, 500, 1000] as const
export type SliderMark = typeof SLIDER_MARKS[number]

export const PRICING_TIERS = [
    {
        title: "Skala Kecil",
        basePrice: "Rp80.000",
        period: " / bulan",
        mainLimit: "< 30 Sapi",
        subLimit: "Biaya tetap bulanan",
        calculatePrice: (_cows: number) => "Rp80.000",
        features: [
            { name: "Manajemen Data Ternak", included: true },
            { name: "Pencatatan Pakan Dasar", included: true },
            { name: "Riwayat Kesehatan 30 Hari", included: true },
            { name: "1 Akun Pekerja", included: true },
            { name: "Laporan Produksi Harian", included: false },
            { name: "Konsultasi Dokter Hewan", included: false },
        ],
    },
    {
        title: "Skala Menengah",
        basePrice: "Rp150.000",
        period: " / bulan",
        mainLimit: "30-100 Sapi",
        subLimit: "Biaya tetap untuk 30-100 ekor",
        calculatePrice: (_cows: number) => "Rp150.000",
        features: [
            { name: "Manajemen Data Ternak", included: true },
            { name: "Pencatatan Pakan Lanjut", included: true },
            { name: "Riwayat Kesehatan 90 Hari", included: true },
            { name: "5 Akun Pekerja", included: true },
            { name: "Laporan Produksi Harian", included: true },
            { name: "Konsultasi Dokter Hewan", included: false },
        ],
    },
    {
        title: "Skala Besar",
        basePrice: "Rp200.000+",
        period: " / bulan",
        mainLimit: "> 100 Sapi",
        subLimit: "Rp200rb + Rp3.000/ekor di atas 100",
        calculatePrice: (cows: number) => {
            if (cows <= 100) return "Rp200.000"
            return formatRp(200000 + (cows - 100) * 3000)
        },
        features: [
            { name: "Manajemen Data Ternak", included: true },
            { name: "Optimasi Pakan Cerdas", included: true },
            { name: "Riwayat Kesehatan Tanpa Batas", included: true },
            { name: "Akun Pekerja Tanpa Batas", included: true },
            { name: "Laporan & Analitik AI", included: true },
            { name: "Prioritas Dokter Hewan", included: true },
        ],
    },
    {
        title: "Korporasi",
        basePrice: "Kustom",
        period: "",
        mainLimit: "Solusi terintegrasi",
        subLimit: "Disesuaikan dengan skala bisnis",
        calculatePrice: (_cows: number) => "Kustom",
        features: [
            { name: "Manajemen Data Ternak", included: true },
            { name: "Integrasi Sensor IoT (Suhu/Bobot)", included: true },
            { name: "Manajemen Multi-Peternakan", included: true },
            { name: "Dashboard Khusus Investor", included: true },
            { name: "SLA Uptime 99.9%", included: true },
            { name: "Manajer Akun Dedikasi", included: true },
        ],
    },
] as const

export const FAQS = [
    {
        q: "Apakah ada diskon untuk langganan tahunan?",
        a: "Ya, kami memberikan potongan harga hingga dua bulan gratis (sekitar 15%) jika Anda memilih siklus penagihan tahunan untuk paket apa pun.",
    },
    {
        q: "Metode pembayaran apa saja yang diterima?",
        a: "Kami menerima pembayaran melalui transfer bank virtual account (BCA, Mandiri, BNI, BRI), kartu kredit, dan beberapa e-wallet terkemuka.",
    },
    {
        q: "Apakah tersedia masa percobaan gratis (free trial)?",
        a: "Ya, kami menyediakan akses penuh selama 14 hari tanpa perlu memasukkan informasi kartu kredit atau komitmen pembayaran.",
    },
    {
        q: "Siapa yang bisa dihubungi untuk paket Korporasi kustom?",
        a: "Anda dapat menekan tombol 'Hubungi Penjualan' di paket Korporasi, atau langsung mengirim email ke enterprise@ternakaja.id untuk menjadwalkan demo teknis bersama tim kami.",
    },
    {
        q: "Apa yang terjadi jika jumlah sapi saya melebihi batas paket?",
        a: "Sistem tidak akan mengunci akses Anda. Tagihan bulan berikutnya akan otomatis menyesuaikan dengan biaya tambahan per ekor (untuk paket Skala Menengah dan Besar) atau kami akan menghubungi Anda untuk menyarankan upgrade tier.",
    },
    {
        q: "Bagaimana cara kerja sinkronisasi timbangan IoT?",
        a: "Ternak Aja menyediakan API terbuka dan integrasi langsung dengan beberapa merek timbangan digital industri. Data bobot akan otomatis tercatat ke profil sapi berdasarkan tag RFID saat penimbangan.",
    },
] as const

export const COMPARISON_ROWS = [
    { name: "Batas Pencatatan Harian", values: ["100", "Tanpa batas", "Tanpa batas", "Tanpa batas"] },
    { name: "Impor Data Massal (CSV)", values: [true, true, true, true] },
    { name: "Akses RESTful API", values: [false, true, true, true] },
    { name: "Sinkronisasi Timbangan IoT", values: [false, false, true, true] },
    { name: "Riwayat Kesehatan Lengkap", values: [true, true, true, true] },
    { name: "Notifikasi Jadwal Vaksin", values: [true, true, true, true] },
    { name: "Manajemen Siklus Reproduksi", values: [true, true, true, true] },
    { name: "Ekspor Laporan Kustom", values: [true, true, true, true] },
    { name: "Pemantauan Suhu Real-time", values: [false, false, false, true] },
] as const

/** Pure helper — derive the active tier index from cow count */
export function getActiveTierIndex(cows: number): number {
    if (cows < 30) return 0
    if (cows <= 100) return 1
    if (cows <= 1000) return 2
    return 3
}
