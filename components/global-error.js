// Description: Global error component.

"use client";

import React from "react";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex flex-col text-black items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>
      <p className="text-lg text-gray-700 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>
  );
}
