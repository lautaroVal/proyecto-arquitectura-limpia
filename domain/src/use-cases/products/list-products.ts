import { ProductService } from "../../services/product-service";
import { Product } from "../../entities/product";

interface ListProductsDTO {
  dependencies: { productService: ProductService };
}

export async function listProducts({ dependencies }: ListProductsDTO): Promise<Product[]> {
  const { productService } = dependencies;

  const products = await productService.findAll();

  if (!products.length) throw new Error("No products available");

  return products;
}
