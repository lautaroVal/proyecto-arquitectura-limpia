import { beforeEach, describe, expect, test } from "vitest";
import { updateProduct } from "./update-product";
import { IProductRepo } from "../../repositories/IProductRepo";
import { Product, ProductType } from "../../entities/product";

class InMemoryProductRepo implements IProductRepo {
    private products: Product[] = [];

    constructor(initial: Product[] = []) {
        this.products = initial;
    }

    async getById(id: string) {
        return this.products.find((p) => p.id === id) || null;
    }

    async findAll() {
        return this.products;
    }

    async save(product: Product) {
        this.products.push(product);
    }

    async update(id: string, data: Partial<Omit<Product, "id">>) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) throw new Error("Product not found");

        const updatedProduct = {
            ...this.products[index],
            ...data,
        } as Product;

        this.products[index] = updatedProduct;
    }

    async delete(id: string) {
        this.products = this.products.filter((p) => p.id !== id);
    }
}

describe("UpdateProduct", () => {
    const initialProducts: Product[] = [
        {
            id: "1",
            name: "Cheeseburger",
            price: 1500,
            available: true,
            type: ProductType.BURGER,
        },
    ];

    let repo: InMemoryProductRepo;

    beforeEach(() => {
        repo = new InMemoryProductRepo([...initialProducts]);
    });

    test("should update an existing product", async () => {
        const updated = await updateProduct(
            {
                id: "1",
                data: { price: 1800, available: false },
            },
            { dependencies: { productRepo: repo } }
        );

        expect(updated.price).toBe(1800);
        expect(updated.available).toBe(false);

        const fromRepo = await repo.getById("1");
        expect(fromRepo?.price).toBe(1800);
    });

    test("should throw an error if the product does not exist", async () => {
        await expect(
            updateProduct(
                { id: "999", data: { price: 2000 } },
                { dependencies: { productRepo: repo } }
            )
        ).rejects.toThrow("Product not found");
    });
});
