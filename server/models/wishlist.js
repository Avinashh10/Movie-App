const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  poster_path: { type: String },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;