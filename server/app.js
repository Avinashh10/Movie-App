require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoutes');
const cors = require("cors");
const wishlistRoutes = require("./routes/wishListRoutes");


const app = express();

const port = process.env.PORT || 8000;

app.use(cors({
   origin: [
    "http://localhost:5173", // Local development
    "https://movie-app-pi-lovat.vercel.app" // Vercel frontend
  ],  
  credentials: true               
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
});

// Test route
app.get('/', (req, res) => {
    res.send("Hello Blog API 👋");
});
app.use('/api/auth', authRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
