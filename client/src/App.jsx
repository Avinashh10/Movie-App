import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Auth from "./pages/auth";
import Wishlist from "./pages/Watchlist";
import SearchResult from "./pages/SearchResults";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signup" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/movie/:id"
          element={
           
              <Detail/>
            
          }
 
        />
        <Route path="/wishlist" element={<Wishlist />} />
             <Route path="/search" element={<SearchResult />} />


    </Routes>
  );
}

export default App;


