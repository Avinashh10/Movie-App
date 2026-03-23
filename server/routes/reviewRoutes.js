const express = require("express");
const router = express.Router();
const { authMiddleware} = require("../middleware/authMiddleware");
const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controller/review");

router.post("/comments", authMiddleware, addComment);
router.get("/comments/:movieId", getComments);
router.patch("/comments/:commentId", authMiddleware, updateComment);
router.delete("/comments/:commentId", authMiddleware, deleteComment);

module.exports = router;
