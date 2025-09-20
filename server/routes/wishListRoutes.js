// routes/wishlist.js
const express = require("express");
const router = express.Router();
const { showWishList, addWishList, removeWishList } = require("../controller/wishListController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Show wishlist
router.get("/", authMiddleware, showWishList);

// Add to wishlist
router.post("/", authMiddleware, addWishList);

// Remove from wishlist
router.delete("/:movieId", authMiddleware, removeWishList);

module.exports = router;
