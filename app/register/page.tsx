"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { UserType } from "@/Types";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = useAuthStore((state) => state.fetchUser);

  const router = useRouter();

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      await fetchUser();
      toast.success(data.message);
      router.push("/");
      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#0C312A] text-white font-Roboto">
      <form
        onSubmit={registerHandler}
        className="w-[90%] mx-auto flex flex-col justify-center items-center"
      >
        <h1 className="mb-10 text-2xl font-bold">Create New Account</h1>
        <div className="flex flex-col w-full sm:w-[80%] md:w-[29rem] gap-y-3">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-700 h-11 outline-0 rounded-md px-3"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-700 h-11 outline-0 rounded-md px-3"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-700 h-11 outline-0 rounded-md px-3"
          />
        </div>
        <button
          type="submit"
          disabled={loading} // Disable button while loading
          className={`w-full sm:w-[80%] md:w-[29rem] py-2 rounded-md text-sm my-4 transition-all ${
            loading
              ? "bg-gradient-to-r from-gray-400 to-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="flex text-xs text-gray-400 gap-x-1">
          <h3>Already have an account?</h3>
          <Link className="text-white underline" href="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
