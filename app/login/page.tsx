"use client";
import { useContext, useState, FormEvent } from "react";
import { Context } from "@/components/context"; // Adjust the import path based on your project structure
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  // Add other properties if needed
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useContext(Context);

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);

      setUser(data.user as User); // Assuming data.user has _id property
      toast.success(data.message);

      setEmail("");
      setPassword("");
    } catch (error: any) {
      return toast.error((error as Error).message);
    }
  };

  if ((user as User)?._id) return redirect("/");

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#0C312A] text-white font-Roboto">
      <form
        onSubmit={loginHandler}
        className="w-[90%] mx-auto flex flex-col justify-center items-center"
      >
        <p className="font-bold text-2xl mb-10">Login to Your Account</p>
        <div className="flex flex-col w-full sm:w-[80%] md:w-[29rem] gap-y-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="bg-slate-700 h-11 outline-0 rounded-md px-3"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="bg-slate-700 h-11 outline-0 rounded-md px-3"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <button className="w-full sm:w-[80%] md:w-[29rem] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-2 rounded-md text-sm my-4">
          Login to Your Account
        </button>
        <div className="text-xs flex text-gray-400 gap-x-1">
          <p>Not a member yet?</p>
          <Link href="/register">
            <p className="text-white underline">Register Now</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
