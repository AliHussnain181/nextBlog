"use client";
import { useContext, useState, FormEvent, useEffect } from "react";
import { Context } from "@/components/context"; // Adjust the import path based on your project structure
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { UserType } from "@/Types";

const Login: React.FC = () => {
  const { user, setUser } = useContext(Context);
  
  // State variables
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user?._id) {
      redirect("/");
    }
  }, [user]);

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }

    setIsLoading(true); // Start loading state

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setUser(data.user as UserType); // Assuming data.user has _id property
      toast.success(data.message);
      
      // Clear the form
      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#0C312A] text-white font-Roboto">
      <form
        onSubmit={loginHandler}
        className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-slate-800 rounded-md shadow-md"
        aria-label="Login Form"
      >
        <h1 className="mb-6 text-2xl font-bold">Login to Your Account</h1>
        <div className="flex flex-col w-full gap-3">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="bg-slate-700 h-12 px-3 rounded-md outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="bg-slate-700 h-12 px-3 rounded-md outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading} // Disable button while loading
          className={`w-full h-12 my-4 rounded-md text-sm text-white transition duration-300 ${isLoading ? 'bg-gray-600' : 'bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:scale-105'}`}
        >
          {isLoading ? "Logging In..." : "Login to Your Account"}
        </button>
        <div className="flex text-xs text-gray-400">
          <p>Not a member yet?</p>
          <Link href="/register" className="ml-1 text-white underline">Register Now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
