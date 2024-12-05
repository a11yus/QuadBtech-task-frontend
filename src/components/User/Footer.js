import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="bg-gray-900 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0 flex">
              <h1 className="text-2xl font-semibold mb-1 pr-1">3legant</h1>
              <p className="text-md text-gray-400 p-1">| Gift & Decoration Store</p>
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center gap-8">
                {['Home', 'Shop', 'Product', 'Blog', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="lg:flex gap-5">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              Copyright © 2023 3legant. All rights reserved
            </p>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors pl-4">
                Terms of Use
              </a>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

