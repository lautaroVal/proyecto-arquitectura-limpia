import { Product } from "../entities";

export interface IProductRepo {

  findAll(): Promise<Product[]>;

  getById(id: string): Promise<Product | null>;

  save(product: Product): Promise<void>;

  update(id: string, data: Partial<Omit<Product, "id">>): Promise<void>;

  delete(id: string): Promise<void>;
}
