import { describe, test, expect, vi, beforeEach } from "vitest";
import { getProducts, getProductById } from "./productApi";
import { mockProducts } from "../mocks/products.mock";

describe("api.ts", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); 
  });

  describe("getProducts", () => {
    test("should return a list of products if the answer is correct", async () => {
      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response);

      const result = await getProducts();

      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/products/listProducts");
      expect(result).toEqual(mockProducts);
    });

     test("should throw an error if the response is not ok", async () => {
      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        statusText: "Internal Server Error",
      } as Response);

      await expect(getProducts()).rejects.toThrow("Error retrieving products: Internal Server Error");
    });

    test("should throw an error if fetch fails", async () => {
      vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

      await expect(getProducts()).rejects.toThrow("Network error");
    });
  });
  describe("getProductById", () => {
    test("should return a product if the answer is correct", async () => {
      const product = mockProducts[0];

      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => product,
      } as Response);

      const result = await getProductById("1");

      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/products/getProductById/1");
      expect(result).toEqual(mockProducts[0]);
    });

    test("should return null if the response is not ok", async () => {
      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      } as Response);

      const result = await getProductById("999");
      expect(result).toBeNull();
    });

    test("should return null if fetch throws an error", async () => {
      vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

      const result = await getProductById("1");
      expect(result).toBeNull();
    });
  });
});
