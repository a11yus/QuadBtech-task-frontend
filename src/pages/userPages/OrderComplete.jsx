import Footer from "../../components/User/Footer";
import Navbar from "../../components/User/Navbar";

export default function OrderComplete() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">Complete!</h1>

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
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
              ✓
            </div>
            <div className="text-sm ml-2">Checkout details</div>
          </div>
          <div className="h-[2px] w-16 bg-green-500 mx-4"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              3
            </div>
            <div className="text-sm ml-2">Order complete</div>
          </div>
        </div>

        {/* Order Confirmation */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium mb-2">Thank you! 🎉</h2>
            <p className="text-3xl font-semibold">
              Your order has been received
            </p>
          </div>

          {/* Order Items */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="relative">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Black table"
                className="w-24 h-24 object-cover"
              />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
                2
              </span>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Red table"
                className="w-24 h-24 object-cover"
              />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
                2
              </span>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Lamp"
                className="w-24 h-24 object-cover"
              />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
                1
              </span>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Order code:</span>
              <span className="font-medium">#0123_45678</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">October 19, 2023</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Total:</span>
              <span className="font-medium">$1,345.00</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Payment method:</span>
              <span className="font-medium">Credit Card</span>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Purchase history
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
