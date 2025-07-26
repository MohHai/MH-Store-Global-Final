import React, { useState } from 'react';
import Head from 'next/head';
import ProductCard from '@/components/ProductCard';
import AIChat from '@/components/AIChat';
import { searchAllProducts } from '@/lib/api/products';

const Home = () => {
  const [query, setQuery] = useState('');
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
    } catch (err) {
      setError('حدث خطأ أثناء جلب المنتجات. حاول مرة أخرى.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>M.H Store Global - التسوق الذكي</title>
        <meta name="description" content="ابحث واقتنِ من Amazon، AliExpress، Tradal بكل سهولة." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 py-8">
        <header className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">M.H Store Global</h1>
          <p className="text-lg text-gray-600">
            ابحث واقتنِ من Amazon، AliExpress، Tradal بكل سهولة وسرعة
          </p>
        </header>

        <section className="max-w-xl mx-auto flex gap-3 mb-10">
          <input
            type="text"
            placeholder="ابحث عن منتجات..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            aria-label="Search products"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? 'جار البحث...' : 'بحث'}
          </button>
        </section>

        {error && (
          <p className="max-w-xl mx-auto text-center text-red-600 mb-6">{error}</p>
        )}

        <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 && !loading ? (
            <p className="col-span-full text-center text-gray-500">
              لم يتم العثور على منتجات. جرب البحث عن شيء آخر.
            </p>
          ) : (
            products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))
          )}
        </section>

        <section className="max-w-xl mx-auto mt-16">
          <AIChat />
        </section>
      </main>
    </>
  );
};

export default Home;
