import express from "express";
import { Cart } from "../models/cart.model";
import { Product } from "../models/product.model";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Helper function to get a cart by user ID or a guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne(guestId);
  }

  return null;
};

// @route POST /api/cart
// @desc add a product to the cart for the guest or loggeed in user
// @access Public

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // determine if user is logged in or guest
    let cart = await getCart(userId, guestId);

    // If cart exist, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if(productIndex > -1){
        // if product already exists, so we can update the quanitity
        cart.products[productIndex].quantity += quantity;
      }
    }
  } catch (error) {}
});