import React from 'react'
import "../App.css"
import "./navbar.css"
import background_gradient from "../assets/gradient-vertex.png"
export default function Version() {

  return (
    <div>
      <div className='h-[550px] w-full flex justify-center'>
        <div
          className=' py-[64px] md:py-[88px] px-[5px] md:px-[24px] aspect-auto background-image text-white w-[90%] min-h-[450px]  rounded-[35px] h-fit font-["GoogleMedium"] flex justify-center items-center text-center border-[1px] border-[#0080FC] '>
          <div className=''>
            <h1 className='text-[45px] md:text-[75px] mb-[30px]'>Delta Genesis</h1>
            <p className='text-[16px] font-["GoogleRegular"] md:w-[600px] md:mx-auto mx-[10%] text-[#aeaeae] '>Delta Genesis is the beginning of the Community revolution, it is the first ever chatbot developed for the community, by the community & of the community.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
