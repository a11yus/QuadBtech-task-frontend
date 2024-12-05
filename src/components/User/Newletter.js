import React from 'react';

function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-6">Sign up for deals, new products and promotions</p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Signup
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;

