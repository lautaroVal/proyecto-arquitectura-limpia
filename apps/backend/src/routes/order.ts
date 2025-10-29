import { Router } from "express"
import { OrderController } from "src/controllers/OrderController";


const orderRoutes = Router();
const controller = new OrderController();

orderRoutes.post("/createOrder", controller.CreateOrder);
orderRoutes.get("/getOrderById", controller.GetOrderById)
orderRoutes.get("/listOrders", controller.ListOrdersByUser)
orderRoutes.put("/changeOrderStatus", controller.ChangeOrderStatus)

export default orderRoutes;
