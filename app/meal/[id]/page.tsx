//
import React from "react";
import { Meal } from "@/components/Content/Meal";

type Meal = {
    idMeal: string,
    strMeal: string,
    strMealThumb: string,
    strArea: string,
    strCategory: string,
    strInstructions: string,
    strTags: string,
    strYoutube: string,
    [key: string]: string;
};

type Params = {
    params: Promise<{ id: string }>;
};

type idResponse = {
    meals: Meal[];
};

export default async function MealPage({ params }: Params) {
    const { id } = await params;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
        next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error(`Failed to fetch by id ${id}`);
    const data: idResponse = await res.json();

    if (!data.meals || data.meals.length === 0) {
        return <p>No meal found with ID {id}</p>;
    }

    const meal = data.meals[0];

   

    return (
        <div className="MealPage w-full p-6 lg:px-12  bg-green-100">
            <h1 className="text-center text-4xl text-green-950 font-bold mb-10">{meal.strMeal}</h1>
            <Meal meal = {meal}/>
           
        </div>
    );
}
