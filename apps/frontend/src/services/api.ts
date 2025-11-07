import type { Product } from "../types/Product";

const API_URL = "http://localhost:3000"; 

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products/listProducts`);

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.statusText}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error en getProducts:", error);
    return [];
  }
}

export async function getProductById(): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/getProductById`);

    if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.statusText}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error en getProductById:", error);
    return null;
  }
}
