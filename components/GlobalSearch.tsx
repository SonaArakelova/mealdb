
'use client'

import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useState, useRef, useEffect } from "react";

export function GlobalSearch() {
  const { query, setQuery, meals, isLoading } = useSearch();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null)

  // Handle loading
  useEffect(()=>{
    const onClick = (e: MouseEvent)=>{
        if(ref.current && !ref.current.contains(e.target as Node)){
            setOpen(false)
            }

    }
    document.addEventListener('mousedown', onClick);

    return () => {
        document.removeEventListener('mousedown', onClick);
        }
    
  }, []

  );




  return (
    <div className="relative w-full" ref={ref}>
      <input            
        className = "w-full p-2 rounded-md border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        type="text"
        placeholder="Search Meals..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {open && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 z-50 max-h-64 overflow-y-auto">
          {isLoading && <li className="p-2 text-gray-500">Loading...</li>}

          {!isLoading && meals.length === 0 && query.trim().length > 0 && (
            <li className="p-2 text-gray-500">No results found</li>
          )}

          {!isLoading &&
            meals.slice(0, 10).map((item) => (
              <li key={item.idMeal} className="p-2 hover:bg-gray-100">
                <Link href={`/meal/${item.idMeal}`} onClick={() => setOpen(false)} className="flex gap-4 shadow p-2">
                <img src = {item.strMealThumb} alt ={item.strMeal} className="w-20 h-20 rounded"/>
                <span className="ml-2">{item.strMeal}</span>
                
                </Link>
              </li>
            ))  }
        </ul>
      )}
    </div>
  );
}





