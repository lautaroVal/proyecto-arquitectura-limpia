
import type { Product } from "../../entities/product";
import type { ProductService } from "../../services/product-service";

export class MockedProductService implements ProductService {
  private products: Product[];

  constructor(products: Product[] = []) {
    this.products = products;
  }

  async getById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id);
    return product ?? null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async save(item: Product): Promise<void> {
    this.products.push(item);
  }
}