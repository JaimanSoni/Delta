import React from 'react'
import gdsc_logo from "../assets/gdsc-logo.png"
import "../App.css"

function Navbar(props) {
    return (
        <div className=''>
            <div>
                <div className=" fixed w-full h-[40px] flex q justify-between items-center w-100 bg-white p-[25px] pr-[35px]">
                    <div className="flex items-center">
                        <img src={gdsc_logo} className=' w-[50px] sm:w-[50px] mr-[10px]' alt="" />
                        <span className="text-[#525252]  after:content-[attr(after-sm)] text-[14px] sm:after:content-[attr(after-lg)] sm:text-[14px]" after-sm='GDSC - SOU' after-lg='Google Developer Student Club - Silver Oak University' ></span>
                    </div>
                    <div className="flex items-center gap-x-[20px] sm:gap-x-[35px]">

                        {
                            props.state ?
                                <span className="  font-['GoogleRegular'] flex justify-center items-center hover:cursor-pointer" onClick={props.login}>Sign in</span>
                                :
                                <i className="fa-solid fa-right-from-bracket hover:cursor-pointer text-[22px]" onClick={props.logout} ></i>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar



