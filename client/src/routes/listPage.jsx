import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

export default function ListPage() {
  const data = useLoaderData();

  return (
    <div className="flex h-screen pl-4 pt-1 bg-white dark:bg-black">
      <div className="flex-2  w-1/2">
      <Filter />
      <div className="h-[200px] md:h-[440px] bg-white border border-gray-600">
     <Suspense fallback={<p>Loading...</p>}>
       <Await
         resolve={data.postResponse}
         errorElement={<p>Error loading posts!</p>}
       >
         {(postResponse) => <Map items={postResponse.data} />}
       </Await>
     </Suspense>
   </div>
      </div>


      <div className="flex-3 h-screen w-1/2">
      
        <div className="h-[570px] flex flex-col gap-4 overflow-y-auto pb-6">
         
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data && postResponse.data.length > 0 ? (
                  postResponse.data.map((post) => (
                    <Card key={post.id} item={post} />
                  ))
                ) : (
                  <p className="text-center mt-4 text-gray-500">
                    No properties found. Try adjusting your filter criteria.
                  </p>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
