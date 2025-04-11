import { Outlet, Link } from "react-router-dom";
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";

const Sidebar = () => {
  return (
    
      <div className="flex ">
        {/* Sidebar */}
        {/* <div className="bg-[#f0f0f0] hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:bg-[#141414] dark:text-[#afa9a9] dark:border-gray-700 p-5 sticky top-0 h-screen "> */}
        <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 dark:bg-[#050505]  p-5 sticky top-0  h-screen">
          <div className=" space-y-4 mt-20">
            <Link
              to="dashboard"
              className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded dark:hover:dark:bg-[#131313]" 
            >
              <ChartNoAxesColumn size={22} />
              <h1>Dashboard</h1>
            </Link>
            <Link
              to="course"
              className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded dark:hover:dark:bg-[#101010]"
            >
              <SquareLibrary size={22} />
              <h1>Courses</h1>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1  p-2 md:p-24">
          <Outlet />
        </div>
      </div>
 
  );
};

export default Sidebar;
