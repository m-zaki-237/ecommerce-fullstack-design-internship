require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Coupon = require("../models/Coupon");

const users = [
  { name: "Admin User", email: "admin@shop.com", password: "admin123", role: "admin" },
  { name: "Zaki Ahmed", email: "zaki@example.com", password: "user123", role: "user" },
  { name: "Jane Doe", email: "jane@example.com", password: "user123", role: "user" },
];

const products = [
  {
    name: "Canon Camera EOS 2000, Black 10x Zoom",
    description: "Professional DSLR camera with 10x optical zoom, perfect for photography enthusiasts. Capture stunning images with 24.1 MP resolution.",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop"],
    category: "Cameras",
    brand: "Canon",
    price: 998.00,
    originalPrice: 1128.00,
    countInStock: 50,
    rating: 4.5,
    numReviews: 32,
    isFeatured: true,
    discount: 12,
    shipping: "Free Shipping",
    priceTiers: [{ price: 998, minQty: 1, maxQty: 5, label: "1-5 pcs" }, { price: 920, minQty: 6, maxQty: 20, label: "6-20 pcs" }, { price: 850, minQty: 21, label: "21+ pcs" }],
    features: ["24.1 MP CMOS sensor", "4K video recording", "Wi-Fi & Bluetooth", "Dual pixel autofocus"],
    specs: [{ label: "Resolution", value: "24.1 MP" }, { label: "Video", value: "4K UHD" }, { label: "ISO", value: "100-25600" }],
    supplier: { name: "Canon Official Store", country: "Germany", flag: "🇩🇪", verified: true },
  },
  {
    name: "GoPro HERO6 4K Action Camera - Black",
    description: "Waterproof action camera with 4K60 video and 12MP photos. Perfect for adventure sports and outdoor activities.",
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop"],
    category: "Cameras",
    brand: "GoPro",
    price: 349.99,
    countInStock: 80,
    rating: 4.3,
    numReviews: 154,
    isFeatured: true,
    discount: 0,
    shipping: "Free Shipping",
    features: ["4K60 Video", "Waterproof to 33ft", "Voice control", "Touch screen"],
    specs: [{ label: "Video", value: "4K60" }, { label: "Photo", value: "12MP" }, { label: "Battery", value: "1220mAh" }],
    supplier: { name: "GoPro Official", country: "United States", flag: "🇺🇸", verified: true },
  },
  {
    name: "Apple MacBook Pro 14-inch M3",
    description: "Supercharged by M3, the MacBook Pro 14-inch delivers exceptional performance for professionals.",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"],
    category: "Computers",
    brand: "Apple",
    price: 1999.00,
    originalPrice: 2199.00,
    countInStock: 30,
    rating: 4.8,
    numReviews: 89,
    isFeatured: true,
    discount: 9,
    shipping: "Free Shipping",
    priceTiers: [{ price: 1999, minQty: 1, maxQty: 3, label: "1-3 units" }, { price: 1850, minQty: 4, label: "4+ units" }],
    features: ["Apple M3 chip", "18-hour battery", "Liquid Retina XDR display", "16GB unified memory"],
    specs: [{ label: "Chip", value: "Apple M3" }, { label: "Memory", value: "16GB" }, { label: "Storage", value: "512GB SSD" }],
    supplier: { name: "Apple Authorized Reseller", country: "United States", flag: "🇺🇸", verified: true },
  },
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise canceling headphones with 30-hour battery life and exceptional sound quality.",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"],
    category: "Electronics",
    brand: "Sony",
    price: 279.99,
    originalPrice: 349.99,
    countInStock: 120,
    rating: 4.7,
    numReviews: 210,
    isFeatured: true,
    discount: 20,
    shipping: "Free Shipping",
    features: ["Industry-leading noise canceling", "30hr battery", "Multipoint connection", "Quick charge"],
    specs: [{ label: "Battery", value: "30 hours" }, { label: "Driver", value: "30mm" }, { label: "Connectivity", value: "Bluetooth 5.2" }],
    supplier: { name: "Sony Electronics", country: "Japan", flag: "🇯🇵", verified: true },
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "The ultimate Galaxy experience with built-in S Pen, 200MP camera, and AI-powered features.",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
    category: "Electronics",
    brand: "Samsung",
    price: 1199.99,
    countInStock: 60,
    rating: 4.6,
    numReviews: 178,
    isFeatured: false,
    discount: 0,
    shipping: "Free Shipping",
    features: ["200MP main camera", "Built-in S Pen", "5000mAh battery", "Snapdragon 8 Gen 3"],
    specs: [{ label: "Display", value: "6.8-inch QHD+" }, { label: "Camera", value: "200MP" }, { label: "RAM", value: "12GB" }],
    supplier: { name: "Samsung Official", country: "South Korea", flag: "🇰🇷", verified: true },
  },
  {
    name: "Apple Watch Series 9",
    description: "The most advanced Apple Watch yet with new double tap gesture and brighter display.",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"],
    category: "Accessories",
    brand: "Apple",
    price: 399.00,
    originalPrice: 429.00,
    countInStock: 90,
    rating: 4.5,
    numReviews: 95,
    isFeatured: true,
    discount: 7,
    shipping: "Free Shipping",
    features: ["Double tap gesture", "S9 chip", "Always-on display", "Blood oxygen sensor"],
    specs: [{ label: "Display", value: "45mm Retina LTPO" }, { label: "Battery", value: "18 hours" }, { label: "Water resistance", value: "50m" }],
    supplier: { name: "Apple Official", country: "United States", flag: "🇺🇸", verified: true },
  },
  {
    name: "Men's Slim Fit Cotton T-Shirt",
    description: "Premium quality cotton t-shirt with modern slim fit. Available in multiple colors for everyday wear.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop"],
    category: "Clothing",
    brand: "BrandX",
    price: 19.99,
    countInStock: 200,
    rating: 4.2,
    numReviews: 45,
    isFeatured: false,
    discount: 0,
    shipping: "Free Shipping",
    priceTiers: [{ price: 19.99, minQty: 1, maxQty: 9, label: "1-9 pcs" }, { price: 16.99, minQty: 10, maxQty: 49, label: "10-49 pcs" }, { price: 13.99, minQty: 50, label: "50+ pcs" }],
    features: ["100% cotton", "Machine washable", "Slim fit design", "Available in 8 colors"],
    specs: [{ label: "Material", value: "100% Cotton" }, { label: "Fit", value: "Slim Fit" }, { label: "Sizes", value: "XS - 3XL" }],
    supplier: { name: "Fashion Hub", country: "Turkey", flag: "🇹🇷", verified: true },
  },
  {
    name: "Modern Ergonomic Office Chair",
    description: "High-back mesh office chair with lumbar support, adjustable armrests and breathable mesh back.",
    images: ["https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&h=600&fit=crop"],
    category: "Home & Outdoor",
    brand: "ErgoComfort",
    price: 289.00,
    originalPrice: 359.00,
    countInStock: 40,
    rating: 4.4,
    numReviews: 67,
    isFeatured: false,
    discount: 19,
    shipping: "Free Shipping",
    features: ["Breathable mesh back", "Adjustable lumbar support", "360° swivel", "Height adjustable"],
    specs: [{ label: "Max weight", value: "150kg" }, { label: "Seat height", value: "45-55cm" }, { label: "Warranty", value: "3 years" }],
    supplier: { name: "Office Solutions", country: "Italy", flag: "🇮🇹", verified: true },
  },
  {
    name: "Razer BlackWidow V4 Gaming Keyboard",
    description: "Mechanical gaming keyboard with Razer Yellow switches, Chroma RGB lighting and dedicated media controls.",
    images: ["https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=600&fit=crop"],
    category: "Accessories",
    brand: "Razer",
    price: 139.99,
    countInStock: 75,
    rating: 4.6,
    numReviews: 112,
    isFeatured: false,
    discount: 0,
    shipping: "Free Shipping",
    features: ["Razer Yellow switches", "Chroma RGB", "Dedicated media keys", "Ergonomic wrist rest"],
    specs: [{ label: "Switch", value: "Razer Yellow" }, { label: "Lighting", value: "Chroma RGB" }, { label: "Connection", value: "USB-A" }],
    supplier: { name: "Razer Official", country: "United States", flag: "🇺🇸", verified: true },
  },
  {
    name: "Leather Travel Duffle Bag",
    description: "Genuine leather duffle bag with multiple compartments, perfect for weekend getaways and gym sessions.",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop"],
    category: "Accessories",
    brand: "TravelPro",
    price: 129.00,
    originalPrice: 179.00,
    countInStock: 55,
    rating: 4.3,
    numReviews: 38,
    isFeatured: false,
    discount: 28,
    shipping: "Free Shipping",
    features: ["Genuine leather", "Waterproof lining", "Multiple compartments", "Adjustable strap"],
    specs: [{ label: "Capacity", value: "40L" }, { label: "Dimensions", value: "55x30x25cm" }, { label: "Material", value: "Genuine leather" }],
    supplier: { name: "Leather Goods Co", country: "Italy", flag: "🇮🇹", verified: true },
  },
  {
    name: "Nespresso Vertuo Coffee Machine",
    description: "Smart coffee machine with one-touch brewing, automatic capsule recognition and 5 cup sizes.",
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop"],
    category: "Home & Outdoor",
    brand: "Nespresso",
    price: 199.00,
    countInStock: 45,
    rating: 4.7,
    numReviews: 203,
    isFeatured: true,
    discount: 0,
    shipping: "Free Shipping",
    features: ["Centrifusion technology", "5 cup sizes", "15-second heat-up", "Used capsule container"],
    specs: [{ label: "Pressure", value: "19 bar" }, { label: "Capacity", value: "1.1L" }, { label: "Power", value: "1350W" }],
    supplier: { name: "Nespresso Official", country: "Switzerland", flag: "🇨🇭", verified: true },
  },
  {
    name: "Yoga Mat Premium Non-Slip",
    description: "Eco-friendly TPE yoga mat with alignment lines, carrying strap and excellent grip on all surfaces.",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop"],
    category: "Sports",
    brand: "YogaLife",
    price: 49.99,
    countInStock: 150,
    rating: 4.4,
    numReviews: 88,
    isFeatured: false,
    discount: 0,
    shipping: "Free Shipping",
    features: ["Eco-friendly TPE", "6mm thickness", "Alignment lines", "Carrying strap included"],
    specs: [{ label: "Dimensions", value: "183x61cm" }, { label: "Thickness", value: "6mm" }, { label: "Weight", value: "1.2kg" }],
    supplier: { name: "Sports World", country: "China", flag: "🇨🇳", verified: false },
  },
];

const coupons = [
  { code: "SAVE10", discountType: "percentage", discountValue: 10, minOrderAmount: 50, maxUses: 500, isActive: true },
  { code: "WELCOME20", discountType: "percentage", discountValue: 20, minOrderAmount: 100, maxUses: 200, isActive: true },
  { code: "FLAT50", discountType: "fixed", discountValue: 50, minOrderAmount: 200, maxUses: 100, isActive: true },
];

const seedDB = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Coupon.deleteMany();
    console.log("Cleared existing data");

   const createdUsers = [];
for (const userData of users) {
  const user = new User(userData);
  await user.save(); // triggers bcrypt pre-save hook
  createdUsers.push(user);
}
    console.log(`${createdUsers.length} users seeded`);

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products seeded`);

    await Coupon.insertMany(coupons);
    console.log(`${coupons.length} coupons seeded`);

    console.log("Database seeded successfully!\n");
    console.log("Admin:  admin@shop.com  | admin123");
    console.log("User:   zaki@example.com | user123");
    console.log("Coupons: SAVE10, WELCOME20, FLAT50");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seedDB();
