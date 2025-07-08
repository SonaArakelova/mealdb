'use client'

import React from "react";

export function Header() {
  return (
    <header className="bg-green-200 text-green-900 p-10 ">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <h1 className="text-4xl font-bold">Welcome to MealDb</h1>
        <input
          type="text"
          placeholder="Search meals..."
          className="w-full sm:w-72 p-3 rounded-md border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </header>
  );
}
