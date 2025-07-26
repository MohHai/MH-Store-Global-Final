"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  currency?: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  price,
  currency = "USD",
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition p-4 flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-primary text-lg font-bold">
          {price.toFixed(2)} {currency}
        </span>
        <button
          onClick={onAddToCart}
          className="flex items-center justify-center gap-1 bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-lg text-sm transition"
        >
          <ShoppingCart size={16} />
          أضف
        </button>
      </div>
    </div>
  );
};
