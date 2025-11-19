import { Link } from "react-router-dom";
import type { Product } from "../../../../domain/dist/entities";

interface ProductCardProps {
  product: Product;
}
const API_URL = "http://localhost:8080/public";

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-[#f5f0e1] rounded-2xl shadow-lg p-5 hover:shadow-2xl transition duration-300">
      <img
        src={`${API_URL}${product.image}` || "https://via.placeholder.com/200"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-xl font-bold text-[#1e1e1e]">{product.name}</h3>
      <p className="text-[#bb4d00] font-semibold mt-2">${product.price}</p>
      <Link
        to={`/products/${product.id}`}
        className="inline-block mt-4 bg-[#ffc300] text-[#1e1e1e] font-bold py-2 px-4 rounded-full hover:bg-[#bb4d00] hover:text-white transition duration-300"
      >
        Ver Detalle
      </Link>
    </div>
  );
}
