import type { Product } from "../../../../domain/dist/entities";

const API_URL = import.meta.env.VITE_API_URL || "http://backend:3000";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products/listProducts`);

    if (!response.ok) {
      throw new Error(`Error retrieving products: ${response.statusText}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error in getProducts:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/getProductById/${id}`);

    if (!response.ok) {
      throw new Error(`Error obtaining the product: ${response.statusText}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error in getProductById:", error);
    return null;
  }
}