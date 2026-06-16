const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const priceTierSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  minQty: { type: Number, required: true },
  maxQty: { type: Number },
  label: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"], trim: true },
    description: { type: String, required: [true, "Description is required"] },
    images: [{ type: String }],
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Electronics",
        "Clothing",
        "Home & Outdoor",
        "Sports",
        "Cameras",
        "Computers",
        "Accessories",
        "Other",
      ],
    },
    brand: { type: String, default: "" },
    priceTiers: [priceTierSchema],
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    originalPrice: { type: Number },
    countInStock: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    features: [{ type: String }],
    specs: [{ label: String, value: String }],
    shipping: { type: String, default: "Free Shipping" },
    isFeatured: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    supplier: {
      name: { type: String, default: "" },
      country: { type: String, default: "" },
      flag: { type: String, default: "" },
      verified: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", brand: "text" });

module.exports = mongoose.model("Product", productSchema);
