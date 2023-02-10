const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must zero"],
    },
    category: {
      type: String,
      lowercase: true,
      enum: ["merchandise", "raw materials ", "finished goods"],
    },
    numberLeft: {
      type: String,
      required: true,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    qty: {
      online: {
        type: Number,
        default: 0,
      },
      inStore: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
