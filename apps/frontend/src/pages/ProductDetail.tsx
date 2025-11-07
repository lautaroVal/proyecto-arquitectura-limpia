import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/api";
import type { Product } from "../types/Product";

const API_URL = "http://localhost:3000/public";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then((data) => {
        if (!data) throw new Error("Producto no encontrado");
        setProduct(data);
      })
      .catch(() => setError("No se pudo cargar el producto."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f5f0e1] text-gray-700">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#bb4d00] mb-4"></div>
        <p className="text-lg font-semibold">Cargando producto...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f5f0e1] text-red-600">
        <p className="text-lg font-semibold">{error}</p>
        <Link
          to="/"
          className="mt-4 text-[#bb4d00] hover:underline font-semibold"
        >
          Volver al inicio
        </Link>
      </div>
    );

  if (!product)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f5f0e1] text-gray-700">
        <p className="text-lg font-semibold">Producto no encontrado</p>
        <Link
          to="/"
          className="mt-4 text-[#bb4d00] hover:underline font-semibold"
        >
          Volver al inicio
        </Link>
      </div>
    );

  return (
    <div className="bg-[#f5f0e1] min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <img
          src={`${API_URL}${product.image}`}
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold text-[#1e1e1e] mb-4">
          {product.name}
        </h1>
        <p className="text-lg text-gray-700 mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, explicabo natus harum iure iusto at omnis accusantium dolorum cupiditate accusamus expedita earum nam voluptates eos sapiente repellat repudiandae ducimus similique!
        Iusto nam autem, praesentium mollitia perferendis inventore, explicabo et veniam aperiam voluptates earum dignissimos voluptatum atque quae ipsa deserunt nihil alias aspernatur quidem quisquam molestias rem magni culpa! Fugiat, expedita!
        Repudiandae possimus iusto autem asperiores! Perferendis atque facilis quaerat non corrupti explicabo cum praesentium, reprehenderit quos quis distinctio similique voluptatibus alias eligendi delectus. Sequi, exercitationem. Rem sunt magni id molestias?</p>
        <p className="text-2xl font-semibold text-[#bb4d00] mb-6">
          ${product.price}
        </p>

        <Link
          to="/"
          className="inline-block bg-[#ffc300] text-[#1e1e1e] font-bold py-2 px-6 rounded-full hover:bg-[#bb4d00] hover:text-white transition duration-300"
        >
          Volver al menú
        </Link>
      </div>
    </div>
  );
}
