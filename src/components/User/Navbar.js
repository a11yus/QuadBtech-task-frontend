import React, { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import CartSidebar from "../../ui/CartSidebar";
import PromoBanner from "./PromoBanner";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data = await response.json();

        const totalItems = data.cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        ); // Calculate total quantity
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <PromoBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold">3legant</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-900 hover:text-gray-700">
              Home
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-700">
              Shop
            </a>
            <a href="/products" className="text-gray-900 hover:text-gray-700">
              Product
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-700">
              Contact Us
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 text-gray-900">
              Home
            </a>
            <a href="#" className="block px-3 py-2 text-gray-900">
              Shop
            </a>
            <a href="/products" className="block px-3 py-2 text-gray-900">
              Product
            </a>
            <a href="#" className="block px-3 py-2 text-gray-900">
              Contact Us
            </a>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}

export default Navbar;
