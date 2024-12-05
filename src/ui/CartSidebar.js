import React, { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = response.data.cartItems;
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Update cart quantities and recalculate subtotal
  const updateQuantity = async (id, change) => {
    try {
      const updatedCart = cartItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
      setCartItems(updatedCart);

      const updatedItem = updatedCart.find((item) => item._id === id);
      const authToken = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:5000/api/cart/${id}`,
        { quantity: updatedItem.quantity },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Recalculate subtotal whenever cartItems changes
  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
  }, [cartItems]);

  useEffect(() => {
    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen]);

  const handleViewCart = () => {
    navigate("/cart");
  };

  const handleViewCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 py-4 border-b">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-500">
                      Color: {item.availableColors.join(", ")}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>{" "}
            {/* Update if taxes/shipping added */}
          </div>
          <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          onClick={handleViewCheckout}
          >
            Checkout
          </button>
          <button
            className="w-full text-center text-gray-600 hover:text-gray-800"
            onClick={handleViewCart}
          >
            View Cart
          </button>
        </div>
      </div>
    </>
  );
}
