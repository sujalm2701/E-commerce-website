import UserModel from "../model/user.model";
import ItemModel from "../model/user.model";

// PRODUCTS
export async function getProductList(req, res) {
  const products = await ItemModel.find();
  if (!ItemModel) {
    res.json({
      err: "No products yet.",
    });
  } else {
    res.json({
      products,
    });
  }
}
export async function getProdDetail(req, res) {
  const _id = req.params.id;
  const product = await ItemModel.findOne({ _id });
  if (product) {
    res.json({ product });
  } else {
    res.json({
      err: "No Product like this is found",
    });
  }
}
// CARTS
export async function getCart(req, res) {
  const _id = req.params.id;
  const user = await UserModel.findOne({ _id });
  if (user) {
    await user.populate("cart");
    res.json({
      cartProducts: user.cart,
    });
  } else {
    res.json({ err: "Please try again." });
  }
}
export async function postAddToCart(req, res) {
  const userId = req.body.user;
  const productId = req.body.product;
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    const cart = user.cart;
    cart.push(productId);
    await user.save()
    res.redirect(`/api/user/cart/${user._id}`)
    // res.json({
    //   cartProducts: cart
    // })
  } else{
    res.json({
      err: "Please try again."
    })
  }
}
export async function putChangeProdQuan(req, res) {}
export async function delProd(req, res) {}
export async function delCart(req, res) {}
// ORDERS
export async function postCreateOrder(req, res) {}
export async function getOrderHis(req, res) {}
export async function getOrderDetail(req, res) {}
