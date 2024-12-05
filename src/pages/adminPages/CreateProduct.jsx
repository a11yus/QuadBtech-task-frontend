import React, { useState } from 'react';
import { Search, ChevronDown, Plus, PenLine, LogOut, Settings, Image, ChevronRight, Menu } from 'lucide-react';
import AdminSidebar from '../../ui/AdminSidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProduct() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    rating: '',
    images: '',
    brand: '',
    description: '',
    discountPercentage: '',
    stock: '',
    availableColors: '', // New field for colors
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Validate inputs
    const { title, price, originalPrice, images, brand, description, stock, availableColors } = formData;
    if (!title || !price || !originalPrice || !images || !brand || !description || !stock || !availableColors) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const productData = {
      ...formData,
      images: [formData.images], // Convert single image URL to array
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      rating: Number(formData.rating) || 0,
      discountPercentage: Number(formData.discountPercentage) || 0,
      stock: Number(formData.stock),
      availableColors: formData.availableColors.split(',').map((color) => color.trim()), // Convert to array
    };

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success('Product created successfully!');
        setFormData({
          title: '',
          price: '',
          originalPrice: '',
          rating: '',
          images: '',
          brand: '',
          description: '',
          discountPercentage: '',
          stock: '',
          availableColors: '', // Reset colors field
        });
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create product.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="md:ml-64">
        <header className="h-16 border-b bg-white flex items-center justify-between px-4">
          <div className="flex items-center flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg md:hidden">
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

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Create Product</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex gap-6">
              <div className="w-1/3">
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Image className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                  <input
                    type="text"
                    name="images"
                    value={formData.images}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    className="mt-2 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Product Title"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="text"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="Original Price"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Brand"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="text"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  placeholder="Discount Percentage"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="text"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Stock"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="text"
                  name="availableColors"
                  value={formData.availableColors}
                  onChange={handleInputChange}
                  placeholder="Available Colors (comma-separated)"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateProduct;
