import React from "react";
import PaginatedMeals from "../../../components/PaginatedMeals";

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

    const {category} = await params;
    const res = await fetch (`https:www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, {next:{revalidate:60}});

    if(!res.ok)throw new Error(`failed to fetch category ${category}`);
    const data : MealResponse = await res.json();

    return(
        <div className="CategoryPage container mx-auto p-3">
            <h1 className="text-center text-4xl text-green-900 mt-8" >Meals in {category}</h1>
            {
                data.meals ? <PaginatedMeals meals={data.meals} /> :
                <p className="text-center text-2xl text-gray-500">No meals found in {category}</p>
            }
        </div>
    )
}