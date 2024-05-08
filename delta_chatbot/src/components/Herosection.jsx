import React, { useState } from 'react'
import background_video from "../assets/background_video.mp4"
import "../App.css"

export default function Herosection(props) {

    return (
        <div className=''>
            
            <div className=' flex'>
                <video src={background_video}
                    autoPlay="{true}" loop muted
                    className="video  ">
                </video>
            </div>

            <div className="text-white h-[100vh] flex px-[27px]  md:px-[50px] pb-[100px] pt-[170px] justify-center items-center">
                <div className=" text-center ">
                    <div className=" overflow-hidden w-[100%]">
                        <h1 className=' bottom-to-top font-["GoogleRegular"] px-[0] md:px-[20px] flex md:text-[107px] text-[50px] flex-wrap justify-center items-baseline '>
                            <span className=' -tracking-[2px] '>Explore with</span>
                            <span className="pl-[13px]">
                                <svg className=' -z-[1] relative rotate-animation md:h-[33px] h-[20px] m-auto md:-mb-[20px] -mb-[5px] md:ml-[130px] ml-[61px] text-[100px]' viewBox="0 0 32 33" fill="none">
                                    <path d="M2.45966 8.54481C3.73143 0.952587 12.7451 -2.41582 18.6843 2.48168L28.0805 10.2299C34.0197 15.1274 32.43 24.6177 25.219 27.3124L13.8108 31.5756C6.59982 34.2704 -0.82415 28.1485 0.44762 20.5563L2.45966 8.54481Z" fill="url(#paint0_linear_127_3338)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_127_3338" x1="5.32114" y1="-8.53769" x2="24.2461" y2="42.1046" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.04" stopColor="#FFB800" />
                                            <stop offset="0.155" stopColor="#E01E93" />
                                            <stop offset="0.539" stopColor="#7A4AC1" />
                                            <stop offset="1" stopColor="#007EF8" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span className='-tracking-[2px] flex pb-[10px] text-transparent bg-clip-text md:text-[107px] text-[50px] back font-[GoogleMedium] pl-[2px] '> Delta</span>
                            </span>
                        </h1>
                    </div>
                    <div className=" bg-black mb-[70px] bottom-to-top text-[15px] md:text-[20px] text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-500">Experience GDSC like never before with our revolutionary AI interface.</div>
                    <div className="  fade-in mt-10 flex justify-center gap-y-[15px] gap-x-[15px] flex-wrap ">

                        {
                            props.state ?
                                <button type="" onClick={() => props.login()} className='hover:bg-[#4084c8] bg-[#0080FC] md:w-[220px] h-[45px] w-[200px] md:h-[60px] rounded-full text-[18px] font-["GoogleMedium"] '>Get Started</button>
                                :
                                <button type="" onClick={() => props.handleLocation2()} className='hover:bg-[#4084c8] bg-[#0080FC] md:w-[220px] h-[45px] w-[200px] md:h-[60px] rounded-full text-[18px] font-["GoogleMedium"] '>Go to Chat</button>
                        }

                        <a href="https://gdsc.adidevagovinda.live/" target='blank'>
                            <button type="" className=' hover:bg-[#171717] bg-transparent border-[0.1px] border-[#626879] w-[200px] md:w-[220px] h-[50px] md:h-[60px] rounded-full text-[18px] font-["GoogleMedium"] '>Visit Website</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

