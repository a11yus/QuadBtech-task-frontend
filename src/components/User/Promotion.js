import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function Promotion() {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative">
        <img
          src="/placeholder.svg?height=500&width=600"
          alt="Modern living room with tan leather sofa and geometric rug"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
        <span className="text-blue-600 font-medium mb-4">
          SALE UP TO 35% OFF
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          HUNDREDS of
          <br />
          New lower prices!
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          It's more affordable than ever to give every room in your home a stylish makeover
        </p>
        <button className="flex items-center text-black font-medium group">
          <span>Shop Now</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

