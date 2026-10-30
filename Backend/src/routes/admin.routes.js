import { Router } from "express";
import * as adminController from "../controller/admin.controller.js";
import upload from "../config/multer.config.js"
const adminRouter = Router();
// ex- /api/admin/products

// products
adminRouter.get("/products", adminController.getProductList);
adminRouter.post(
  "/products",
  upload.array("photo", 3),
  adminController.postAddProd,
);
adminRouter.put("/products", adminController.putEditProd);
adminRouter.delete("/products/:id", adminController.delProd);

// orders
adminRouter.get("/orders", adminController.getCustOrder);
adminRouter.get("/orders/:ordId", adminController.getOrderDetail);
adminRouter.put("/orders/status", adminController.putEditStatus);

// users
adminRouter.get("/users", adminController.getUserList);
adminRouter.get("/userDetails", adminController.getUserDetails);
adminRouter.delete("/delUsers", adminController.delUser);

export default adminRouter;
