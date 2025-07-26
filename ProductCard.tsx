"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  title: string;
  image: string;
  price: number | string;
  currency?: string;
  source?: "amazon" | "tradal" | "internal";
  link?: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  price,
  currency = "USD",
  source = "internal",
  link,
  onAddToCart,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col">
      <div className="relative w-full h-48 mb-4">
        <Image src={image} alt={title} fill className="object-contain rounded-md" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{title}</h3>
      <p className="text-blue-700 font-bold mb-1">
        {typeof price === "number" ? price.toFixed(2) : price} {currency}
      </p>

      {source !== "internal" && (
        <p className="text-xs text-gray-500 mb-2">من: {source === "amazon" ? "Amazon" : "Tradal"}</p>
      )}

      {source !== "internal" && link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
        >
          شراء الآن
        </a>
      ) : (
        <button
          onClick={onAddToCart}
          className="mt-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition text-sm"
        >
          <ShoppingCart size={16} />
          أضف إلى السلة
        </button>
      )}
    </div>
  );
};
