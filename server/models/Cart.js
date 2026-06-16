const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, default: 1, min: 1 },
  seller: { type: String, default: "" },
  size: { type: String, default: "" },
  color: { type: String, default: "" },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
    savedItems: [cartItemSchema],
    couponCode: { type: String, default: "" },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartSchema.virtual("subtotal").get(function () {
  return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
});

module.exports = mongoose.model("Cart", cartSchema);
