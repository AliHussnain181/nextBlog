"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { UserType } from "@/Types";
import useAuthStore from "@/stores/authStore";

// Zod Schema for validation
const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .nonempty("Password is required."),
});

const Login: React.FC = () => {
  const router = useRouter();

  // State variables
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const fetchUser = useAuthStore((state) => state.fetchUser);

  // Validate Inputs with Zod and return errors
  const validateInputs = (): boolean => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errorMessages: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") {
          errorMessages.email = err.message;
        }
        if (err.path[0] === "password") {
          errorMessages.password = err.message;
        }
      });
      setErrors(errorMessages); // Set errors in state
      return false;
    }

    setErrors({}); // Clear errors if validation is successful
    return true;
  };

  // Handle Login
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies if required
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed. Please try again.");
        return;
      }
      await fetchUser()
      toast.success("Login successful!");
      router.push("/"); // Redirect to home or dashboard
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#0C312A] text-white font-Roboto">
      <form
        onSubmit={loginHandler}
        className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-slate-800 rounded-md shadow-md"
        aria-label="Login Form"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Login to Your Account</h1>

        <div className="flex flex-col w-full gap-4">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-slate-700 h-12 px-3 rounded-md outline-none focus:ring-2 focus:ring-sky-500"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            aria-required="true"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}

          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-slate-700 h-12 px-3 rounded-md outline-none focus:ring-2 focus:ring-sky-500"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            aria-required="true"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full h-12 my-4 rounded-md text-sm text-white transition duration-300 ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:scale-105"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loader"></span> Logging In...
            </div>
          ) : (
            "Login to Your Account"
          )}
        </button>

        <div className="flex justify-center text-xs text-gray-400">
          <p>Not a member yet?</p>
          <Link href="/register" className="ml-1 text-white underline">
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
