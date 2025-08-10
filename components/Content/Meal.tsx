'use client'
import Image from "next/image"

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



type Props ={
    meal: Meal;
}


export  function Meal({meal} :Props) {


     const ingredients: { ingredient: string, measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const mea = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== '') {
            ingredients.push({ ingredient: ing, measure: mea });
        }
    }
  return (



    <div>
         <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/2">
                             <Image
                                className="w-full rounded shadow-md"
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                width={450}
                                height={150}
                                />
                            <iframe
                                className="w-full aspect-video mt-6 rounded"
                                src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
                                allowFullScreen
                            ></iframe>
        
                            <a href={meal.strYoutube} target="_blank" className="block mt-2 text-red-600 underline">
                                Watch on YouTube
                            </a>
                        </div>
        
                        <div className="lg:w-1/2">
                            <div className="mb-6">
                                <h2 className="text-green-950 font-bold text-2xl mb-2">Instructions:</h2>
                                <p className="text-green-800 whitespace-pre-line">{meal.strInstructions}</p>
                            </div>
        
                            <div className="mb-6">
                                <h2 className="text-green-950 font-bold text-2xl mb-2">Ingredients:</h2>
                                <ul className="list-disc list-inside  text-green-800">
                                    {ingredients.map((item, index) => (
                                        <li key={index}>
                                            {item.ingredient} - {item.measure}
                                        </li>
                                    ))}
                                </ul>
                            </div>
        
                            <p className="text-green-800 mb-1">
                                <span className="font-bold text-green-950">Category:</span> {meal.strCategory}
                            </p>
                            <p className="text-green-800 mb-1">
                                <span className="font-bold text-green-950">Tags:</span> {meal.strTags || "No tags available"}
                            </p>
                            <p className="text-green-800">
                                <span className="font-bold text-green-950">Area:</span> {meal.strArea}
                            </p>
                        </div>
                    </div>

    </div>
  )
}
