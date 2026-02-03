"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ProductImageGalleryProps {
  images: (string | StaticImageData | null)[];
}

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  // State to track which image is currently selected
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="w-full aspect-square bg-gray-200 rounded-2xl overflow-hidden relative border border-gray-100">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Product Main"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`w-full aspect-square bg-gray-200 rounded-xl overflow-hidden relative border-2 transition-all ${
              selectedImage === img
                ? "border-[#3A7D56]"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            {img && (
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
