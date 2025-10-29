import { IProductRepo } from "../../repositories/IProductRepo";
import { Product } from "../../entities/product";

interface UpdateProductDTO {
    id: string;
    data: Partial<Omit<Product, "id">>;
}

interface Dependencies {
    productRepo: IProductRepo;
}

export async function updateProduct(
    { id, data }: UpdateProductDTO,
    { dependencies }: { dependencies: Dependencies }
): Promise<Product> {
    const { productRepo } = dependencies;

    const existing = await productRepo.getById(id);
    if (!existing) {
        throw new Error("Product not found");
    }

    const updated: Product = {
        ...existing,
        ...data,
    };

    await productRepo.update(id, data);

    return updated;
}
