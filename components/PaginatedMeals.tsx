'use client'

import { useState } from "react";
import { useMemo } from "react";
import Link from "next/link";


type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

type Props = {
  meals: Meal[];
};

export default function PaginatedMeals({ meals }: Props) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [query, setQuery] = useState("");
  // ? ic heto ekox masna queryn 


  const filtered =useMemo(()=>meals.filter(m=>{
    return m.strMeal.toLowerCase().includes(query.toLowerCase())
  }), [query]);
  
  const totalPages = Math.ceil(filtered.length / itemsPerPage);


  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [page, filtered]);


  const prev = () => { setPage(p => Math.max(1, p - 1)) };
  const next = () => { setPage(p => Math.min(totalPages, p + 1)) }
  //p has current page value

  return (
    <div>

      <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setPage(1)
          }}
          placeholder="Search meals..."
          className="p-2 sm:w-72 rounded-md border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <ul className='grid md: grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
        {current.map(meal => <li key={meal.idMeal} className='shadow-md p-3 bg-green-100'>
          <img className='w-full' src={meal.strMealThumb} alt={meal.strMeal} />
          <Link className='text-green-800' href={`/meal/${meal.idMeal}`}>{meal.strMeal}</Link>
        </li>)}
      </ul>

      <div className="mt-10 text-center">
        <button
          onClick={prev}
          disabled={page === 1}
          className="p-4 bg-green-300 text-green-900 rounded disabled:opacity-50">
          Prev
        </button>

        <div className="inline-flex space-x-2 mx-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`p-4 text-sm font-medium ${num === page
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-850 hover:bg-green-200'
                }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={page === totalPages}
          className="p-4  bg-green-300 text-green-900 rounded disabled:opacity-50">
          Next
        </button>
      </div>

    </div>
  );
}


//useMemo prevent unnecessary recalculations every render
//(for  filtering, sorting, pagination)