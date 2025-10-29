import { ProductService } from "../../services/product-service"

interface GetProductDTO {
    dependencies: { productService: ProductService };
    payload: { id: string };
}

export async function getProductById({
    dependencies,
    payload,
}: GetProductDTO) {
    const { productService } = dependencies;

    const product = await productService.getById(payload.id);

    if (!product) throw new Error(`Product with ID ${payload.id} not found`);

    return {
        id: product.id,
        name: product.name,
        price: product.price,
        available: product.available,
        type: product.type
    };
}