import { describe, test, expect } from "vitest";
import { createProduct } from "./create-product";
import { ProductType } from "../../entities/product";
import { MockedProductService } from "../../services/mocks/product-service.mocks";

const initialProducts = [
  { id: "1", name: "Hamburguer", price: 200, available: true, type: ProductType.BURGER, image: "https://example.com/images/hamburguesa.jpg"},
];

describe("CreateProduct", () => {
  const productService = new MockedProductService(initialProducts);

  test("should create a product correctly", async () => {
    const result = await createProduct({
      dependencies: { productService },
      payload: {
        id: "2",
        name: "Coca-cola",
        price: 50,
        available: true,
        type: ProductType.DRINK,
        image: "https://example.com/images/hamburguesa.jpg",
      },
    });

    expect(result).toStrictEqual({
      id: "2",
      name: "Coca-cola",
      price: 50,
      available: true,
      type: ProductType.DRINK,
      image: "https://example.com/images/hamburguesa.jpg",

    });
  });

  test("should throw an error if the product already exists", async () => {
    await expect(
      createProduct({
        dependencies: { productService },
        payload: {
          id: "1",
          name: "Double Hamburger",
          price: 300,
          available: true,
          type: ProductType.BURGER,
          image: "https://example.com/images/hamburguesa.jpg",
        },
      })
    ).rejects.toThrow("There is already a product with id 1");
  });

  test("should throw an error if the price is invalid", async () => {
    await expect(
      createProduct({
        dependencies: { productService },
        payload: {
          id: "3",
          name: "Water",
          price: 0,
          available: true,
          type: ProductType.DRINK,
          image: "https://example.com/images/hamburguesa.jpg",
        },
      })
    ).rejects.toThrow("The price should be greater than 0");
  });
});
