import { Router } from "express";
import * as userController from "../controller/user.controller";

// ex:- /api/user/products
const userRouter = Router();
// products
userRouter.get("/products", userController.getProductList);
userRouter.get("/products/:id", userController.getProdDetail);
// cart
userRouter.get("/cart/:id", userController.getCart);//id--person's _id
userRouter.post("/cart", userController.postAddToCart);
userRouter.put("/cart/:productId", userController.putChangeProdQuan);
userRouter.delete("/cart/:productId", userController.delProd);
userRouter.delete("/cart", userController.delCart);
// orders
userRouter.post("/orders", userController.postCreateOrder);
userRouter.get("/orders", userController.getOrderHis);
userRouter.get("/orders/:id", userController.getOrderDetail);

export default userRouter;
