import { prisma } from "../index.js";
import { Product, ProductService } from "../../../../domain/dist/index.js";

export class ProductServiceImplementationPrisma implements ProductService {
  async getById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product ? (product as Product) : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    return products as Product[];
  }

  async save(product: Product): Promise<void> {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        available: product.available,
        type: product.type,
      },
    });
  }

  async update(id: string, data: Partial<Omit<Product, "id">>): Promise<void> {
    await prisma.product.update({
      where: { id },
      data,
    });
  }

   async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }
}
