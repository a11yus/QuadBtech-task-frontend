import React, { useState, useEffect } from 'react'
import { Heart, Minus, Plus, Star, ShoppingCart, ChevronDown } from 'lucide-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newletter'
import Footer from '../../components/User/Footer'

export default function ProductDetail() {
  const { id } = useParams()  // Get the product ID from the URL
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')
  
  // Fetch product details from the API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`)
        setProduct(response.data.data)
        setSelectedColor(response.data.data.availableColors[0]) // Set the default color
      } catch (error) {
        console.error("Error fetching product details:", error)
      }
    }
    fetchProduct()
  }, [id])

  // Add product to cart
  const addToCart = async () => {
    try {
      const authToken = localStorage.getItem("authToken"); // Get the token from localStorage

      const payload = {
        productId: product._id, // The actual product ID
        quantity: quantity,
      };

      // Send the request to add the item to the cart
      await axios.post('http://localhost:5000/api/cart', payload, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add token for authentication
        },
      });

      // Optionally, you can show a success message or redirect to cart page
      console.log("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!product) return <div>Loading...</div> // Show loading state if data is not available yet

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <a href="/" className="text-gray-500">Home</a>
          <span className="text-gray-500">/</span>
          <a href="/shop" className="text-gray-500">Shop</a>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900">Product</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4">
            {product.images.map((src, index) => (
              <div key={index} className={index === 0 ? "col-span-2" : ""}>
                <img
                  src={`http://localhost:5000/uploads/${src}`}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Reviews */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating} Reviews</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Description */}
            <p className="text-gray-600">{product.description}</p>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">${product.discountPrice.toFixed(2)}</span>
              <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <span className="block text-sm font-medium text-gray-700">Choose Color</span>
              <div className="flex space-x-4">
                {product.availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
                      selectedColor === color ? 'border-black' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded-md"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex space-x-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800"
              >
                Add to Cart
              </button>
              <button className="flex items-center justify-center w-12 h-12 border rounded-md hover:bg-gray-50">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 pt-8 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Additional Info</span>
                <ChevronDown className="w-5 h-5" />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Questions</span>
                <ChevronDown className="w-5 h-5" />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Reviews ({product.rating})</span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">You might also like</h2>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            More Products →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-4">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Related product"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                ))}
              </div>
              <h3 className="font-medium">Product Name</h3>
              <p className="text-gray-900 font-bold">$199.00</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  )
}
