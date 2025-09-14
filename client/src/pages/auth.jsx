import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", formData);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const userData = { email: formData.email }; 
      const tokenData = res.data.token;

      login(userData, tokenData); 
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="bg-slate-100 h-screen flex justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-white w-full max-w-md min-h-[400px] sm:min-h-[450px] rounded-lg shadow-lg text-center p-6">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 w-full border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 mt-4 w-full border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-md"
            />
            <button
              className="mt-6 w-full bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800 cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="m-3 text-gray-500 text-sm">OR</p>
            <button
              className="px-4 py-2 w-full bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Create Account
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-100 h-screen flex justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-white w-full max-w-md min-h-[400px] sm:min-h-[450px] rounded-lg shadow-lg text-center p-6">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 w-full border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 mt-4 w-full border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 mt-4 w-full border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-md"
            />
            <button
              className="mt-6 w-full bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800 cursor-pointer"
              onClick={handleSignup}
            >
              Signup
            </button>
            <p className="m-3 text-gray-500 text-sm">OR</p>
            <button
              className="px-4 py-2 w-full mb-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Already Have Account
            </button>
          </div>
        </div>
      )}
    </>
  );
}
