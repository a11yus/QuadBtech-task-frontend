import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Grid2X2, List, LayoutList } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import Newsletter from "../../components/User/Newletter";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPrice, setSelectedPrice] = useState("All Price");
  const [sortOption, setSortOption] = useState("Featured");

  const fetchProducts = async () => {
    try {
      const queryParams = [];

      // Add sorting parameter
      if (sortOption === "Price: High to Low")
        queryParams.push("sort=high-to-low");
      if (sortOption === "Price: Low to High")
        queryParams.push("sort=low-to-high");

      // Add price range filter
      if (selectedPrice === "$0 - $100")
        queryParams.push("minPrice=0&maxPrice=100");
      if (selectedPrice === "$100 - $500")
        queryParams.push("minPrice=100&maxPrice=500");
      if (selectedPrice === "$500+") queryParams.push("moreThan500price=true");

      // Combine query parameters
      const queryString =
        queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

      const response = await axios.get(
        `http://localhost:5000/api/products${queryString}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const authToken = localStorage.getItem("authToken"); // Replace with your token retrieval logic
      const response = await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity: 1, // You can adjust this or make it dynamic
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      toast.success(
        response.data?.msg || "Product added to cart successfully!",
        { position: "top-right" } 
      );
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(`Error: ${message}`, { position: "bottom-left" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedPrice, sortOption]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gray-100">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <a href="/">Home</a>
              <span>/</span>
              <span className="text-gray-600">Shop</span>
            </div>
            <h1 className="text-4xl font-semibold">Shop Page</h1>
            <p className="text-gray-600">
              Let's design the place you always imagined.
            </p>
          </div>
        </div>
      </div>

      {/* Shop Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 md:flex-none">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-[200px] p-2 border rounded-lg"
            >
              <option>All Categories</option>
              <option>Living Room</option>
              <option>Bedroom</option>
              <option>Kitchen</option>
            </select>
          </div>

          <div className="flex-1 md:flex-none">
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full md:w-[200px] p-2 border rounded-lg"
            >
              <option>All Price</option>
              <option>$0 - $100</option>
              <option>$100 - $500</option>
              <option>$500+</option>
            </select>
          </div>

          <div className="flex-1 md:flex-none ml-auto">
            <div className="flex items-center gap-4">
              <span className="text-sm">Sort by</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="hidden md:flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Grid size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Grid2X2 size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <List size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <LayoutList size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="group">
              <div className="relative mb-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${product.images[0]}`}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    -{product.discountPercentage}%
                  </div>
                )}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Add to cart
                </button>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {/* Link to Product Detail Page */}
                <Link
                  to={`/product/${product._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border rounded-full hover:bg-gray-100">
            Show more
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Products;
