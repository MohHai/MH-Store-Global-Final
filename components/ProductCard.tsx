"use client";

import React from "react";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  image: string;
  price: string;
  url: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <a href={product.url} target="_blank" rel="noopener noreferrer">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-60 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
          <p className="text-green-600 font-bold">{product.price}</p>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
