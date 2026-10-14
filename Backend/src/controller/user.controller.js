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
// PRODUCT-SEARCH
export async function getSearchItem(req, res) {
  //Instead this we would add SEARCH OPTION here
  const {q} = req.query;
  if(!q){
    return res.json({err: "Nothing serached yet"})
  }

  const products = await ItemModel.find({
    $or: [//or--to give result if any of these matches
      {name: {$regex: q, $options: "i"}},//regex--it mean what should be found //option: "i"--means it is not casesensitive
      {category: {$regex: q, $options: "i"}},
      {description: {$regex: q, $options: "i"}},
    ]
  })
  if(!product){
    return res.json({err: "No product with this name/ category is found."})
  }
  res.json({
    products
  })
}
// CARTS
export async function getCart(req, res) {
  const _id = req.session.userId;
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
  const userId = req.session.userId;
  const productId = req.body.product;//from body
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    const cart = user.cart;
    cart.push(productId);
    await user.save();
    res.redirect("/api/user/cart");
    // res.json({
    //   cartProducts: cart
    // })
  } else {
    res.json({
      err: "Please try again.",
    });
  }
}
export async function delProd(req, res) {
  const userId = req.session.userId;
  const productId = req.params.productId;
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    let cart = user.cart;
    cart = cart.filter((elem) => elem != productId);
    await user.save();
    res.redirect("/api/user/cart");
    // res.json({
    //   cartProducts: cart
    // })
  } else {
    res.json({
      err: "Please try again.",
    });
  }
}
export async function delCart(req, res) {
  const userId = req.session.userId;
  const productId = req.body.product;
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    user.cart = [];
    await user.save();
    res.redirect("/api/user/cart");
    // res.json({
    //   cartProducts: cart
    // })
  } else {
    res.json({
      err: "Please try again.",
    });
  }
}
// ORDERS
export async function getOrderList(req, res) {
  const _id = req.session.userId;
  const user = await UserModel.findOne({ _id });
  if (user) {
    res.json({
      cartProducts: user.orders,
    });
  } else {
    res.json({ err: "Please try again." });
  }
}
export const postCreateOrder=[
  check([
      "name", "phoneNo", "address", "quantity"
    ])
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
    , async (req, res)=> {
  // validation
  const userId = req.session.userId;
  const { productId, name, phoneNo, address, quantity } = req.body;
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ errors });
      }
  const credentials = {
    name,
    phoneNo,
    address,
  };
  const user = await UserModel.findOne({ _id: userId });
  if (user.role == "user" && user.name == name && user.phoneNo == phoneNo) {
    const product = await ItemModel.find({ _id: productId });
    if (product) {
      const orders = user.orders;
      // name, desc, price,discount , category, imgs, stocks, brand, isActive
      let order = { photo, stock, ...currentOrder };
      order = {
        ...currentOrder,
        price: product.price * quantity - (1 - product.discount / 100),
        quantity,
        status: "pending",
      };
      orders.push(order);
      user.orderHis.push(order);
      await user.save();
      res.redirect("/api/user/orders");
    } else {
      res.json({ err: "Product Not Found", credentials });
    }
  } else {
    res.json({ err: "Invalid user Creadentials", credentials });
  }
}]
export async function getOrderHis(req, res) {
  const _id = req.session.userId;
  const user = await UserModel.findOne({ _id });
  if (user) {
    res.json({
      orderHis: user.orderHis,
    });
  } else {
    res.json({ err: "Please try again." });
  }
}
export async function getOrderDetail(req, res) {
  const userId = req.session.userId;
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
export async function postCancelOrder(req, res) {
  const userId = req.session.userId;
  const ordId = req.body.ordId;
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    user.orders = user.orders.filter((ord) => ord._id != ordId);
    user.orderHis = user.orderHis.map((odr) => {
      if (odr._id != ordId) {
        return odr;
      } else {
        odr.status = "cancelled";
      }
    });
    await user.save();
    res.redirect("/api/user/orders");
  } else {
    res.json({ err: "Invalid user or order" }).redirect("/api/user/orders");
  }
}
