import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  User,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";
import Footer from "../../components/User/Footer";
import Navbar from "../../components/User/Navbar";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Tray Table",
      color: "Black",
      price: 38.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Tray Table",
      color: "Red",
      price: 38.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Table lamp",
      color: "gold",
      price: 39.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]);

  const updateQuantity = (id, change) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 25.0;
  const total = subtotal - discount;

  const handleViewOrderComplete = () => {
    navigate("/orderComplete");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Check Out</h1>

        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
              ✓
            </div>
            <div className="text-sm ml-2">Shopping cart</div>
          </div>
          <div className="h-[2px] w-16 bg-green-500 mx-4"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">FIRST NAME</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">LAST NAME</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-2">PHONE NUMBER</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded"
                  placeholder="Phone number"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="Your Email"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">STREET ADDRESS *</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Street Address"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">COUNTRY *</label>
                  <div className="relative">
                    <select className="w-full p-2 border rounded appearance-none">
                      <option>Select Country</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">TOWN / CITY *</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Town / City"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">STATE</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">ZIP CODE</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="billing" className="mr-2" />
                  <label htmlFor="billing" className="text-sm">
                    Use a different billing address (optional)
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div
                  className={`p-4 border rounded cursor-pointer ${
                    paymentMethod === "credit" ? "border-black" : ""
                  }`}
                  onClick={() => setPaymentMethod("credit")}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === "credit"}
                      onChange={() => setPaymentMethod("credit")}
                      className="mr-2"
                    />
                    <span>Pay by Card Credit</span>
                  </div>
                </div>
                <div
                  className={`p-4 border rounded cursor-pointer ${
                    paymentMethod === "paypal" ? "border-black" : ""
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="mr-2"
                    />
                    <span>Paypal</span>
                  </div>
                </div>
                {paymentMethod === "credit" && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm mb-2">CARD NUMBER</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="1234 1234 1234"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">
                          EXPIRATION DATE
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">CVC</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="CVC code"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white p-6 border rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 border rounded-l"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 border-t border-b">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 border rounded-r"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Coupon Code */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded"
                  placeholder="Input"
                />
                <button className="px-4 py-2 bg-black text-white rounded">
                  Apply
                </button>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between text-sm">
                <span>JenkateMW</span>
                <span className="text-green-500">-$25.00 [Remove]</span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className="w-full py-3 bg-black text-white rounded"
                onClick={handleViewOrderComplete}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
