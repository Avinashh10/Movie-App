const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    movieId: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }

}, { timestamps: true });

ratingSchema.index({ movieId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Rating", ratingSchema);