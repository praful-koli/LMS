import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "./HeroSection";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery:query,
    categories:selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  }
 // search bar handler
  const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
  
    const searchHandler = (e) => {
      e.preventDefault();
      if (searchQuery.trim() !== "") {
        navigate(`/course/search?query=${searchQuery}`);
      }
      setSearchQuery("");
    };

    // search bar handler end
  return (
    
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-15">
         {/* search bar */}
      <form
          onSubmit={searchHandler}
          className="flex max-w-xl mx-auto mb-6 dark:bg-gray-800 rounded-full overflow-hidden shadow-lg"
        >
          <input
            placeholder="Search for courses, instructors, or topics..."
            className="flex-grow bg-white border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-l-full shadow-lg overflow-hidden max-w-xl"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
          >
            Search
          </button>
        </form>
        <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => navigate("/course/search?query=")}
          className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"

        >
          Explore Courses
        </button>
        </div>
        {/* search bar  end*/}



      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">result for "{query}"</h1>
        <p>
          Showing results for{""}
          <span className="text-blue-800 font-bold italic">{query}</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange}/>
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound/>
          ) : (
            data?.courses?.map((course) => <SearchResult key={course._id} course={course}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
};
