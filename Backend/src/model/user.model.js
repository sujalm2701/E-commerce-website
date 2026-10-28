import mongoose, { Schema } from "mongoose";
import Item from "./item.model.js";
// name, email, phoneNo, password, role(user,admin), address, cart, orders, orderHis
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNo:{
    type: Number,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
  role: {
    type: string,
    required: true,
    enum: [user, admin],
  },
  address: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: Item,
      validate: {
        validator: function (value) {
          return this.role === "user";
        },
      },
    },
  ],
  orders: [
    {
      name: String,
      description: String,
      price: Number,
      quantity: Number,
      discount: Number,
      category: String,
      brand: String,
      status:{
        type: String,
        enum: ["pending", "conformed", "shipped", "delivered", "cancelled"],
        default: "pending"
      },
      validate: {
        validator: function (value) {
          return this.role === "user";
        },
      },
    },
  ],
  orderHis: [
    {
      name: String,
      description: String,
      price: Number,
      quantity: Number,
      discount: Number,
      category: String,
      brand: String,
      status:{
        type: String,
        enum: ["pending", "conformed", "shipped", "delivered", "cancelled"],
        default: "pending"
      },
      validate: {
        validator: function (value) {
          return this.role === "user";
        },
      },
    },
  ],
  
});

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
