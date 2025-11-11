import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const { isAuthenticated, logOut } = useContext(AuthContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  // ✅ List of genres for buttons
  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];
  
  // ✅ Mapping genre name → TMDB genre ID
  const genreMap = {
    "Action": 28,
    "Comedy": 35,
    "Drama": 18,
    "Horror": 27,
    "Sci-Fi": 878,
    "Romance": 10749,
    "Thriller": 53,
    "Adventure": 12,
  };

  // ✅ Toggle genre selection
  const toggleGenre = (genre) => {
    const id = genreMap[genre];
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  // ✅ Handle search/filter submission
  const handleSearch = (e) => {
    if (e) e.preventDefault(); // only prevent default if event exists

    const params = new URLSearchParams();

    if (searchTerm.trim()) params.set("query", searchTerm.trim());
    if (selectedGenres.length) params.set("genres", selectedGenres.join(","));

    // if both are empty, do nothing
    if (![...params].length) return;

    navigate(`/search?${params.toString()}`);

    // Clear after navigation
    setSearchTerm("");
    setSelectedGenres([]);
    setIsFilterOpen(false);
  };

  return (
    <>
      <nav className="bg-black/95 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-600">Movie Review</h1>

        {/* Search + Filter */}
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-black placeholder-gray-500 pl-10 pr-3 py-2 rounded-md w-64 outline-none"
            />
            <FaSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-indigo-600"
              onClick={handleSearch}
            />
          </div>

          <button
            type="button"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </button>
        </form>

        {/* Links */}
        <ul className="flex gap-6 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-red-500 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/wishlist"
              className="hover:text-red-500 transition-colors duration-200"
            >
              WishList
            </Link>
          </li>

          {isAuthenticated ? (
            <li
              onClick={logOut}
              className="cursor-pointer hover:text-red-500 transition-colors duration-200"
            >
              Logout
            </li>
          ) : (
            <li>
              <Link
                to="/signup"
                className="hover:text-red-500 transition-colors duration-200"
              >
                SignUp
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-80 shadow-lg text-white">
            <p className="text-lg font-semibold mb-4">Filter Options</p>

            {/* Genre buttons */}
            <div className="flex flex-wrap gap-3 mt-3 mb-6">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={
                    selectedGenres.includes(genreMap[genre])
                      ? "bg-indigo-600 rounded-full px-4 py-2 text-white"
                      : "bg-gray-700 rounded-full px-4 py-2 text-gray-300"
                  }
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
              <button
                onClick={() => handleSearch()} // ✅ call handleSearch without fake event
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
