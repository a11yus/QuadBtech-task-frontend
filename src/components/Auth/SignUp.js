import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = {
      userName: formData.username,
      email: formData.email,
      password: formData.password,
      role: "user",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        apiData
      );
      toast.success(
        response.data?.msg || "User registered successfully",
        { position: "bottom-left" } // Toast at bottom left
      );
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        agreeToTerms: false,
      }); // Clear input fields
      setTimeout(() => {
        navigate("/login"); // Redirect to login after a short delay
      }, 2000);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(`Error: ${message}`, { position: "bottom-left" });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image */}
      <div className="lg:w-1/2 bg-gray-50">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">3legant.</h1>
        </div>
        <div className="hidden lg:block p-6">
          <img
            src="/placeholder.svg?height=600&width=600"
            alt="Decorative chair"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Sign up</h2>
          <p className="text-gray-600 mb-8">
            Already have an account?{" "}
            <a href="/login" className="text-green-500 hover:text-green-600">
              Sign in
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree with{" "}
                <a href="#" className="font-medium underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium underline">
                  Terms of Use
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
