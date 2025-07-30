'use client'

import {
    createContext,
    useState,
    useContext,
    useEffect
} from "react";


type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

type SearchContextType = {
    query: string;
    setQuery: (q: string) => void;
    meals: Meal[];
    isLoading: boolean;
}


const SearchContext = createContext<SearchContextType>({
    query: '',
    setQuery: () => { },
    meals: [],
    isLoading: false,
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState(false);



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




    return (
        <SearchContext.Provider value={{ query, setQuery, meals, isLoading }}>
            {children}
        </SearchContext.Provider>

        //apahovum enq es popoxakanner@ es bolor componenti mej erevan {children}
    )

}


export const useSearch = () => useContext(SearchContext)
//usecontextov vercrel enq searchcontexti popoxakanner@