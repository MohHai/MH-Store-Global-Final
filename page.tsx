'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAmazonProducts } from '@/lib/amazon';
import { getTradalProducts } from '@/lib/tradal';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const amazon = await getAmazonProducts('electronics');
        const tradal = await getTradalProducts('gadgets');
        setProducts([...amazon, ...tradal]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <main className="flex-1 px-6 md:px-12 py-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 text-blue-800">
          مرحبًا بك في M.H Store Global 🌍
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">جاري تحميل المنتجات...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product: any, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
        }
