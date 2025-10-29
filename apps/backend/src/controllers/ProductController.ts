import { Request, Response } from "express";
import { ProductServiceImplementationPrisma } from "../services/product-service-implementation-prisma.js"
import { createProduct } from "../../../../domain/dist/use-cases/products/create-product.js";
import { getProductById } from "../../../../domain/dist/use-cases/products/get-product-by-id.js";
import { listProducts } from "../../../../domain/dist/use-cases/products/list-products.js";
import { updateProduct } from "../../../../domain/dist/use-cases/products/update-product.js";

export class ProductController {
    private service = new ProductServiceImplementationPrisma();

    createProduct = async (req: Request, res: Response) => {
        try {
            const product = await createProduct({
                dependencies: { productService: this.service },
                payload: req.body
            });
            return res.status(201).json(product);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };

    getProductById = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;
            const product = await getProductById({
                dependencies: { productService: this.service },
                payload: { id }
            });
            if (!product) return res.status(404).json({ message: "Product not found" });
            return res.status(200).json(product);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };

    listProducts = async (_req: Request, res: Response) => {
        try {
            const products = await listProducts({
                dependencies: { productService: this.service },
            });
            return res.status(200).json(products);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };

    updateProduct = async (req: Request, res: Response) => {
        try {
            const { id, data } = req.body;
            const updatedProduct = await updateProduct(
                { id, data },
                { dependencies: { productRepo: this.service } }
            );
            if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
            return res.status(200).json(updatedProduct);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };
}
