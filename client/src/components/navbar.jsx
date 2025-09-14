import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";



export default function Navbar() {
  const { isAuthenticated, logOut } = useContext(AuthContext);

  return (
    <nav className="bg-black/95 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-red-600">MovieApp</h1>

      {/* Links */}
      <ul className="flex gap-6 text-white font-medium">
        <li>
          <Link
            to="/"
            className="hover:text-red-500 transition-colors duration-200"
          >
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
          <>

            <li
              onClick={logOut}
              className="cursor-pointer hover:text-red-500 transition-colors duration-200"
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/signup"
                className="hover:text-red-500 transition-colors duration-200"
              >
                SignUp
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
