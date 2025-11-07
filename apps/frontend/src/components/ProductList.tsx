import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";

/* const mockProducts: Product[] = [
  {
    "id": "1",
    "name": "Sprite",
    "price": 100,
    "available": true,
    "type": "DRINK"
  },
  {
    "id": "2",
    "name": "Hamburguesa",
    "price": 200,
    "available": true,
    "type": "BURGER"
  },
  {
    "id": "3",
    "name": "Cheeseburger",
      "price": 220,
      "available": true,
      "type": "BURGER"
    }
  ] */

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      console.log("📦 Productos desde API:", data);
      setProducts(data);
    });
  }, []);

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
