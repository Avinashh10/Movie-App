import Banner from "../components/banner";
import Navbar from "../components/navbar";
import MovieRow from "../components/MovieRow";

const Home = () => {
  return (

    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Banner />
      <MovieRow
        title="Popular Movies"
        fetchUrl="https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      />
       <MovieRow
        title="Upcoming"
        fetchUrl='https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US'
      />
       <MovieRow
        title="Top Rated"
        fetchUrl="https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      />
    </div>
  );
};

export default Home;
