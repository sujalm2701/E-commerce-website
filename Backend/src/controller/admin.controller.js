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
  const product = new ItemModel({
    name,
    description,
    price,
    discount,
    category,
    photo,
    stock,
    brand,
  });
  await product
    .save()
    .then(() => {
      res
        .json({ message: "Product successfully saved" })
        .redirect("/api/admin/products");
    })
    .catch(() => {
      res.json({ err: "Unable to create the product" });
    });
}
export async function putEditProd(req, res) {
  // validation is left
  const {id, ...editedProduct} = req.body;
  // const { _id,name, description, price, discount, category, photo, stock, brand } =
  //   req.body;
    const product = await ItemModel.findById(id)
    if(!product){
      return res.json({err: "Product not found"})
    }
    for (let key in product){
      if(product[key] != editedProduct[key]){
        product[key] = editedProduct[key]
      }
    }
    await product.save()
    res.json({message: "Product successfully saved."})
}
export async function delProd(req, res) {
  const id = req.params.id;
  await ItemModel.findByIdAndDelete(id)
  res.json({message: "Product successfully deleated"})
}

// orders
export async function getCustOrder(req, res) {
  const id = req.params.id;
  const user = await UserModel.findOne({ _id });
  if (user) {
    res.json({
      cartProducts: user.orders,
    });
  } else {
    res.json({ err: "Please try again." });
  }
}
export async function getOrderDetail(req, res) {
  const userId = req.params.userId;
  const ordId = req.params.ordId;
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    const orderDetail = user.orders.filter((ord) => ord._id == ordId);
    res.json({
      orderDetail,
    });
  } else {
    res.json({ err: "Please try again." });
  }
}
export async function putEditStatus(req, res) {
  //validation left
  const {userId, ordId, status} = req.body
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    const orderDetail = user.orders.filter((ord) => ord._id == ordId);
    orderDetail.status = status
    user.save()
    res.json({
      message: "Status Changed"
    });
  } else {
    res.json({ err: "Please try again." });
  }
}

// users
export async function getUserList(req, res) {
  const users = await UserModel.find();
  if(!users){
    return res.json({err : "There was some error."})
  }
  res.json({users})
}
export async function getUserDetails(req, res) {
  const id = req.params.id
  const userDetails  = await UserModel.findById(id)
  if(!userDetails){
    return res.json({err : "There was some error."})
  }
  res.json({userDetails})
}
export async function delUser(req, res) {
  const id = req.params.id;
  await UserModel.findByIdAndDelete(id)
  res.json({message: "User successfully removed"})
}
