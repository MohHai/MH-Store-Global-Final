interface ProductProps {
  title: string;
  image: string;
  price: number;
  description: string;
}

export default function ProductCard({ title, image, price, description }: ProductProps) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="mt-2 font-bold text-green-600">${price}</p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded">Buy Now</button>
      </div>
    </div>
  );
}
