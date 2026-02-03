"use client";

import React, { useState } from "react";
import ProductCard from "@/components/product-card";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

// Dummy Data
const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "PETSA",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
    price: "Rp 250.000,00",
    image: null,
  },
  {
    id: 2,
    name: "Smart Feeder",
    description:
      "Automated feeding system ensuring your livestock gets the right amount of nutrition at the right time.",
    price: "Rp 1.500.000,00",
    image: null,
  },
  {
    id: 3,
    name: "Health Tracker",
    description:
      "Advanced wearable device to monitor vital signs and activity levels of your cattle 24/7.",
    price: "Rp 750.000,00",
    image: null,
  },
  {
    id: 4,
    name: "Water Quality Sensor",
    description:
      "Real-time monitoring of water quality to prevent diseases and ensure optimal hydration.",
    price: "Rp 450.000,00",
    image: null,
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const onViewDetails = (id: number) => {
    router.push(`/products/${id}`);
  };

  const router = useRouter();

  // Filter Logic
  const filteredProducts = DUMMY_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="min-h-screen w-full bg-background font-sans">
      {/* Navbar Container */}
      <Navbar />

      <div className="container mx-auto px-6 lg:px-20 pb-20">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-tblack mb-8 font-sans">
          Our Products
        </h1>

        {/* Search Bar */}
        <div className="relative w-full mb-12">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-6 pr-12 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#3A7D56]/20 focus:border-[#3A7D56] transition-all text-gray-700 placeholder:text-gray-400"
          />
          {/* Search Icon (Optional visual indicator) */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-border/90">
            <Search className="w-6 h-6" />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                onViewDetails={() => onViewDetails(product.id)}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-border/90">
            <p className="text-lg">
              No products found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
