
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";



type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};



export  function GlobalSearch2() {
  
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);



 useEffect(() => {
        if (query.trim().length === 0) {
            setMeals([]);
            setIsLoading(false)
            return;
        }

        setIsLoading(true);
        const ac = new AbortController()

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`, {
                    signal: ac.signal
                });

                if (!res.ok) throw new Error(`Fetch error`);
                const data = await res.json();
                setMeals(data.meals || []);

            } catch (err: unknown ) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error(err.message);
                }


            } finally {
                setIsLoading(false);
            }

        }, 500);

        return () => {
            clearTimeout(timer);
            ac.abort();
        }

    }, [query]);



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
        id="Searchinput"
        className="w-full p-2 rounded-md border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-600 bg-white"
        type="text"
        placeholder="Search Meals..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {open && (
        <ul className="absolute bg-green-100 border border-gray-300 w-full mt-1 z-50 max-h-64 overflow-y-auto">
          {isLoading && <li className="p-2 text-gray-500">Loading...</li>}

          {!isLoading && meals.length === 0 && query.trim().length > 0 && (
            <li className="p-2 text-gray-500">No results found</li>
          )}

          {!isLoading &&
            meals.slice(0, 10).map((item) => (
              <li key={item.idMeal} className="p-2 hover:bg-white">
                <Link
                  href={`/meal/${item.idMeal}`}
                  onClick={() => setOpen(false)}
                  className="flex gap-4 shadow p-2 text-2xl"
                >

                  {item.strMealThumb  &&(
                  <Image
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    width={110}
                    height={110}
                    className="rounded"
                  />
                  )}

                  <span className="ml-2">{item.strMeal}</span>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
