import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Heart, Menu, ChevronDown } from "lucide-react";
import AdminSidebar from "../../ui/AdminSidebar";
import axios from 'axios';

const AllProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch the products data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        if (response.data && !response.data.isError) {
          setProducts(response.data.data);
        } else {
          console.error("Error fetching products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="md:ml-64">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Moni Roy</p>
                <span className="text-xs font-light">Admin</span>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 ml-1 rounded" />
          </div>
        </header>
        {/* Main Content */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Products</h2>

          {/* Hero Banner */}
          <div className="relative bg-black text-white rounded-xl p-12 mb-8">
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full">
              <ChevronLeft className="text-white" size={24} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full">
              <ChevronRight className="text-white" size={24} />
            </button>

            <p className="text-gray-300 mb-4">September 12-22</p>
            <h3 className="text-4xl font-bold mb-4">
              Enjoy free home
              <br />
              delivery in this summer
            </h3>
            <p className="text-gray-300 mb-6">
              Designer Dresses - Pick from trendy Designer Dress.
            </p>
            <button className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500">
              Get Started
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-6 rounded-xl">
                <div className="relative group">
                  <img
                    src={product.images[0]} // Assuming the first image is the main image
                    alt={product.title}
                    className="w-full aspect-square object-cover rounded-lg mb-4"
                  />
                  <button className="absolute right-4 top-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={20} />
                  </button>
                </div>
                <h3 className="font-semibold mb-2">{product.title}</h3>
                <p className="text-lg font-semibold mb-2">${product.discountPrice || product.price}</p>
                <div className="flex items-center mb-4">
                  {/* Render stars based on rating */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${index < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-500 ml-2">({product.rating})</span>
                </div>
                <a href={`/admin/editProduct/${product._id}`}>
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Edit Product
                  </button>
                </a>
              </div>
            ))}
          </div>

          {/* Add New Product Button */}
          <a href="/admin/createProduct">
            <button className="fixed right-8 bottom-8 flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl">
              <span className="text-2xl">+</span>
              <span className="font-semibold">Add New Product</span>
            </button>
          </a>
        </main>
      </div>
    </div>
  );
};

export default AllProducts;
