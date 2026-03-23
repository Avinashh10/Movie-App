import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const MovieRating = ({ movieId }) => {
  const [average, setAverage] = useState(0);
  const [votes, setVotes] = useState(0);
  const [rating, setRating] = useState(0);
  const [showStars, setShowStars] = useState(false);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://movie-app-1-08bw.onrender.com/api/ratings";

  const fetchRating = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${movieId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) return;
      const data = await res.json();

      setAverage(Number(data.average || 0));
      setVotes(data.votes || 0);
      setRating(data.userRating || 0);
    } catch (err) {
      console.error("Failed to fetch rating:", err);
    }
  };

  useEffect(() => {
    fetchRating();
  }, [movieId]);

  const handleRate = async (value) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required to rate");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId,
          rating: value,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Rating failed");
      }

      await fetchRating();
      setShowStars(false);
    } catch (err) {
      console.error("Rating failed:", err);
      alert("Rating failed");
    }
  };

  return (
    <div className="flex items-center gap-8 mt-4">
      {/* Rating display */}
      <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-lg">
        <FaStar className="text-yellow-400 text-2xl" />

        <div className="leading-tight">
          <div className="flex items-end gap-1">
            <span className="text-white text-2xl font-semibold">
              {average.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">/10</span>
          </div>

          <p className="text-gray-500 text-xs">{votes} votes</p>
        </div>
      </div>

      {/* Rating input */}
      <div className="flex flex-col">
        {!localStorage.getItem("token") ? (
          <p className="text-gray-400 text-sm">Log in to rate</p>
        ) : (
          <>
            {!showStars ? (
              <button
                onClick={() => setShowStars(true)}
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition"
              >
                <FaStar />
                Rate this
              </button>
            ) : (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => handleRate(star)}
                    className={`cursor-pointer text-lg transition ${
                      star <= rating ? "text-yellow-400" : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}
            {rating > 0 && (
              <p className="text-gray-400 text-xs mt-1">Your rating: {rating}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieRating;
