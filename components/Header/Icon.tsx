import React from 'react'
import { FiFacebook, FiLinkedin, FiGithub, FiTwitter } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import Link from "next/link";


const Icon = () => {
  return (
    <>
     <div className="text-white  pt-32 font-Sf text-center w-[80%] mx-auto space-y-9">
              <h1 className="text-3xl xl:text-4xl leading-[3rem]">
                Where thoughtful strategy meets beautiful branding, incredible
                engineering and visionary campaigns.
              </h1>
              <p className="text-2xl">Punjab Pakistan</p>
              <button className="border-green-500 border-[3px] text-xl py-3 px-9 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300">
                <Link href="">Get in touch</Link>
              </button>
              <div className="flex justify-center space-x-4">
                <Link
                  className="text-2xl p-3 border-green-500 border-[3px] rounded-full"
                  href=""
                >
                  <FiFacebook />
                </Link>
                <Link
                  className="text-2xl p-3 border-green-500 border-[3px] rounded-full"
                  href=""
                >
                  <FiLinkedin />
                </Link>
                <Link
                  className="text-2xl p-3 border-green-500 border-[3px] rounded-full"
                  href=""
                >
                  <AiOutlineInstagram />
                </Link>
                <Link
                  className="text-2xl p-3 border-green-500 border-[3px] rounded-full"
                  href=""
                >
                  <FiGithub />
                </Link>
                <Link
                  className="text-2xl p-3 border-green-500 border-[3px] rounded-full"
                  href=""
                >
                  <FiTwitter />
                </Link>
              </div>
            </div>
    </>
  )
}

export default Icon