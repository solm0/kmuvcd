// import { PostProps } from "@/app/lib/types";

// export default function ThisyearFilter({data}: {data: PostProps[]}) {

//   export function thisyearFilter(data: PostProps[]) {
//     let thisyearFiltered;
    
//     const thisyear = new Date().getFullYear();
  
//     console.log(data[0].publishedAt?.slice(0,4), thisyear.toString(), data[0].publishedAt?.slice(0,4) === thisyear.toString())
  
//     thisyearFiltered = data.filter((entry) => {
//       return entry.publishedAt?.slice(0,4) === thisyear.toString();
//     })
  
//     console.log(thisyearFiltered)
  
//     return thisyearFiltered;
//   }
  
//   // TODO: 작성일? 기간?

//   return (
//     <label
//       htmlFor="thisyear"
//       className="text-gray-800 flex items-center gap-2 cursor-pointer"
//     >
//       <input
//         id="thisyear"
//         type="checkbox"
//         checked={param}
//         defaultChecked="true"
//         onChange={handleFilter}
//       />
//       내 북마크만 보기
//     </label>
//   )
// }


// TODO: 이것도 쿼리에 넣을것. 페이지네이션으로.