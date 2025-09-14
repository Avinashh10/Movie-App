import { useEffect, useState } from "react";
import { getWishlist, removeWishlist } from "../services/wishList";

export default function Wishlist() {
  const [movies, setMovies] = useState([]);

  // fetch wishlist movies on load
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);


  // Remove movie handler
  const handleRemove = async (movieId) => {
    try {
      await removeWishlist(movieId);
      setMovies((prev) => prev.filter((movie) => movie.movieId !== movieId));
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {movies.length === 0 ? (
        <p className="text-gray-500">No movies in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-2 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-white truncate">
                  {movie.title}
                </h2>
                <button
                  onClick={() => handleRemove(movie.movieId)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
