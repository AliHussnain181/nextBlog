import Link from 'next/link'
import React from 'react'
import { FiFacebook, FiLinkedin, FiGithub, FiTwitter } from "react-icons/fi"
import { AiOutlineInstagram } from "react-icons/ai"

const Footer = () => {
    return (
        <>
            <div className='bg-[#0C312A] py-11 text-[#37B34A] px-7 space-y-7 lg:flex'>
                <div className='space-y-12'>
                    <div className='pt-5   '>
                        <h2 className='text-6xl font-Sofia leading-5 w-[178px] '>greenhouse <span className='font-Roboto text-[16px] font-thin px-7 tracking-[0.2rem]'>creative</span></h2>
                    </div>
                    <h3 className='text-white text-2xl font-semibold '>Where thoughtful strategy meets beautiful branding, incredible engineering and visionary campaigns.</h3>
                    <div className='flex space-x-4'>
                        <Link className='text-2xl p-3  rounded-full bg-[#154C41]' href=""  ><FiFacebook /></Link>
                        <Link className='text-2xl p-3  rounded-full bg-[#154C41]' href=""  ><FiLinkedin /></Link>
                        <Link className='text-2xl p-3  rounded-full bg-[#154C41]' href=""  ><AiOutlineInstagram /></Link>
                        <Link className='text-2xl p-3  rounded-full bg-[#154C41]' href=""  ><FiGithub /></Link>
                        <Link className='text-2xl p-3  rounded-full bg-[#154C41]' href=""  ><FiTwitter /></Link>
                    </div>
                </div>
                <div className='flex font-Roboto lg:w-[50%]'>
                    <div className='w-[50%] px-2 text-white text-xl space-y-5'>
                        <h2 className='text-[#37B33D] text-2xl font-semibold pb-5'>Get In Touch</h2>
                        <h3>11 Rodeo Rd</h3>
                        <h3>Gregory Hills NSW 2557</h3>
                        <h3>1300 33 1000</h3>
                        <button className='border-green-500 border-[3px] text-lg py-1 px-5 rounded-full font-Outfit hover:bg-green-500 hover:text-white transition-all duration-300'>
                        <Link href="">Email us</Link></button>
                    </div>
                    <div className='w-[50%] px-3 text-white text-xl space-y-5 '>
                        <h3 className='text-[#37B33D] text-2xl font-semibold pb-5'>Quicklinks</h3>
                        <Link href=""  className='flex' rel="noopener noreferrer">Who We Are</Link>
                        <Link href=""  className="flex" rel="noopener noreferrer">Our Work</Link>
                        <Link href=""  className="flex" rel="noopener noreferrer">Tech Support</Link>
                        <Link href=""  className="flex" rel="noopener noreferrer">Contact Us</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer