import { check, validationResult } from "express-validator";
import UserModel from "../model/user.model.js";
import ItemModel from "../model/item.model.js";

// PRODUCTS
export async function getProductList(req, res) {
  const products = await ItemModel.find();
  if (!products.length) {
    return res.status(404).json({ err: "No products yet." });
  }
  return res.status(200).json({ products });
}
export async function getProdDetail(req, res) {
  const product = await ItemModel.findOne({ _id: req.params.id });
  if (!product) {
    return res.status(404).json({ err: "No Product like this is found" });
  }
  return res.status(200).json({ product });
}
// PRODUCT-SEARCH
export async function getSearchItem(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ err: "Nothing serached yet" });
  }

  const products = await ItemModel.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  });
  if (!products.length) {
    return res.status(404).json({ err: "No product with this name/ category is found." });
  }
  return res.status(200).json({ products });
}
// CARTS
export async function getCart(req, res) {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user) {
    return res.status(404).json({ err: "Please try again." });
  }
  await user.populate("cart");
  return res.status(200).json({ cartProducts: user.cart });
}
export async function postAddToCart(req, res) {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user) {
    return res.status(404).json({ err: "Please try again." });
  }
  user.cart.push(req.body.product);
  await user.save();
  return res.status(302).redirect("/api/user/cart");
}
export async function delProd(req, res) {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user) {
    return res.status(404).json({ err: "Please try again." });
  }
  user.cart = user.cart.filter((elem) => elem != req.params.productId);
  await user.save();
  return res.status(302).redirect("/api/user/cart");
}
export async function delCart(req, res) {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user) {
    return res.status(404).json({ err: "Please try again." });
  }
  user.cart = [];
  await user.save();
  return res.status(302).redirect("/api/user/cart");
}
// ORDERS
export async function getOrderList(req, res) {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user) {
    return res.status(404).json({ err: "Please try again." });
  }
  return res.status(200).json({ cartProducts: user.orders });
}
export const postCreateOrder = [
  check(["name", "phoneNo", "address", "quantity"])
    .trim()
    .notEmpty()
    .withMessage("Fields should not be empty."),
  check(["phoneNo", "quantity"])
    .custom((value) => typeof value === "number")
    .withMessage("Invalid input type"),
  check(["name", "address"])
    .isString()
    .withMessage("Invalid input type"),
  check("address")
    .isLength({ min: 5, max: 100 })
    .withMessage("address should be proper"),
  async (req, res) => {
    const userId = req.session.userId;
    const { productId, name, phoneNo, address, quantity } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    const credentials = { name, phoneNo, address };
    const user = await UserModel.findOne({ _id: userId });
    if (!user || user.role !== "user" || user.name !== name || user.phoneNo !== phoneNo) {
      return res.status(401).json({ err: "Invalid user Creadentials", credentials });
    }
    const product = await ItemModel.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ err: "Product Not Found", credentials });
    }
    if (product.stock < quantity) {
      return res.status(409).json({ err: "The product is not in enough stock" });
    }
    const order = {
      productId,
      price: product.price * quantity * (1 - product.discount / 100),
      quantity,
      status: "pending",
    };
    user.orders.push(order);
    user.orderHis.push(order);
    await user.save();
    return res.status(302).redirect("/api/user/orders");
  },
];
export async function getOrderHis(req, res) {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user) {
    return res.status(404).json({ err: "Please try again." });
  }
  return res.status(200).json({ orderHis: user.orderHis });
}
export async function getOrderDetail(req, res) {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user) {
    return res.status(404).json({ err: "Please try again." });
  }
  const orderDetail = user.orders.filter((ord) => ord._id == req.params.ordId);
  return res.status(200).json({ orderDetail });
}
export async function postCancelOrder(req, res) {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user) {
    return res.status(404).json({ err: "Invalid user or order" });
  }
  const ordId = req.body.ordId;
  user.orders = user.orders.filter((ord) => ord._id != ordId);
  const historyOrder = user.orderHis.id(ordId);
  if (historyOrder) {
    historyOrder.status = "cancelled";
  }
  await user.save();
  return res.status(302).redirect("/api/user/orders");
}
