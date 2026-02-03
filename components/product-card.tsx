import React from "react";
import Image, { StaticImageData } from "next/image";

interface ProductCardProps {
  image?: StaticImageData | string | null; // Optional for now, will fallback to grey box
  name: string;
  description: string;
  price: string;
  onViewDetails?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  description,
  price,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      {/* Image Placeholder / Image */}
      <div className="w-full aspect-square bg-[#e5e5e5] rounded-2xl mb-5 overflow-hidden relative">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          // Empty state if no image is provided (Grey Box)
          <div className="w-full h-full bg-[#e5e5e5]" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-extrabold text-black mb-3 uppercase tracking-tight">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>

        {/* Price & Spacer */}
        <div className="mt-auto">
          <p className="text-lg font-bold text-black mb-4">{price}</p>

          {/* Button */}
          <button
            onClick={onViewDetails}
            className="w-full py-3 bg-[#3A7D56] text-white font-bold rounded-lg hover:bg-[#2e6344] transition-colors text-sm"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
