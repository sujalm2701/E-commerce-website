import { check, validationResult } from "express-validator";
import UserModel from "../model/user.model.js";
import ItemModel from "../model/item.model.js";


// products
export async function getProductList(req, res) {
  const products = await ItemModel.find();
  if (!ItemModel) {
    res.status(404).json({
      err: "No products yet.",
    });
  } else {
    res.status(200).json({
      products,
    });
  }
}
export const postAddProd = [
  //validation
  check([
    "name",
    "description",
    "price",
    "discount",
    "category",
    "stock",
    "brand",
  ])
    .trim()
    .notEmpty()
    .withMessage("Fields should not be empty."),
  check(["price", "discount", "stock"])
    .custom((value) => typeof value === "number")
    .withMessage("Invalid input type"),
  check(["name", "description", "category", "brand"])
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Invalid input type"),
  check(["discount", "stock"])
    .isInt({ min: 0, max: 100 })
    .withMessage("discount and stock should be between 0 to 100"),
  ,
  async (req, res) => {
    const photos = req.files;
    if(!photos || photos.isLength=== 0){
      return res.status(400).json({"err": "Product images are required"})
    }
    const photoPaths = req.files.map(file => file.filename);
    const {
      name,
      description,
      price,
      discount,
      category,
      stock,
      brand,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    const product = new ItemModel({
      name,
      description,
      price,
      discount,
      category,
      photo: photoPaths,
      stock,
      brand,
    });
    await product
      .save()
      .then(() => {
        res.status(201).json({ message: "Product successfully saved" });
      })
      .catch(() => {
        res.status(500).json({ err: "Unable to create the product" });
      });
  },
];
export const putEditProd =[ 
  // validation
  check([
    "name",
    "description",
    "price",
    "discount",
    "category",
    "stock",
    "brand",
  ])
    .trim()
    .notEmpty()
    .withMessage("Fields should not be empty."),
  check(["price", "discount", "stock"])
    .custom((value) => typeof value === "number")
    .withMessage("Invalid input type"),
  check(["name", "description", "category", "brand"])
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Invalid input type"),
  check(["discount", "stock"])
    .isInt({ min: 0, max: 100 })
    .withMessage("discount and stock should be between 0 to 100"),
  ,
  async (req, res)=> {
  const { id, ...editedProduct } = req.body;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
  // const { _id,name, description, price, discount, category, photo, stock, brand } =
  //   req.body;
  const product = await ItemModel.findById(id);
  if (!product) {
    return res.status(404).json({ err: "Product not found" });
  }
  for (let key in product) {
    if (product[key] != editedProduct[key]) {
      product[key] = editedProduct[key];
    }
  }
  await product.save();
  res.status(200).json({ message: "Product successfully saved." });
}]
export async function delProd(req, res) {
  const id = req.params.id;
  await ItemModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Product successfully deleated" });
}

// orders
export async function getCustOrder(req, res) {
  const _id = req.session.userId;
  const user = await UserModel.findOne({ _id });
  if (user) {
    res.status(200).json({
      cartProducts: user.orders,
    });
  } else {
    res.status(404).json({ err: "Please try again." });
  }
}
export async function getOrderDetail(req, res) {
  const userId = req.session.userId;
  const ordId = req.params.ordId;
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    const orderDetail = user.orders.filter((ord) => ord._id == ordId);
    res.status(200).json({
      orderDetail,
    });
  } else {
    res.status(404).json({ err: "Please try again." });
  }
}
export async function putEditStatus(req, res) {
  //validation left
  const userId = req.session.userId;
  const { ordId, status } = req.body;
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    const orderDetail = user.orders.id(ordId)
    orderDetail.status = status;
    await user.save();
    res.status(200).json({
      message: "Status Changed",
    });
  } else {
    res.status(404).json({ err: "Please try again." });
  }
}

// users
export async function getUserList(req, res) {
  const users = await UserModel.find();
  if (!users) {
    return res.status(500).json({ err: "There was some error." });
  }
  res.status(200).json({ users });
}
export async function getUserDetails(req, res) {
  const id = req.session.userId;
  const userDetails = await UserModel.findById(id);
  if (!userDetails) {
    return res.status(404).json({ err: "There was some error." });
  }
  res.status(200).json({ userDetails });
}
export async function delUser(req, res) {
  const id = req.session.userId;
  await UserModel.findByIdAndDelete(id);
  res.status(200).json({ message: "User successfully removed" });
}
