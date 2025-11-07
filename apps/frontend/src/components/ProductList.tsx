import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => setError("Error al cargar los productos."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f5f0e1] text-gray-700">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#bb4d00] mb-4"></div>
        <p className="text-lg font-semibold">Cargando productos...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f5f0e1] text-red-600">
        <p className="text-lg font-semibold">{error}</p>
        <p className="text-sm mt-2">Por favor, verificá tu conexión.</p>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f5f0e1] text-gray-700">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No hay productos"
          className="w-24 h-24 mb-4 opacity-80"
        />
        <p className="text-lg font-semibold">
          No hay productos disponibles por el momento 🍔
        </p>
      </div>
    );

  const burgers = products.filter((p) => p.type === "BURGER");
  const drinks = products.filter((p) => p.type === "DRINK");
  const sides = products.filter((p) => p.type === "ACOMPANIMENT");

  const renderSection = (title: string, items: Product[]) => (
    <section id="products" className="py-24">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#bb4d00]">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-12">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="bg-[#f5f0e1] min-h-screen">
      {renderSection("Hamburguesas", burgers)}
      {renderSection("Bebidas", drinks)}
      {renderSection("Acompañamientos", sides)}
    </div>
  );
}
