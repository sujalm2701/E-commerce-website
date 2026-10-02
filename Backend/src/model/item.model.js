import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
  // name, desc, price, category, imgs, stocks, brand, isActive
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
  isActive: {
    type: Boolean,
    required: true,
  },
});

const itemModel = mongoose.model("ItemModel", ItemSchema);
export default itemModel;
