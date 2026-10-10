import { Router } from "express";
import * as adminController from "../controller/admin.controller"

const adminRouter = Router()
// ex- /api/admin/products

// products
userRouter.get("/products", adminController.getProductList )
userRouter.post("/products", adminController.postAddProd )
userRouter.put("/products", adminController.putEditProd )
userRouter.delete("/products/:id", adminController.delProd )

// orders
userRouter.get("/orders", adminController.getCustOrder )
userRouter.get("/orders/:userId/:ordId", adminController.getOrderDetail )
userRouter.put("/orders/:id/status", adminController.putEditStatus )

// users
userRouter.get("/users", adminController.getUserList )
userRouter.get("/users/:id", adminController.getUserDetails )
userRouter.delete("/users/:id", adminController.delUser )


export default adminRouter;