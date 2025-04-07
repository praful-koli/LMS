import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function Course() {
  return (
    <Card className="w-full max-w-[300px] mx-auto overflow-hidden rounded-2xl dark:bg-gray-800 bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">

    <div className="relative">
      <img
        className="w-full h-44 object-cover rounded-t-2xl"
        src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
        alt="next"
      />
    </div>
  
    <CardContent>
      <h1 className="hover:underline font-medium text-base truncate">
        Nest js Complete Course 2025
      </h1>
  
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 mt-1">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-sm">jack</h1>
        </div>
        <Badge className="bg-green-500 text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
          Advance
        </Badge>
      </div>
  
      <div className="mt-2 text-sm font-semibold flex items-center justify-between">
        ₹ 5000
      </div>
    </CardContent>
  </Card>
  
  );
}
