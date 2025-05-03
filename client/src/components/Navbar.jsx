import React, { useEffect } from "react";
import { School, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { DropdownMenuLabel } from "./ui/dropdown-menu";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import { DropdownMenuGroup } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/pages/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
export default function Navbar() {
  // this should be replaced with the actual user role from your auth context or state management
  const {user} = useSelector(store => store.auth);
  const[logoutUser , {data,isSuccess}] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };
  
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className="h-16 dark:bg-[#050505] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50 ">
      {/* Desktop */}
      <div className=" items-center justify-between h-full px-4 md:px-10 max-w-7xl mx-auto hidden md:flex gap-10">
        <div className="flex items-center gap-2">
          <School size={"30"} />
         <Link to={"/"} className="text-2xl font-normal front-extra">
          <h1 className="hidden md:block front-extra text-2xl font-normal">
            E-Learning
          </h1>
         </Link>
        </div>
        {/* user icons and dark mode icon */}
        <div className="flex items-center gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem> <Link to={"/my-learning"}>My Learning</Link> </DropdownMenuItem>
                  <DropdownMenuItem><Link to={"/Profile"}>Edit Profile</Link> </DropdownMenuItem>
                  <DropdownMenuItem><Link to={"/Profile"}>Certificate</Link> </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to={"/admin/dashboard"}>Dashboard</Link></DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to={"/"}>Home</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-white  " onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}

          <DarkMode />
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between h-full px-4 md:px-10 max-w-7xl mx-auto">
        <h1 className=" front-extra text-2xl font-normal">E-learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
}

const MobileNavbar = () => {
  const role = "instructor"; 
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 "
          variant="outline "
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-4 w-[300px] bg-white dark:bg-[#0A0A0A] border dark:border-gray-800 border-gray-200 shadow-lg rounded-lg ">
        <SheetHeader className="flex flex-row items- justify-between mt-2">
          <SheetTitle>E-Learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <span>My Learning</span>
          <span>Edit Profile</span>
          <span>Log out</span>
        </nav>
        {
          role == "instructor" && (
          // <SheetFooter>
          //   <SheetClose asChild>
          //     <Button type="submit" onClick={()=> navigate("/admin/dashboard")}>Dashboard</Button>
          //   </SheetClose>
          // </SheetFooter>
          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>

  
  );
};
