import { Product } from "../entities"

export interface ProductService {
    getById: (id: string) => Promise<Product | null>;
    save: (product: Product) => Promise<void>;
    findAll: () => Promise<Product[]>;
}