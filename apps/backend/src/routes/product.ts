import { Router } from "express"
import { ProductController } from "src/controllers/ProductController";


const productRoutes = Router();
const controller = new ProductController();

productRoutes.post("/createProduct", controller.createProduct);
productRoutes.get("/getProductById", controller.getProductById)
productRoutes.get("/listProducts", controller.listProducts)
productRoutes.put("/updateProduct", controller.updateProduct)

export default productRoutes;
