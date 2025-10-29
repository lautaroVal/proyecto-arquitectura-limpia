import { describe, test, expect } from "vitest";
import { listProducts } from "./list-products";
import { MockedProductService } from "../../services/mocks/product-service.mocks";
import { ProductType } from "../../entities/product";

const mockProducts = [
    {
        id: "1",
        name: "Hamburguer",
        price: 200,
        available: true,
        type: ProductType.BURGER,
    },
    {
        id: "2",
        name: "Coca-cola",
        price: 50,
        available: true,
        type: ProductType.DRINK,
    },
];

describe("ListProducts", () => {
    test("should return all available products", async () => {
        const productService = new MockedProductService(mockProducts);

        const result = await listProducts({ dependencies: { productService } });

        expect(result).toHaveLength(2);
        const firstProduct = result[0]!;
        expect(firstProduct.name).toBe("Hamburguer");
    });

    test("should return an error if there are no products", async () => {
        const productService = new MockedProductService([]);

        await expect(
            listProducts({ dependencies: { productService } })
        ).rejects.toThrow("No products available");
    });

    test("should return products with the expected properties", async () => {
        const productService = new MockedProductService(mockProducts);

        const result = await listProducts({ dependencies: { productService } });

        result.forEach((p) => {
            expect(p).toHaveProperty("id");
            expect(p).toHaveProperty("name");
            expect(p).toHaveProperty("price");
            expect(p).toHaveProperty("available");
            expect(p).toHaveProperty("type");
        });
    });
});
