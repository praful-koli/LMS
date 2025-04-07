import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const isLoading = false;
  const enrolledCourses = [1];
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-medium text-2xl text-center md:text-left">
        {" "}
        Profile
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 md:h-31 md:w-31 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <div className="mb-2">
            <h1 className="text-lg font-semibold text-gray-900 dar:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300  ml-2">
                {" "}
                jack Dev
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className=" text-lg font-semibold text-gray-900 dar:text-gray-100">
              gmail:
              <span className="font-normal text-gray-700 dark:text-gray-300  ml-2">
                {" "}
                jack@gmail
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className=" text-lg font-semibold text-gray-900 dar:text-gray-100">
              role:
              <span className="font-normal text-gray-700 dark:text-gray-300  ml-2">
                {" "}
                Instrutor
              </span>
            </h1>
          </div>

          {/* button edit  dialog open */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2 ">
                {" "}
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="col-span-3"
                  ></Input>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile image</Label>
                  <Input
                    type="file"
                    accept="iamge/*"
                    className="col-span-3"
                  ></Input>
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save changes"
                  )}
                  {/* {isLoading ? (
                    <ProfileSkeleton />
                  ) : (
                    enrolledCourses.map((course, index) => (
                      <Course key={index} />
                    ))
                  )} */}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* course enrolled */}
      <div className="">
        <h1 className="font-medium text-lg"> Course Enrolled</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-5">
          {enrolledCourses.length == 0 ? (
            <h1>You Haven't enrolled yet</h1>
          ) : (
            enrolledCourses.map((course, index) => <Course key={index} />)
          )}
        </div>
      </div>
    </div>
  );
}

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <Skeleton className="h-6 w-32 mb-6" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <Skeleton className="w-24 h-24 rounded-full" />

        <div className="flex-1 space-y-4 w-full">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <div className="mt-10">
        <Skeleton className="h-6 w-48 mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow"
            >
              <Skeleton className="w-full h-36 mb-4" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
