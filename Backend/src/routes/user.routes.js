import { Router } from "express";
import * as userController from "../controller/user.controller";

// ex:- /api/user/products
const userRouter = Router();
// products
userRouter.get("/products", userController.getProductList);
userRouter.get("/products/:id", userController.getProdDetail);
// product-search
userRouter.get("/product/search", userController.getSearchItem);

// cart
userRouter.get("/cart/:id", userController.getCart);//id--person's _id
userRouter.post("/cart", userController.postAddToCart);
userRouter.delete("/cart/:productId", userController.delProd);
userRouter.delete("/cart", userController.delCart);
// orders
userRouter.post("/orders", userController.postCreateOrder);
userRouter.get("/orders/:id", userController.getOrderHis);//id--userId
userRouter.get("/orders/:userId/:ordId", userController.getOrderDetail);
userRouter.post("/order/cancel", userController.postCancelOrder);


export default userRouter;
