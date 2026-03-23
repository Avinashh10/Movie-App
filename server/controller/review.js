const mongoose = require("mongoose");
const Comment = require("../models/comment");

exports.addComment = async (req, res) => {
    try {
        const { movieId, text } = req.body;
        const userId = req.user._id;
        const username = req.user.name;

        if (!movieId || !text) {
            return res.status(400).json({ message: "movieId and text are required" });
        }

        const comment = await Comment.create({ movieId, user: userId, username, text });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { movieId } = req.params;
        const comments = await Comment.find({ movieId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;

        if (!text || !String(text).trim()) {
            return res.status(400).json({ message: "text is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "Invalid comment id" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (!comment.user.equals(req.user._id)) {
            return res.status(403).json({ message: "Not allowed to edit this comment" });
        }

        comment.text = String(text).trim();
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "Invalid comment id" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (!comment.user.equals(req.user._id)) {
            return res.status(403).json({ message: "Not allowed to delete this comment" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
