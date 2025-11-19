import { Router } from "express"
import { ProductController } from "../controllers/ProductController";


const productRoutes = Router();
const controller = new ProductController();

productRoutes.post("/createProduct", controller.createProduct);
productRoutes.get("/getProductById/:id", controller.getProductById)
productRoutes.get("/listProducts", controller.listProducts)
productRoutes.put("/updateProduct", controller.updateProduct)

export default productRoutes;
