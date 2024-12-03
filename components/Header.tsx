"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"
import { FiFacebook, FiLinkedin, FiGithub, FiTwitter } from "react-icons/fi"
import { AiOutlineInstagram } from "react-icons/ai"
import { Context } from './context'

type Props = {}

const Header = (props: Props) => {
    const [menu, setMenu] = useState(false);
    const { user }:any = useContext(Context);


    const menuBar = () => {
        setMenu(!menu);
    };

    return (
        <>
            <div className='bg-[#0C312A] w-[100vw] z-[999] fixed top-0 h-28 text-white flex justify-between items-center px-5 md:px-12  '
            >
                <div className='pt-5 '>
                    <p className='text-5xl font-Sofia leading-5 w-[178px] '>greenhouse <span className='font-Roboto text-[16px] font-thin px-7 tracking-[0.2rem]'>creative</span></p>
                </div>
                {menu ?
                    <div className='text-white text-[25px] border-green-500 border-[3px] rounded-full p-4 sm:p-[14px] sm:px-9 cursor-pointer flex flex-row-reverse gap-x-3 items-center' onClick={menuBar}>
                        <RxCross1 />
                        <p className='hidden sm:block font-bold text-xl font-Roboto'>Close</p>
                    </div>
                    :
                    <div className='text-white text-[25px]  border-green-500 border-[3px] rounded-full p-4 sm:p-[14px] sm:px-9 cursor-pointer flex flex-row-reverse gap-x-3 items-center' onClick={menuBar}>
                        <RxHamburgerMenu />
                        <p className='hidden sm:block font-bold text-xl font-Roboto'>Menu</p>
                    </div>
                }
            </div>
            <div className="block lg:hidden">
                <div onClick={menuBar} className={`h-[100vh] w-full z-[999] bg-[#0C312A] fixed top-[7rem] flex flex-col items-center  text-white text-3xl font-Sf space-y-12 py-16 transition-all duration-500 ${menu ? 'translate-y-0' : '-translate-y-[150vh]'}  `}>
                    <Link href="/">Home</Link>
                    <Link href="/blogs">Blogs</Link>
                    <Link href="#features">features Blogs</Link>
                    {
                        user?._id ?
                            <Link href="/profile">Profile</Link>
                            :
                            <Link href="/login">Login</Link>
                    }
                </div>
            </div>
            <div className='hidden lg:block'>
                <div className={`flex justify-between h-[100vh] w-full z-[9] fixed top-[0] ${menu ? 'translate-y-0' : '-translate-y-[150vh]'}  transition-all duration-500 `}>
                    <div onClick={menuBar} className={`w-[50%] bg-[#0C312A] flex flex-col items-center justify-center text-white text-4xl font-Sf space-y-12 py-44  `}>
                        <Link href="/">Home</Link>
                        <Link href="/blogs">Blogs</Link>
                        <Link href="#features">features Blogs</Link>
                        {
                        user?._id ?
                            <Link href="/profile">Profile</Link>
                            :
                            <Link href="/login">Login</Link>
                    }
                    </div>
                    <div onClick={menuBar} className='w-[50%] flex flex-col justify-center items-center  bg-cover bg-no-repeat bg-[url(/hero.jpg)]' >
                        <div className='text-white  pt-32 font-Sf text-center w-[80%] mx-auto space-y-9'>
                            <p className='text-3xl xl:text-4xl leading-[3rem]'>Where thoughtful strategy meets beautiful branding, incredible engineering and visionary campaigns.</p>
                            <p className='text-2xl'>Punjab Pakistan</p>
                            <button className='border-green-500 border-[3px] text-xl py-3 px-9 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300'>
                                <Link href="" >Get in touch</Link>
                            </button>
                            <div className='flex justify-center space-x-4'>
                                <Link className='text-2xl p-3 border-green-500 border-[3px] rounded-full' href=""  ><FiFacebook /></Link>
                                <Link className='text-2xl p-3 border-green-500 border-[3px] rounded-full' href=""  ><FiLinkedin /></Link>
                                <Link className='text-2xl p-3 border-green-500 border-[3px] rounded-full' href=""  ><AiOutlineInstagram /></Link>
                                <Link className='text-2xl p-3 border-green-500 border-[3px] rounded-full' href=""  ><FiGithub /></Link>
                                <Link className='text-2xl p-3 border-green-500 border-[3px] rounded-full' href=""  ><FiTwitter /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
