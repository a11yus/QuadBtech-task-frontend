import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adminLogin, login, logout } from "../../redux/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data", data);

      // Check if user exists and is valid
      if (data.isError === false) {
        // Set token in localStorage
        localStorage.setItem("authToken", data.token);
        // If the user is an admin
        if (data.role === "admin") {
          dispatch(adminLogin(data.role));
          toast.success("Login successful as an Admin", {
            position: "bottom-left",
          });
          navigate("/admin");
        } else {
          dispatch(login(data.role));
          toast.success("Login successful", {
            position: "bottom-left",
          });
          navigate("/");
        }

        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "bottom-left",
      });
    }
  };

  const handleLogout = () => {
    // Remove token from localStorage upon logout
    localStorage.removeItem("authToken");

    dispatch(logout());
    toast.success("Logout 😔", {
      position: "bottom-left",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section with Image */}
      <div className="hidden md:flex md:w-1/2 relative bg-gray-50">
        <div className="absolute top-8 left-8">
          <h1 className="text-2xl font-bold">3legant.</h1>
        </div>
        <img
          src="/placeholder.svg?height=800&width=600"
          alt="Elegant armchair"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section with Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Logo for mobile */}
          <div className="md:hidden mb-8">
            <h1 className="text-2xl font-bold">3legant.</h1>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account yet?{" "}
              <a href="/signup" className="text-green-500 hover:text-green-600">
                Sign Up
              </a>
            </p>
          </div>

          {!isLoggedIn ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 space-y-6">
              <p className="text-center text-lg">Welcome back!</p>
              <button
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
