import React, { useState, useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("free");
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();

  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProducts(response.data.cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Update quantity of an item
  const updateQuantity = async (id, change) => {
    try {
      const updatedProducts = products.map((product) => {
        if (product._id === id) {
          const newQuantity = Math.max(1, product.quantity + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      setProducts(updatedProducts);

      const updatedItem = updatedProducts.find((product) => product._id === id);
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
  const removeProduct = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const shippingCost = shippingMethod === "express" ? 15.0 : shippingMethod === "pickup" ? 21.0 : 0;
  const total = subtotal + shippingCost;

  const handleViewCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Cart</h1>
        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              1
            </div>
            <div className="text-sm ml-2">Shopping cart</div>
          </div>
          <div className="h-[2px] w-16 bg-gray-300 mx-4"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">
              2
            </div>
            <div className="text-sm ml-2">Checkout details</div>
          </div>
          <div className="h-[2px] w-16 bg-gray-300 mx-4"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              3
            </div>
            <div className="text-sm ml-2">Order complete</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-4 gap-4 font-semibold mb-4 p-4">
              <div className="col-span-2">Product</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>
            {products.map((product) => (
              <div key={product._id} className="grid grid-cols-4 gap-4 items-center border-t border-gray-200 p-4">
                <div className="col-span-2 flex items-center space-x-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-gray-500">Color: {product.availableColors.join(", ")}</p>
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="text-gray-500 flex items-center mt-2 hover:text-black"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(product._id, -1)}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{product.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product._id, 1)}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div>${(product.price * product.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Cart summary</h2>
              <div className="space-y-3 mb-6">
                <label className="flex items-center justify-between p-3 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    value="free"
                    checked={shippingMethod === "free"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  Free shipping <span>$0.00</span>
                </label>
                <label className="flex items-center justify-between p-3 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === "express"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  Express shipping <span>+$15.00</span>
                </label>
              </div>
              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800" onClick={handleViewCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
