import axios from "axios";

const API_URL = "http://localhost:8000/api/wishlist"; 

const header = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get all wishlist movies for the logged-in user
export const getWishlist = async () => {
  const res = await axios.get(API_URL, header());
  return res.data;
};

// Add a new movie to wishlist
export const addWishlist = async (movie) => {
  const res = await axios.post(API_URL, movie, header());
  return res.data;
};

// Remove a movie from wishlist
export const removeWishlist = async (movieId) => {
  const res = await axios.delete(`${API_URL}/${movieId}`, header());
  return res.data;
};

