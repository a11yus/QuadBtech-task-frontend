import React from 'react';
import { Star } from 'lucide-react';

function NewArrivals() {
  const products = [
    {
      name: "Loveseat Sofa",
      price: "199.99",
      rating: 5,
      image: "/placeholder.svg?height=300&width=300",
      isNew: true
    },
    {
      name: "Table Lamp",
      price: "79.99",
      rating: 5,
      image: "/placeholder.svg?height=300&width=300",
      isNew: true
    },
    {
      name: "Desk Lamp",
      price: "49.99",
      rating: 5,
      image: "/placeholder.svg?height=300&width=300",
      isNew: true
    },
    {
      name: "Storage Basket",
      price: "29.99",
      rating: 5,
      image: "/placeholder.svg?height=300&width=300",
      isNew: true
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-8">New Arrivals</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="group relative">
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                NEW
              </span>
            )}
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">${product.price}</p>
            </div>
            <button className="mt-2 w-full bg-black text-white py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;

