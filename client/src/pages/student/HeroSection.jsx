import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="mt-0 relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

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

        <button
          type="button"
          onClick={() => navigate("/course/search?query=")}
          className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          Explore Courses
        </button>
      </div>
    </div>
  );
}
