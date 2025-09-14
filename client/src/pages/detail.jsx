import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [id]);

  if (!movie)
    return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Backdrop image */}
      <div className="relative h-[400px] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.original_title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Poster + Details */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-6 -mt-32 relative z-10">
        {/* Poster */}
        <div className="w-full md:w-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.original_title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3 space-y-4">
          <h1 className="text-4xl font-extrabold">{movie.original_title}</h1>
          <h2 className="text-xl italic text-gray-300">{movie.tagline}</h2>

          <div className="flex items-center gap-6 text-lg">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>({movie.vote_count} votes)</span>
            <span>{movie.runtime} mins</span>
            <span>{movie.release_date}</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genres &&
              movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
