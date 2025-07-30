// import Link from 'next/link';

// type Category = {
//   idCategory :string;
//   strCategory:string;
//   strCategoryThumb:string;
//   strCategoryDescription:string;
// };

// //backic galuya categorianeri zangvats
// type CategoryResponse = { 
//   categories: Category[]
// };

// export default async function Home() {

//   const res = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`, {next: {revalidate:60} });
//   //revalidate 60 ete noric sxmi apa cashavori u tur indz patasxan@
//   if(!res.ok) throw new Error ('Failed to fetch')

//   const data:CategoryResponse = await res.json();
//   //res.json qashuma tvyalner@ et pahin


//   return (
//     <div className="HomePage container mx-auto mb-3">
//       <h1 className='text-center text-3xl text-green-900 font-bold italic p-4 mt-10 '>Meal Categories</h1>
//       <ul className='grid md: grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
//         {data.categories.map(item=> <li key ={item.idCategory} className='shadow-md p-3 bg-green-100'>
//           <img className='w-full' src = {item.strCategoryThumb} alt = {item.strCategoryDescription} />
//           <h4 className='text-green-800 font-bold text-2xl'>{item.strCategory}</h4>
//           <p className='text-green-500'>{
//               item.strCategoryDescription.length > 200 ? <>
//               {item.strCategoryDescription.slice(0,200)}
//               <button className='cursor-pointer'>...</button>
//               </>:
//               item.strCategoryDescription
//            }
//         </p>
//           <Link className='text-green-800 font-bold' href={`/category/${item.strCategory}`}>  View detail...</Link>
//         </li>)
//         }
//       </ul>
//     </div>
//   );
// }





import { CategoryList } from '@/components/CategoryList';

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type CategoryResponse = {
  categories: Category[];
};

export default async function Home() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php',
    { next: { revalidate: 60 } });

  if (!res.ok) throw new Error('Failed to fetch');
  const data: CategoryResponse = await res.json();

  return (
    <div className="HomePage container mx-auto mb-3">
      <h1 className="text-center text-3xl text-green-900 font-bold italic p-4 mt-10">
        Meal Categories
      </h1>

      <CategoryList categories={data.categories} />
    </div>
  );
}

