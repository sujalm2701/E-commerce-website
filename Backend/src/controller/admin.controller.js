import UserModel from "../model/user.model";
import ItemModel from "../model/user.model";

// products
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
export async function postAddProd(req, res) {
  const { name, description, price, discount, category, photo, stock, brand } =
    req.body;
    I
}
export async function putEditProd(req, res) {}
export async function delProd(req, res) {}

// orders
export async function getCustOrder(req, res) {}
export async function getOrderDetail(req, res) {}
export async function putEditStatus(req, res) {}

// users
export async function getUserList(req, res) {}
export async function getUserDetails(req, res) {}
export async function delUser(req, res) {}
