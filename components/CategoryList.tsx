'use client';

import { useState } from 'react';
import Link from 'next/link';

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export function CategoryList({ categories }: { categories: Category[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDescription = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      {categories.map((item) => (
        <li key={item.idCategory} className="shadow-md p-3 bg-green-100">
          <img className="w-full rounded mb-3" src={item.strCategoryThumb}alt={item.strCategory}/>
          <h4 className="text-green-800 font-bold text-2xl mb-2">
            {item.strCategory}
          </h4>

          <p className="text-green-500 mb-2">
            {expandedId === item.idCategory
              ? item.strCategoryDescription
              : item.strCategoryDescription.slice(0, 200)}
            {item.strCategoryDescription.length > 200 && (
              <button
                className="ml-2 text-green-800 underline"
                onClick={() => toggleDescription(item.idCategory)}
              >
                {expandedId === item.idCategory ? 'Show less' : 'Read more ...'}
              </button>
            )}
          </p>

          <Link
            className="text-green-800 font-bold underline"
            href={`/category/${item.strCategory}`}
          >
            View detail...
          </Link>
        </li>
      ))}
    </ul>
  );
}
