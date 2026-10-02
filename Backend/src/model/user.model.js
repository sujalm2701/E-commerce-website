import mongoose, { Schema } from "mongoose";
import Item from "./item.model";
// name, email, password, role(user,admin), address, cart, orders
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
      type: Schema.Types.ObjectId,
      ref: Item,
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
