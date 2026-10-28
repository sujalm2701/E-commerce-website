import { Router } from "express";
import * as adminController from "../controller/admin.controller.js"

const adminRouter = Router()
// ex- /api/admin/products

// products
userRouter.get("/products", adminController.getProductList )
userRouter.post("/products", adminController.postAddProd )
userRouter.put("/products", adminController.putEditProd )
userRouter.delete("/products/:id", adminController.delProd )

// orders
userRouter.get("/orders", adminController.getCustOrder )
userRouter.get("/orders/:ordId", adminController.getOrderDetail )
userRouter.put("/orders/status", adminController.putEditStatus )

// users
userRouter.get("/users", adminController.getUserList )
userRouter.get("/userDetails", adminController.getUserDetails )
userRouter.delete("/delUsers", adminController.delUser )


export default adminRouter;