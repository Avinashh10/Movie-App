import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// TMDB Bearer Token
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDkyYWQ5OWVjNDU5ZjljNmViNzU0Y2I4NDllOGFlMiIsIm5iZiI6MTc1Nzc2ODg1MC4wMDQ5OTk5LCJzdWIiOiI2OGM1NmM5MWQxZmRlNGU1MmFhODYwZjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j1QdeS5VVmeI6H9lhMcU6Ly0h2arNO0hT1jRAW87Q-s";

export default function SearchResults() {
  const location = useLocation();

  // Extract query and genre from URL
  const query = new URLSearchParams(location.search).get("query") || "";
  const genres = new URLSearchParams(location.search).get("genre") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query && !genres) return; // Do nothing if no filters

      setLoading(true);
      setError("");

      try {
        let url;

        // Determine which TMDB endpoint to call
        if (query) {
          // Always search by query first
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&include_adult=false&language=en-US&page=1`;
        } else if (genres) {
          // If only genres selected
          url = `https://api.themoviedb.org/3/discover/movie?with_genres=${encodeURIComponent(
            genres
          )}&include_adult=false&language=en-US&page=1`;
        }

        const res = await fetch(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        const data = await res.json();

        if (!data.results) {
          setError("No results found");
          setResults([]);
          return;
        }

        let filteredResults = data.results;

        // If both query and genre exist, filter client-side by genre_ids
        if (query && genres) {
          const selectedGenreIds = genres.split(",").map(Number);
          filteredResults = filteredResults.filter((movie) =>
            movie.genre_ids.some((id) => selectedGenreIds.includes(id))
          );
        }

        setResults(filteredResults);
      } catch (err) {
        setError("Failed to fetch movies 😞");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, genres]);

  // Title for header
  let title = query
    ? `Search Results for "${query}"`
    : genres
    ? "Results for Selected Genres"
    : "No results";

  return (
    <div className="px-8 py-6 min-h-screen bg-black text-white">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && results.length === 0 && <p>No results found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-3">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm text-gray-400">
                {movie.release_date?.slice(0, 4) || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
