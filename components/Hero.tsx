import Link from 'next/link'
import React from 'react'

type Props = {}

const Hero = (props: Props) => {
    return (
        <>
            <div className='h-[100vh] bg-cover bg-center bg-no-repeat bg-[#0C312A] text-white bg-[url(/main.jpg)] bg-blend-hard-light   flex flex-col justify-center items-center'>
                <div className=' w-[98%] sm:w-[70%] md:w-[33rem] lg:w-[44rem] xl:w-[62%] text-center font-Sf space-y-9 '>
                    <p className='text-4xl lg:text-5xl xl:text-6xl'>Where thoughtful strategy meets beautiful branding, incredible engineering and visionary campaigns</p>
                    <button className='border-green-500 border-[3px] my-28 text-2xl py-3 px-9 rounded-full font-Outfit hover:bg-green-500 hover:text-white transition-all duration-300'>
                        <Link href="">Tell me more</Link></button>
                </div>
            </div>
        </>
    )
}

export default Hero



