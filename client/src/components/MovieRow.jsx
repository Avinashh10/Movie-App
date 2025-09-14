import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { addWishlist } from "../services/wishList";

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const rowRef = useRef(null);

  // Fetch movies
  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [fetchUrl]);

  // Scroll handler
  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Add movie to wishlist
  const handleAddWishlist = async (movie) => {
    try {
      await addWishlist({
        movieId: movie.id,
        title: movie.original_title,
        poster_path: movie.poster_path,
      });
      setWishlist((prev) => [...prev, movie.id]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  return (
    <div className="px-6 py-4 relative">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 shadow-lg"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Movie Row */}
      <div ref={rowRef} className="flex overflow-x-scroll scrollbar-hide gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="relative w-48 flex-shrink-0 hover:scale-105 transition-transform duration-300">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg w-full"
              />

              {/* Wishlist Heart Button */}
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent link navigation
                  handleAddWishlist(movie);
                }}
                className="absolute top-2 right-2 text-white hover:text-red-500 text-xl z-10"
              >
                {wishlist.includes(movie.id) ? "❤️" : "🤍"}
              </button>

              <div className="absolute bottom-0 w-full bg-black/60 text-white p-2 text-sm rounded-b-lg">
                {movie.original_title.length > 20
                  ? movie.original_title.slice(0, 20) + "..."
                  : movie.original_title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 shadow-lg"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default MovieRow;
