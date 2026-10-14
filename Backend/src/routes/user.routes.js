import { Router } from "express";
import * as userController from "../controller/user.controller";

// ex:- /api/user/products
const userRouter = Router();
// products
userRouter.get("/products", userController.getProductList);
userRouter.get("/products/:id", userController.getProdDetail);//product id
// product-search
userRouter.get("/product/search", userController.getSearchItem);

// cart
userRouter.get("/cart", userController.getCart);
userRouter.post("/cart", userController.postAddToCart);
userRouter.delete("/cart/:productId", userController.delProd);
userRouter.delete("/cart", userController.delCart);
// orders
userRouter.get("/orders", userController.getOrderList);
userRouter.post("/orders", userController.postCreateOrder);
userRouter.get("/orderHis", userController.getOrderHis);//id--userId
userRouter.get("/orders/:ordId", userController.getOrderDetail);
userRouter.post("/order/cancel", userController.postCancelOrder);


export default userRouter;
