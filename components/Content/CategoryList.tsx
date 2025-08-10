'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type Props = {
  categories: Category[];
  };

export function CategoryList({ categories }: Props) {

const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
return(
 <div>
  

        <ul className='grid md: grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
        {categories.map(item=> <li key ={item.idCategory} className='shadow-md p-3 bg-green-100'>
          <Image
            className="w-full"
            src={item.strCategoryThumb}
            alt={item.strCategoryDescription}
            width={500}
            height={300}
          />
          <h4 className='text-green-800 font-bold text-2xl'>{item.strCategory}</h4>
          <p className='text-green-500'>{
              item.strCategoryDescription.length > 200 ? <>
              {item.strCategoryDescription.slice(0,200)}
              <button className='cursor-pointer text-green-900'
              onClick={()=>setSelectedCategory(item)}
              >
                ...Read More</button>
              </>:
              item.strCategoryDescription
           }
        </p>
          <Link className='text-green-800 font-bold' href={`/category/${item.strCategory}`}>  View detail...</Link>
        </li>)
        }

      </ul>

      {selectedCategory &&

      <div 
      className='fixed shadow-md shadow-gray-400  text-black bg-white/90 w-[40%] min-h-[50vh] rounded left-1/2 top-1/4 -translate-x-1/2 p-4 pt-7'>
        <button 
        className='absolute top-2 right-5 text-4xl cursor-pointer'
        onClick={()=> setSelectedCategory(null)}>x</button>
        <Image
        
          src={selectedCategory.strCategoryThumb}
          alt={selectedCategory.strCategory}
          width={200}           
          height={200}
          className="rounded bg-gray-200"
        />
        <h4 className='text-2xl font-bold mt-4'>{selectedCategory.strCategory}</h4>
        <p>{selectedCategory.strCategoryDescription}</p>

      </div>
      }



 </div>
)
}
