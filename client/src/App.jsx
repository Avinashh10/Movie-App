import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Auth from "./pages/auth";
import Wishlist from "./pages/Watchlist";


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


    </Routes>
  );
}

export default App;


