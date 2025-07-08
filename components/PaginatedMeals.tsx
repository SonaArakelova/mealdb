'use client'

import {useState, useMemo} from "react";


type Meal ={
    strMeal: string;
    strMealThumb:string;
    idMeal: string;
}

type Props ={
    meals: Meal[];
};

export default function PaginatedMeals({meals}: Props){
    const [page,setPage]  = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(meals.length / itemsPerPage )

    const current = useMemo(()=>{
        const start = (page - 1) * itemsPerPage;
        return meals.slice(start, start+ itemsPerPage);
    }, [page]);

    //Im not using the current yet 

    const prev = ()=>{setPage(p=> Math.max(1,p-1))};
    const next = () =>{setPage(p=>Math.min(totalPages, p+1))}
    //p has current page value




return (
      <div className="flex justify-center gap-4 mt-5 ">

        <button
          onClick={prev}
          disabled={page === 1}
          className="p-4 bg-green-300 text-green-900 rounded disabled:opacity-50">
          Prev
        </button>

        <span className="text-green-900 font-bold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={next}
          disabled={page === totalPages}
          className="p-4  bg-green-300 text-green-900 rounded disabled:opacity-50">
          Next
        </button>
      </div>
  );
}


//useMemo prevent unnecessary recalculations every render
//(for  filtering, sorting, pagination)