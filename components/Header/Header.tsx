'use client'

import React from "react";
import { usePathname, useRouter } from 'next/navigation';

// import { GlobalSearch } from "./GlobalSearch";
import {GlobalSearch2} from "./GlobalSearch2";


export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };


  return (
    <header className="bg-green-200 text-green-900 p-10 ">
      <div className="flex flex-col sm:flex-row items-center justify-between pl-10 pr-10">
        <h1 className="text-4xl font-bold"> Welcome to MealDb </h1>
         <div className="w-full sm:w-72 ">
          {/* <GlobalSearch />  */}
          <GlobalSearch2 />

        </div>

         {pathname !== '/' && (
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-white border border-green-400 rounded hover:bg-green-100"
          >
            Home
          </button>
        )}
        
      </div>
    </header>
  );
}
