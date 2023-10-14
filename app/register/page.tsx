"use client"
import { Context } from '@/components/context';
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { redirect } from "next/navigation";


interface User {
    _id: string;
  }

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { user, setUser } = useContext(Context);
  
    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
  
        const data = await res.json();
        if (!data.success) return toast.error(data.message);
  
        setUser(data.user as User); // Assuming data.user has _id property
        toast.success(data.message);
  
        setName('');
        setEmail('');
        setPassword('');
      } catch (error) {
        return toast.error((error as Error).message);
      }
    };
  
    if ((user as User)?._id) return redirect("/");
  
    return (
      <div className='w-full h-[100vh] flex justify-center items-center bg-[#0C312A] text-white font-Roboto'>
        <form onSubmit={registerHandler} className='w-[90%] mx-auto flex flex-col justify-center items-center'>
          <p className='font-bold text-2xl mb-10'>Create New Account</p>
          <div className='flex flex-col w-full sm:w-[80%] md:w-[29rem] gap-y-3'>
            <input onChange={(e) => setName(e.target.value)} value={name} required className='bg-slate-700 h-11 outline-0 rounded-md px-3' type="text" name="text" id="text" placeholder='Name' />
            <input onChange={(e) => setEmail(e.target.value)} value={email} required className='bg-slate-700 h-11 outline-0 rounded-md px-3' type="email" name="email" id="email" placeholder='Email' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} required className='bg-slate-700 h-11 outline-0 rounded-md px-3' type="password" name="password" id="password" placeholder='password' />
          </div>
          <button className='w-full sm:w-[80%] md:w-[29rem] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-2 rounded-md text-sm my-4'>Sign Up</button>
          <div className='text-xs flex text-gray-400 gap-x-1'>
            <p>Already have an account?</p>
            <Link className='text-white underline' href="/login">Login</Link>
          </div>
        </form>
      </div>
    );
  };
  
  export default Register;