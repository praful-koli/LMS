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

import React, { useEffect, useState } from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

export default function Profile() {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading ,refetch } = useLoadUserQuery();

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error,
      isSuccess,
      isError,
    },
  ] = useUpdateUserMutation();

  // 🔒 Prevent error by using optional chaining
  const user = data?.user;

  useEffect(() => {
    if (isSuccess) {
      toast.success(updateUserData?.message || "Profile updated.");
      refetch();
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
    if (!user && !isLoading) {
      toast.error("Failed to load user data.");
    }
  }, [error, updateUserData, isSuccess, isError]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
    console.log(name, profilePhoto);
  };
  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-center mt-24">
        <h1 className="text-2xl font-semibold text-red-500">
          Failed to load user data.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-medium text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 md:h-31 md:w-31 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt={user.name || "@user"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Gmail:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Image</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Course Enrolled Section */}
      <div>
        <h1 className="font-medium text-lg">Courses Enrolled</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled in any courses yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
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
