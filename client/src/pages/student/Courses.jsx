import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";

export default function Courses() {
  const isLoading = false;
  const courses = [1,2,3,4,5,6,7,8]
  return (
    <div className="bg-gray-50 ">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10"> Our Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
            courses.map((course, index) => <Course key={index} />)

          )}
        </div>
      </div>
    </div>
  );
}

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};

{
  /* {
                isLoding ? (
                    <div className='flex justify-center items-center h-96'>
                        <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="3 3 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M12 3a9 9 0 1 0 0 18A9 9 0 1 0 12 3zm0-2a11 11 0 1 1 0 22A11 11 0 1 1 12 1z"/>
                        </svg>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    
                     
                    
                    </div>
                )
              } */
}
