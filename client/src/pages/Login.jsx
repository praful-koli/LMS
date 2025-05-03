import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegisterUserMutation } from "@/features/api/authApi";
import { useLoginUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  
   const navigate = useNavigate(); 

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log("Sending:", inputData);
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData?.message || "Registration successful!");
    } else if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "Login successful!");
      navigate("/"); // Redirect to home page after successful login
    } else if (registerError) {
      toast.error(registerError?.data?.message || registerError?.error || "Registration failed!");
    } else if (loginError) {
      toast.error(loginError?.data?.message || loginError?.error || "Login failed!");
    }
  
    // Reset input fields after successful registration or login
    if (registerIsSuccess || loginIsSuccess) {
      setSignupInput({ name: "", email: "", password: "" });
      setLoginInput({ email: "", password: "" });
    }
  
    // Reset error messages after a delay
    if (registerError || loginError) {
      setTimeout(() => {
        if (registerError) setSignupInput({ name: "", email: "", password: "" });
        if (loginError) setLoginInput({ email: "", password: "" });
      }, 3000);
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    registerData,
    loginData,
    registerError,
    loginError,
  ]);
  

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 shadow-md ">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Create a new account and click sign up when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
  <div className="space-y-1">
    <Label htmlFor="name">Name</Label>
    <Input
      type="text"
      name="name"
      value={signupInput.name}
      id="name"
      onChange={(e) => changeInputHandler(e, "signup")}
      placeholder="Eg. jay"
      required
    />
  </div>
  <div className="space-y-1">
    <Label htmlFor="username">Email</Label>
    <Input
      type="email"
      name="email"
      value={signupInput.email}
      id="email"
      onChange={(e) => changeInputHandler(e, "signup")}
      placeholder="Eg. jay@gmail.com"
      required
    />
  </div>
  <div className="space-y-1">
    <Label htmlFor="password">Password</Label>
    <Input
      type="password"
      name="password"
      value={signupInput.password}
      id="password"
      onChange={(e) => changeInputHandler(e, "signup")}
      placeholder="Eg. jay@124"
      required
    />
  </div>
  <div className="space-y-1">
    <Label>Role</Label>
    <div className="flex items-center gap-4">
      <Button
        variant={signupInput.role === "student" ? "default" : "outline"}
        onClick={() =>
          setSignupInput((prev) => ({ ...prev, role: "student" }))
        }
      >
        Student
      </Button>
      <Button
        variant={signupInput.role === "instructor" ? "default" : "outline"}
        onClick={() =>
          setSignupInput((prev) => ({ ...prev, role: "instructor" }))
        }
      >
        Instructor
      </Button>
    </div>
  </div>
</CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  id="current"
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. jay@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  id="new"
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. jay@124.com"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
