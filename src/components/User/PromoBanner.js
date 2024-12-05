import React, { useState } from "react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative isolate flex items-center justify-center gap-x-6 overflow-hidden bg-purple-50 px-6 py-2.5 sm:px-3.5">
      <div className="flex items-center justify-center gap-x-4 gap-y-2 rounded-md">
        <div className="flex items-center gap-x-2">
          {/* Gift Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>
        <p className="text-sm leading-6">
          30% off storewide — Limited time!{" "}
          <a
            href="/products"
            className="inline-flex items-center gap-x-1 font-semibold text-purple-600 hover:text-purple-500 hover:underline"
          >
            Shop Now
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 hover:bg-purple-100"
      >
        <span className="sr-only">Dismiss</span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
