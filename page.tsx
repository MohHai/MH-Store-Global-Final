import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function Page() {
  return (
    <main>
      <Header />
      <section className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProductCard
          title="AI Smartwatch"
          image="https://images.unsplash.com/photo-1588776814546-ec7c835c8d5b"
          price={299}
          description="A revolutionary AI-powered smartwatch with health tracking."
        />
      </section>
      <Footer />
    </main>
  );
}// Real code for page.tsx
