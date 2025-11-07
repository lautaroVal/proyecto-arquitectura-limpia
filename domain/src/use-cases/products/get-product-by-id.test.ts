import { describe, test, expect } from "vitest"
import { getProductById } from "./get-product-by-id"
import { MockedProductService } from "../../services/mocks/product-service.mocks"
import { ProductType } from "../../entities/product"

const dataProduct = [
    {
        id: "1",
        name: "Hamburguer",
        price: 200,
        available: true,
        type: ProductType.BURGER,
        image: "https://example.com/images/hamburguesa.jpg",
    },
    {
        id: "2",
        name: "Coca-cola",
        price: 50,
        available: true,
        type: ProductType.DRINK,
        image: "https://example.com/images/hamburguesa.jpg",
    }
]

describe("GetProduct", () => {
    const productService = new MockedProductService(dataProduct)

    test("should return the information for a given product ID", async () => {
        const result = await getProductById({
            dependencies: { productService },
            payload: { id: "1" }
        });
        expect(result).toStrictEqual({
            id: "1",
            name: "Hamburguer",
            price: 200,
            available: true,
            type: ProductType.BURGER,
            image: "https://example.com/images/hamburguesa.jpg",
        });
    });

    test("should return an error given an invalid id", async () => {
        await expect(
            getProductById({
                dependencies: { productService },
                payload: { id: "3" },
            })
        ).rejects.toThrow("Product with ID 3 not found");
    })
})