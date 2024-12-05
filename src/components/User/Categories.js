import React from "react";

function Categories() {

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="lg:flex justify-between items-center">
        <h4 className="text-3xl md:text-6xl lg:text-7xl font-medium leading-tight mb-4">
          Simply Unique<span className="text-gray-400">/</span>
          <br />
          Simply Better<span className="text-gray-400">.</span>
        </h4>
        <p className="text-gray-600 lg:self-center lg:mt-0 text-center">
          <span className="font-medium">3legant</span> is a gift & decorations
          store based in HCMC, Vietnam. Est since 2019.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Living Room Section */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="mb-8">
            <h2 className="text-3xl font-medium mb-4">Living Room</h2>
            <a
              href="/products"
              className="inline-flex items-center text-black hover:underline"
            >
              Shop Now
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
          <img
            src="/placeholder.svg?height=400&width=500"
            alt="Gray tufted armchair"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="space-y-8">
          {/* Bedroom Section */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-medium mb-4">Bedroom</h2>
              <a
                href="/products"
                className="inline-flex items-center text-black hover:underline"
              >
                Shop Now
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="White modern dresser"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Kitchen Section */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-medium mb-4">Kitchen</h2>
              <a
                href="ncnf"
                className="inline-flex items-center text-black hover:underline"
              >
                Shop Now
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Cream colored toaster"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
