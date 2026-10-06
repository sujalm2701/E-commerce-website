import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
  // name, description, price,discount , category, photo, stock, brand
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount:{
    type: Number,
    required: true,
    default: 0,
  },
  category:{
    type: String,
    required: true,
  },
  photo: [
    {
      type: String,
      required: true,
      min: 1,
    },
  ],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
    required: false,
  },
});

const itemModel = mongoose.model("ItemModel", ItemSchema);
export default itemModel;
