import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Banner = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      transitionTime={3}
      infiniteLoop={true}
      showStatus={false}
    >
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <div className="relative h-[600px]">
            {/* Poster Image */}
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover object-top mx-auto block"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 w-full h-[70%] flex flex-col justify-end items-start px-20 py-10 bg-gradient-to-t from-black/90 to-black/0 transition-opacity duration-300">
              {/* Title */}
              <h1 className="font-extrabold text-5xl mb-2 text-left text-white">
                {movie.original_title}
              </h1>

              {/* Release Date + Rating */}
              <div className="flex items-center text-2xl mb-4 text-white">
                <span>{movie.release_date}</span>
                <span className="ml-12">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>

              {/* Description */}
              <p className="italic text-base mb-1 text-left w-2/3 text-white">
                {movie.overview.length > 200
                  ? movie.overview.slice(0, 200) + "..."
                  : movie.overview}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default Banner;
