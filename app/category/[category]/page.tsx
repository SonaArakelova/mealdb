import React from "react";
import Link from 'next/link';
import PaginatedMeals from "@/components/paginatedMeals";


type Meal = {
    strMeal:string;
    strMealThumb: string;
    idMeal: string;
}

type MealResponse = {
    meals: Meal[];
};
type Params = {
    params: Promise<{category:string}>
};



export default async function CategoryPage({params}:Params){

    const {category }= await params;
    const res = await fetch (`https:www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, {next:{revalidate:60}});

    if(!res.ok)throw new Error(`failed to fetch category ${category}`);
    const data : MealResponse = await res.json();

    return(
        <div className="CategoryPage container mx-auto p-3">
            <h1 className="text-center text-4xl text-green-950">Meals in {category}</h1>
            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 mb-5">
                {
                    data.meals.map(item =><li key ={item.idMeal} className='shadow-md p-3 bg-green-100'>
                        <img  className='w-full' src = {item.strMealThumb} alt = {item.strMeal} />
                        <Link className= 'text-green-800' href = {`/meal/${item.idMeal}`}>{item.strMeal}</Link>
                    </li>)
                }
            </ul>
            
            
              <PaginatedMeals meals={data.meals} />
        </div>
    )
}