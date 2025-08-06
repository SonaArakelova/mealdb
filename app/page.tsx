
import { CategoryList } from '@/components/CategoryList';

type Category = {
  idCategory :string;
  strCategory:string;
  strCategoryThumb:string;
  strCategoryDescription:string;
};

//backic galuya categorianeri zangvats
type CategoryResponse = { 
  categories: Category[]
};

export default async function Home() {


  const res = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`, {next: {revalidate:60} });
  //revalidate 60 ete noric sxmi apa cashavori u tur indz patasxan@
  if(!res.ok) throw new Error ('Failed to fetch')

  const data:CategoryResponse = await res.json();
  //res.json qashuma tvyalner@ et pahin


  return (
    <div className="HomePage container mx-auto mb-3">
      <h1 className='text-center text-3xl text-green-900 font-bold italic p-4 mt-10 '>Meal Categories</h1>

      <CategoryList categories={data.categories}/>
    </div>
  );
}












// import { CategoryList } from '@/components/CategoryList';

// type Category = {
//   idCategory: string;
//   strCategory: string;
//   strCategoryThumb: string;
//   strCategoryDescription: string;
// };

// type CategoryResponse = {
//   categories: Category[];
// };

// export default async function Home() {
//   const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php',
//     { next: { revalidate: 60 } });

//   if (!res.ok) throw new Error('Failed to fetch');
//   const data: CategoryResponse = await res.json();

//   return (
//     <div className="HomePage container mx-auto mb-3">
//       <h1 className="text-center text-3xl text-green-900 font-bold italic p-4 mt-10">
//         Meal Categories
//       </h1>

//       <CategoryList categories={data.categories} />
//     </div>
//   );
// }

