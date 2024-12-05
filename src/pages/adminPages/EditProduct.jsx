import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../ui/AdminSidebar';
import { ChevronRight, X, Menu, Star } from 'lucide-react';

const EditProduct = () => {
  const { product_id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [newColor, setNewColor] = useState('');
  const [newImage, setNewImage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${product_id}`);
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (product_id) {
      fetchProductDetails();
    }
  }, [product_id]);

  const saveProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${product_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();

      if (data.isError === false) {
        setFeedbackMessage('Product updated successfully!');
        setTimeout(() => navigate('/admin/products'), 2000);
      } else {
        setFeedbackMessage('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setFeedbackMessage('An error occurred while saving the product.');
    }
  };

  const handleAddColor = () => {
    if (newColor && !product.availableColors.includes(newColor)) {
      setProduct((prevState) => ({
        ...prevState,
        availableColors: [...prevState.availableColors, newColor],
      }));
      setNewColor('');
    }
  };

  const handleAddImage = () => {
    if (newImage) {
      setProduct((prevState) => ({
        ...prevState,
        images: [...prevState.images, newImage],
      }));
      setNewImage('');
    }
  };

  const handleRemoveImage = (index) => {
    setProduct((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, imgIndex) => imgIndex !== index),
    }));
  };

  const validateNumberInput = (value) => {
    return value === '' ? '' : Math.max(0, Number(value));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="md:ml-64">
        <header className="h-16 border-b bg-white flex items-center justify-between px-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </header>
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
          {feedbackMessage && <div className="mb-4 text-green-600">{feedbackMessage}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images Section */}
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((img, index) => (
                <div key={index} className="relative aspect-square bg-gray-100 rounded-lg">
                  <img src={img} alt={`Product ${index}`} className="w-full h-full object-cover rounded-lg" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Add Image URL"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full pl-4 py-2 bg-gray-50 border-0 rounded-lg"
                />
                <button onClick={handleAddImage} className="text-blue-500 mt-2">
                  Add Image
                </button>
              </div>
            </div>
            {/* Form Section */}
            <div>
              <div className="mb-4">
                <label className="font-medium">Title</label>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => setProduct({ ...product, title: e.target.value })}
                  className="w-full p-2 bg-gray-50 border-0 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="font-medium">Brand</label>
                <input
                  type="text"
                  value={product.brand}
                  onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                  className="w-full p-2 bg-gray-50 border-0 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="font-medium">Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: validateNumberInput(e.target.value) })}
                  className="w-full p-2 bg-gray-50 border-0 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="font-medium">Original Price</label>
                <input
                  type="number"
                  value={product.originalPrice}
                  onChange={(e) => setProduct({ ...product, originalPrice: validateNumberInput(e.target.value) })}
                  className="w-full p-2 bg-gray-50 border-0 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="font-medium">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  value={product.rating}
                  onChange={(e) => setProduct({ ...product, rating: validateNumberInput(e.target.value) })}
                  className="w-full p-2 bg-gray-50 border-0 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="font-medium">Description</label>
                <textarea
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  className="w-full p-2 bg-gray-50 border-0 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="font-medium">Available Colors</label>
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-full p-2 bg-gray-50 border-0 rounded-lg"
                />
                <button onClick={handleAddColor} className="text-blue-500 mt-2">
                  Add Color
                </button>
                <div className="flex gap-4 mt-2">
                  {product.availableColors.map((color, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 border-2 rounded"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="font-medium">Stock</label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: validateNumberInput(e.target.value) })}
                  className="w-full p-2 bg-gray-50 border-0 rounded-lg"
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={saveProduct} className="flex-1 bg-black text-white py-3 rounded-lg">
                  Save Changes
                </button>
                <button
                  onClick={() => navigate('/admin/products')}
                  className="flex-1 border border-gray-200 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
