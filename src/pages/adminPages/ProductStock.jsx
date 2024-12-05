import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import AdminSidebar from "../../ui/AdminSidebar";

// Sample data
const products = [
  {
    id: 1,
    image: "/placeholder.svg?height=80&width=80",
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: 690.0,
    piece: 63,
    colors: ["#000000", "#666666", "#FFB6C1"],
  },
  {
    id: 2,
    image: "/placeholder.svg?height=80&width=80",
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: 190.0,
    piece: 13,
    colors: ["#000000", "#FFB6C1", "#333333", "#FFD700"],
  },
  // Add more products as needed
];

export default function ProductStock() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
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

        {/* Product Stock Content */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Product Stock</h2>
            <div className="relative w-72">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search product name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
              />
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Piece
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Available Color
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.piece}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between border-t">
              <p className="text-sm text-gray-500">Showing 1-09 of 78</p>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
