import { ProductService } from "../../services/product-service";
import { ProductType } from "../../entities/product";

interface CreateProductDTO {
  dependencies: { productService: ProductService };
  payload: {
    id: string;
    name: string;
    price: number;
    available: boolean;
    type: ProductType;
    image: string;
  };
}

export async function createProduct({ dependencies, payload }: CreateProductDTO) {
  const { productService } = dependencies;

  if (!payload.name || payload.name.trim().length === 0) {
    throw new Error("The product name is mandatory");
  }

  if (payload.price <= 0) {
    throw new Error("The price should be greater than 0");
  }

  if (!payload.image) throw new Error("The product image is mandatory.");

  const existing = await productService.getById(payload.id);
  if (existing) {
    throw new Error(`There is already a product with id ${payload.id}`);
  }

  await productService.save(payload);

  return {
    id: payload.id,
    name: payload.name,
    price: payload.price,
    available: payload.available,
    type: payload.type,
    image: payload.image
  };
}
