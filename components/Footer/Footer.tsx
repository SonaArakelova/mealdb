'use client'
import React from "react";

export function Footer() {
  return (
    <footer className="bg-green-100 text-green-800 border-t border-green-320">
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h3 className="mb-4 text-green-900 text-lg font-semibold">Contact</h3>
        <ul className="space-y-1 text-sm">
          <li><span className="font-bold">Email:</span> support@mealdbapp.com</li>
          <li><span className="font-bold">Phone:</span> +374 56 578788</li>
          <li><span className="font-bold">Location:</span> Yerevan, Armenia</li>
        </ul>
      </div>

      <div className="text-center text-sm text-green-700 p-4 border-t border-green-300">
        © {new Date().getFullYear()} MealDB App. All rights reserved.
      </div>
    </footer>
  );
}
