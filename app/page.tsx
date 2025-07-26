"use client";
import React, { useState } from "react";
import { searchAllProducts } from "@/lib/api/products";
import ProductCard from "@/components/ProductCard";
import AIChat from "@/components/AIChat";

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const results = await searchAllProducts(query);
      setProducts(results);
    } catch (e) {
      setError("حدث خطأ أثناء جلب المنتجات. حاول مرة أخرى.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          M.H Store Global
        </h1>
        <p className="text-gray-600 text-lg">
          ابحث في Amazon، AliExpress، Tradal بكل سهولة وسرعة
        </p>
      </header>

      {/* Search Input */}
      <div className="flex max-w-xl mx-auto mb-8 gap-3">
        <input
          type="text"
          placeholder="ابحث عن المنتجات هنا..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          aria-label="Search products"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "جار البحث..." : "بحث"}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="max-w-xl mx-auto mb-6 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.length === 0 && !loading && (
          <p className="col-span-full text-center text-gray-500">
            لم يتم العثور على منتجات. جرب البحث عن شيء آخر.
          </p>
        )}
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>

      {/* AI Chat Assistant */}
      <section className="max-w-xl mx-auto mt-16">
        <AIChat />
      </section>
    </div>
  );
}
