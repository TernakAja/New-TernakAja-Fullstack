"use client";
import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from '@/lib/utils';

// Ikon Ceklis Hijau (Menyesuaikan desain asli)
const CheckIcon = () => (
    <svg className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

// Ikon Silang Abu-abu (Menyesuaikan desain asli)
const CrossIcon = () => (
    <svg className="w-4 h-4 text-gray-600 mr-3 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

// Ikon Chevron untuk FAQ
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [sliderIndex, setSliderIndex] = useState(1); // Default ke index 1 (30 sapi)
    const [openFaqIndex, setOpenFaqIndex] = useState(0); // Default ke FAQ pertama terbuka

    // Nilai diskrit untuk slider
    const sliderMarks = [10, 30, 50, 100, 200, 500, 1000];
    const selectedCows = sliderMarks[sliderIndex];

    // Helper untuk format Rupiah
    const formatRp = (num: number) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(num);

    // Menentukan tier mana yang aktif berdasarkan jumlah sapi
    const getActiveTierIndex = (cows: number) => {
        if (cows < 30) return 0; // Skala Kecil
        if (cows <= 100) return 1; // Skala Menengah
        if (cows <= 1000) return 2; // Skala Besar
        return 3; // Korporasi
    };

    const activeTierIndex = getActiveTierIndex(selectedCows);

    // Definisi tier yang diperbarui dengan fungsi kalkulasi harga dinamis
    const pricingTiers = [
        {
            title: "Skala Kecil",
            basePrice: "Rp80.000",
            period: " / bulan",
            mainLimit: "< 30 Sapi",
            subLimit: "Biaya tetap bulanan",
            calculatePrice: () => "Rp80.000",
            features: [
                { name: "Manajemen Data Ternak", included: true },
                { name: "Pencatatan Pakan Dasar", included: true },
                { name: "Riwayat Kesehatan 30 Hari", included: true },
                { name: "1 Akun Pekerja", included: true },
                { name: "Laporan Produksi Harian", included: false },
                { name: "Konsultasi Dokter Hewan", included: false }
            ]
        },
        {
            title: "Skala Menengah",
            basePrice: "Rp150.000",
            period: " / bulan",
            mainLimit: "30-100 Sapi",
            subLimit: "Biaya tetap untuk 30-100 ekor",
            calculatePrice: () => "Rp150.000",
            features: [
                { name: "Manajemen Data Ternak", included: true },
                { name: "Pencatatan Pakan Lanjut", included: true },
                { name: "Riwayat Kesehatan 90 Hari", included: true },
                { name: "5 Akun Pekerja", included: true },
                { name: "Laporan Produksi Harian", included: true },
                { name: "Konsultasi Dokter Hewan", included: false }
            ]
        },
        {
            title: "Skala Besar",
            basePrice: "Rp200.000+",
            period: " / bulan",
            mainLimit: "> 100 Sapi",
            subLimit: "Rp200rb + Rp3.000/ekor di atas 100",
            calculatePrice: (cows: number) => {
                if (cows <= 100) return "Rp200.000";
                const extraCows = cows - 100;
                const totalCost = 200000 + (extraCows * 3000);
                return formatRp(totalCost);
            },
            features: [
                { name: "Manajemen Data Ternak", included: true },
                { name: "Optimasi Pakan Cerdas", included: true },
                { name: "Riwayat Kesehatan Tanpa Batas", included: true },
                { name: "Akun Pekerja Tanpa Batas", included: true },
                { name: "Laporan & Analitik AI", included: true },
                { name: "Prioritas Dokter Hewan", included: true }
            ]
        },
        {
            title: "Korporasi",
            basePrice: "Kustom",
            period: "",
            mainLimit: "Solusi terintegrasi",
            subLimit: "Disesuaikan dengan skala bisnis",
            calculatePrice: () => "Kustom",
            features: [
                { name: "Manajemen Data Ternak", included: true },
                { name: "Integrasi Sensor IoT (Suhu/Bobot)", included: true },
                { name: "Manajemen Multi-Peternakan", included: true },
                { name: "Dashboard Khusus Investor", included: true },
                { name: "SLA Uptime 99.9%", included: true },
                { name: "Manajer Akun Dedikasi", included: true }
            ]
        }
    ];

    const faqs = [
        {
            q: "Apakah ada diskon untuk langganan tahunan?",
            a: "Ya, kami memberikan potongan harga hingga dua bulan gratis (sekitar 15%) jika Anda memilih siklus penagihan tahunan untuk paket apa pun."
        },
        {
            q: "Metode pembayaran apa saja yang diterima?",
            a: "Kami menerima pembayaran melalui transfer bank virtual account (BCA, Mandiri, BNI, BRI), kartu kredit, dan beberapa e-wallet terkemuka."
        },
        {
            q: "Apakah tersedia masa percobaan gratis (free trial)?",
            a: "Ya, kami menyediakan akses penuh selama 14 hari tanpa perlu memasukkan informasi kartu kredit atau komitmen pembayaran."
        },
        {
            q: "Siapa yang bisa dihubungi untuk paket Korporasi kustom?",
            a: "Anda dapat menekan tombol 'Hubungi Penjualan' di paket Korporasi, atau langsung mengirim email ke enterprise@ternakaja.id untuk menjadwalkan demo teknis bersama tim kami."
        },
        {
            q: "Apa yang terjadi jika jumlah sapi saya melebihi batas paket?",
            a: "Sistem tidak akan mengunci akses Anda. Tagihan bulan berikutnya akan otomatis menyesuaikan dengan biaya tambahan per ekor (untuk paket Skala Menengah dan Besar) atau kami akan menghubungi Anda untuk menyarankan upgrade tier."
        },
        {
            q: "Bagaimana cara kerja sinkronisasi timbangan IoT?",
            a: "Ternak Aja menyediakan API terbuka dan integrasi langsung dengan beberapa merek timbangan digital industri. Data bobot akan otomatis tercatat ke profil sapi berdasarkan tag RFID saat penimbangan."
        }
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center py-20 px-4 md:px-8 pt-32">

                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:20px_20px]",
                        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                    )}
                />
                {/* Radial gradient for the container to give a faded look */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

                {/* Header Section */}
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl mb-6 tracking-tight">Harga</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
                        Mulai kelola peternakan Anda dengan sistem yang dapat bertumbuh.
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-full p-1 mb-16 relative z-10">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white dark:bg-[#222] text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                    >
                        Sapi Perah (Dairy)
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${billingCycle === 'yearly' ? 'bg-white dark:bg-[#222] text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                    >
                        Sapi Potong (Beef)
                    </button>
                </div>

                {/* Functional Slider */}
                <div className="w-full max-w-4xl mb-16 relative px-4 hidden md:block z-10">
                    <div className="relative w-full flex flex-col items-center">

                        {/* Label jumlah sapi yang dipilih di atas slider */}
                        <div className="mb-6 bg-white dark:bg-[#222] px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 text-black dark:text-white shadow-lg">
                            {selectedCows === 1000 ? "1000+ Sapi" : `${selectedCows} Sapi`}
                        </div>

                        <input
                            type="range"
                            min="0"
                            max={sliderMarks.length - 1}
                            value={sliderIndex}
                            onChange={(e) => setSliderIndex(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white focus:outline-none"
                            style={{
                                background: `linear-gradient(to right, currentColor ${(sliderIndex / (sliderMarks.length - 1)) * 100}%, rgba(156, 163, 175, 0.2) ${(sliderIndex / (sliderMarks.length - 1)) * 100}%)`
                            }}
                        />

                        <div className="flex justify-between w-full mt-4 text-[12px] text-gray-500 font-medium">
                            {sliderMarks.map((mark, i) => (
                                <span
                                    key={i}
                                    className={`cursor-pointer transition-colors ${sliderIndex === i ? 'text-black dark:text-white' : 'hover:text-gray-900 dark:hover:text-gray-300'}`}
                                    onClick={() => setSliderIndex(i)}
                                >
                                    {mark === 1000 ? '1000+' : mark}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {pricingTiers.map((tier, index) => {
                        const isActive = index === activeTierIndex;
                        // Tier kustom (Korporasi) tidak diredupkan agar selalu menjadi alternatif
                        const isDimmed = !isActive && index !== 3;

                        return (
                            <div
                                key={index}
                                className={`bg-white dark:bg-black border transition-all duration-300 rounded-[24px] p-8 flex flex-col relative
                  ${isActive ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)] scale-[1.02]' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}
                  ${isDimmed ? 'opacity-50 grayscale-[50%]' : 'opacity-100'}
                `}
                            >

                                {isActive && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                        Rekomendasi
                                    </div>
                                )}

                                <h3 className={`text-center text-sm font-medium mb-6 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-black dark:text-white'}`}>
                                    {tier.title}
                                </h3>

                                <div className="flex flex-col items-center mb-6">
                                    <div className="flex items-baseline justify-center">
                                        <span className="text-4xl font-semibold tracking-tight text-black dark:text-white">
                                            {isActive ? tier.calculatePrice(selectedCows) : tier.basePrice}
                                        </span>
                                        <span className="text-lg text-gray-500 dark:text-gray-400 font-normal">{tier.period}</span>
                                    </div>
                                </div>

                                <div className="text-center mb-6">
                                    <p className="text-sm text-black dark:text-white font-medium mb-1.5">{tier.mainLimit}</p>
                                    <p className="text-[11px] text-gray-500">{tier.subLimit}</p>
                                </div>

                                <hr className="border-gray-100 dark:border-gray-800 mb-8" />

                                <ul className="flex flex-col gap-4 flex-grow">
                                    {tier.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start">
                                            {feature.included ? <CheckIcon /> : <CrossIcon />}
                                            <span className={`text-[13px] leading-relaxed ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}`}>
                                                {feature.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full mt-8 py-2.5 rounded-lg text-sm font-medium transition-colors border
                  ${isActive
                                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200'
                                        : 'bg-transparent text-black dark:text-white border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}
                `}>
                                    {index === 3 ? 'Hubungi Penjualan' : 'Pilih Paket'}
                                </button>

                            </div>
                        );
                    })}
                </div>



                {/* Feature Comparison Section */}
                <div className="w-full max-w-5xl mt-32 px-4 relative z-10">
                    <h2 className="text-3xl font-medium text-black dark:text-white mb-8 tracking-tight">Manajemen & Pencatatan</h2>

                    <div className="w-full overflow-x-auto pb-4">
                        <div className="min-w-[768px]">
                            {/* Table Header */}
                            <div className="grid grid-cols-5 gap-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-lg py-3 px-6 mb-2">
                                <div className="col-span-1"></div>
                                <div className="text-center text-[13px] font-medium text-gray-500 dark:text-gray-400">Skala Kecil</div>
                                <div className="text-center text-[13px] font-medium text-gray-500 dark:text-gray-400">Skala Menengah</div>
                                <div className="text-center text-[13px] font-medium text-gray-500 dark:text-gray-400">Skala Besar</div>
                                <div className="text-center text-[13px] font-medium text-gray-500 dark:text-gray-400">Korporasi</div>
                            </div>

                            {/* Table Rows */}
                            <div className="flex flex-col">
                                {[
                                    { name: "Batas Pencatatan Harian", values: ["100", "Tanpa batas", "Tanpa batas", "Tanpa batas"] },
                                    { name: "Impor Data Massal (CSV)", values: [true, true, true, true] },
                                    { name: "Akses RESTful API", values: [false, true, true, true] },
                                    { name: "Sinkronisasi Timbangan IoT", values: [false, false, true, true] },
                                    { name: "Riwayat Kesehatan Lengkap", values: [true, true, true, true] },
                                    { name: "Notifikasi Jadwal Vaksin", values: [true, true, true, true] },
                                    { name: "Manajemen Siklus Reproduksi", values: [true, true, true, true] },
                                    { name: "Ekspor Laporan Kustom", values: [true, true, true, true] },
                                    { name: "Pemantauan Suhu Real-time", values: [false, false, false, true] },
                                ].map((row, rowIndex) => (
                                    <div key={rowIndex} className="grid grid-cols-5 gap-4 py-4 px-6 border-b border-gray-200 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors">
                                        <div className="col-span-1 flex items-center">
                                            <span className="text-[13px] text-gray-700 dark:text-gray-300 border-b border-dotted border-gray-300 dark:border-gray-600 pb-0.5 cursor-help">
                                                {row.name}
                                            </span>
                                        </div>
                                        {row.values.map((val, valIndex) => (
                                            <div key={valIndex} className="flex justify-center items-center text-[13px] text-gray-800 dark:text-gray-300">
                                                {typeof val === 'boolean' ? (
                                                    val ? <CheckIcon /> : <span className="text-gray-400 dark:text-gray-700">-</span>
                                                ) : (
                                                    val as string
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="w-full max-w-4xl mt-32 px-4 mb-20 relative z-10">
                    <h2 className="text-3xl font-medium text-black dark:text-white mb-8 tracking-tight">Frequently Asked Questions</h2>

                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaqIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800/60 rounded-xl overflow-hidden shadow-sm dark:shadow-none"
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                                        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors focus:outline-none"
                                    >
                                        <ChevronIcon isOpen={isOpen} />
                                        <span className="text-[15px] font-medium text-black dark:text-gray-200">{faq.q}</span>
                                    </button>

                                    {isOpen && (
                                        <div className="px-6 pb-5 pt-1 pl-14">
                                            <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                                                {faq.a}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}

