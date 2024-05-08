import React, { useState, useEffect, useRef } from 'react'
import { Link, json } from 'react-router-dom'
import delta from "../assets/delta.svg"
import "../App.css"
import axios from 'axios'
import { Switch } from '@headlessui/react'
import Typewrite from '../components/Typewrite'
import logo from "../assets/gdsc-logo.png"
import img1 from "../assets/1.svg"
import img2 from "../assets/2.svg"
import img3 from "../assets/3.svg"
import img4 from "../assets/4.svg"

export default function Chatpage(props) {

  // This hook is used to track the count
  const [count, setCount] = useState(localStorage.length + 1)

  // This hook is used the set the loading while the response is being generated
  const [load, setLoading] = useState(false)

  // This hook is used to open and close the account popup on the top-right of chatpage
  const [popup, popupState] = useState(false)

  // This hook set the data that is being fetched from the API
  const [data, setData] = useState(null)

  // This hook set the value of prompt(question) that the user passes
  const [textValue, setValue] = useState("")

  // This hook sets the length of chat
  const [storage, setStorage] = useState(0)

  // This hook is used to keep scrolled at the bottom of the chatpage
  const ref = useRef(null)

  // let question = ""
  useEffect(() => {
    if (localStorage.getItem('chat')) {
      setStorage(localStorage.getItem('chat').length)
      console.log(storage)
    }
    try {
      if (localStorage.getItem('state') === 'true') {
        props.setState(true)
      } else {
        localStorage.removeItem('state')
        localStorage.setItem('state', 'false')
        props.setState(false)
      }
    } catch (e) {
      localStorage.setItem('state', 'false')
      props.setState(false)
    }

    if (localStorage.getItem('onHome')) {

      if (localStorage.getItem('onHome') === 'true') {
        props.setLocation(true)
      } else {
        console.log("called")
        localStorage.removeItem('onHome')
        localStorage.setItem('onHome', 'false')
        props.setLocation(false)
      }
    } else {
      localStorage.removeItem('onHome')
      localStorage.setItem('onHome', 'true')
      props.setLocation(true)
    }
    try {

      if (localStorage.getItem('light') === 'true') {
        props.setTheme(true)
        props.setEnabled(true)
      } else {
        localStorage.removeItem('light')
        localStorage.setItem('light', 'false')
        props.setTheme(false)
        props.setEnabled(false)
      }
    } catch (e) {
      localStorage.setItem('light', 'false')
      props.setEnabled(false)
      props.setTheme(false)
    }
    // JSON.parse(localStorage.getItem('chat')).length
  }, []);

  // This is the function to change the state of popup on the top-right of chatpage
  const handlePopUp = () => {
    if (popup) {
      popupState(false)
    } else {
      popupState(true)
    }
  }

  // This function takes chat data from local storage and stores it in the array is HTML tags and then returns the array which we will be using to render the messages.
  const renderStorage = () => {

    const storageItems = []

    let items = null
    items = localStorage.getItem('chat')
    items = JSON.parse(items)

    for (let i = 0; i < items.length; i++) {
      if (i == items.length - 1) {
        storageItems.push(
          <div className='flex flex-col gap-y-[25px] h-fit  w-[90%]  md:w-[75%]'>
            <div className={`pl-[10px] pr-[30px] rounded-[10px] ${props.isLight ? 'question-light' : 'question-dark'} gap-x-[20px] min-h-[50px] max-w-[90%] py-[10px] h-fit w-fit flex items-center `}>
              <p className={`w-[20px] h-[20px] md:w-[25px] md:h-[25px] ${props.isLight ? 'nav-icon-dark' : 'nav-icon-light'} flex mb-[2px]  justify-center items-center rounded-[50%]`}> <img className='rounded-[50%]' src={localStorage.getItem('user_image')} alt="" /> </p>
              <p className='font-[GoogleBold] text-[17px] leading-[27px] text-wrap max-w-[85%]' >
                {
                  items[i][0]
                }
              </p>
            </div>
            <div className='flex mb-[25px] items-start w-[100%] gap-x-[20px]'>
              <img className='rotate-animation sm:mr-[9px] w-[19px] md:w-[23px] ml-[10px] ' src={delta} alt="" />
              <div className={`${props.isLight ? 'response-light' : 'response-dark'} flex flex-col gap-y-[15px]`}>
                {load ?
                  <p>Generating...</p>
                  :
                  <p className="font-[GoogleMedium] text-[17px] text-wrap leading-[27px]" >
                    {/* {items[i][1]} */}
                    <Typewrite text={items[i][1]} delay={27} />
                    {/* <span className='inline-block h-fit '><i class="fa-solid fa-shuttle-space"></i></span> */}
                  </p>
                }
                <div>
                  <i className=" ml-[5px] fa-regular fa-clipboard cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        storageItems.push(
          <div className='flex flex-col gap-y-[25px] h-fit  w-[90%]  md:w-[75%]'>
            <div className={` pl-[10px] pr-[30px] rounded-[10px] ${props.isLight ? 'question-light' : 'question-dark'} gap-x-[20px] min-h-[30px] max-w-[90%] py-[10px] h-fit w-fit flex items-center`} >
              <p className={`w-[20px] h-[20px] md:w-[25px] md:h-[25px] ${props.isLight ? 'nav-icon-dark' : 'nav-icon-light'} flex mb-[2px] justify-center items-center rounded-[50%]`}><img className='rounded-[50%]' src={localStorage.getItem('user_image')} alt="" />  </p>
              <p className='font-[GoogleBold]  text-[17px] leading-[27px] text-wrap h-fit max-w-[85%]' >
                {
                  items[i][0]
                }
              </p>
            </div>
            <div className='flex mb-[25px] items-start  w-[100%] gap-x-[20px]'>
              <img className='sm:mr-[9px] w-[19px] md:w-[23px] ml-[10px] ' src={delta} alt="" />
              <div className={` ${props.isLight ? 'response-light' : 'response-dark'} flex flex-col gap-y-[15px]`}>
                <p className="font-[GoogleMedium] text-[15px] sm:text-[17px] leading-[26px] sm:leading-[27px] ">
                  {items[i][1]}
                </p>
                <div>
                  <i className=" ml-[5px] fa-regular fa-clipboard cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
    return storageItems
  }

  // This fuction makes an API call to the Backend and then stores the question and resoponse to the local storage in the form of nested list(Fromat of list: "Chat": [[Question, Answer], [Question, Answer], []...])
  const fetchData = async (question) => {
    try {
      setLoading(true)
      setCount(count + 1)

      if (!localStorage.getItem('chat')) {
        localStorage.setItem('chat', JSON.stringify([]))
      }

      let temp = null
      let data_new = [question, ""]
      temp = localStorage.getItem('chat')
      temp = JSON.parse(temp)
      temp.push(data_new)
      localStorage.setItem('chat', JSON.stringify(temp))

      setValue("")
      question = textValue
      setStorage(localStorage.getItem('chat').length)


      // this is the API call to the backend
      const response = await axios.post(`https://rohanshaw-deltav2.hf.space/chat/v1/?q=${question}`);

      if (response) {
        // here we store the data in the local storage in the above said format
        setData(response.data.answer);
        data_new = [question, response.data.answer]
        temp = localStorage.getItem('chat')
        temp = JSON.parse(temp)
        temp.pop()
        temp.push(data_new)
        localStorage.setItem('chat', JSON.stringify(temp))
        setCount(count + 1)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  };

  // This function is called when user hit enter or presses the send button after typing the prompt. Then this function calls the fetchData function.
  const goToFetch = (e) => {
    if (textValue === "" || textValue.replaceAll(" ", "").length == 0) {
      alert("enter some text")
    }
    else {
      fetchData(textValue)
    }
  }

  // This function is used to clear the chat data
  const clearStorage = () => {
    // console.log("called")
    localStorage.removeItem('chat')
    localStorage.setItem('chat', JSON.stringify([]))
    // props.setLocation(true)
    setStorage(localStorage.getItem('chat').length)
    localStorage.setItem('state', false)
    localStorage.setItem('onHome', false)
    if (props.isLight) {
      localStorage.setItem('light', true)
    } else {
      localStorage.setItem('light', false)
    }

  }


  return (

    <div className={` ${props.isLight ? 'chat-background-light' : 'chat-background-dark'}  flex min-h-[100vh] h-fit `}>

      {/* sidebar starts  */}
      <div className={` ${props.isLight ? 'sidebar-light' : 'sidebar-dark'} h-[100vh] w-[50px] sm:w-[75px] hidden sm:flex flex-col justify-between px-[14px] sm:px-[26px] py-[15px] text-nowrap overflow-hidden`}>
        <div className=''>
          <a href="">
            <i className="fa-solid fa-square-plus mt-[5px] text-[21px] cursor-pointer" onClick={clearStorage} ></i>
          </a>
        </div>
        <div className=''>
          <i className="fa-solid fa-house text-[20px] mb-[15px] hover:cursor-pointer" onClick={props.handleLocation}></i>
          <br />
          <i className="w-[15px] fa-solid fa-right-from-bracket text-[20px] hover:cursor-pointer " onClick={props.logout}></i>
        </div>
      </div>
      {/* sidebar ends */}

      <div className={` ml-[0px] sm:ml-[0px] md:ml-[0px] w-[100%] sm:w-[93%] pl-[10px] md:px-[10px] pb-[25px] ${props.isLight ? 'chat-background-light' : 'chat-background-dark'} h-[99vh] justify-between flex flex-col gap-y-[20px] `} >

        {/* navbar starts */}
        <div className=' h-[40px] py-[30px] flex text-white justify-between items-center pr-[15px] md:px-[25px] '>
          <div className='flex items-center gap-x-[10px]'>
            <img className=' sm:mr-[9px] w-[19px] md:w-[23px] ' src={delta} alt="" />
            <p className=' text-[23px] md:text-[27px] text-[#7D7D7D]'> Delta <sup className='text-[12px] md:text-[15px]'>genesis</sup></p>
          </div>
          <div className='flex justify-center items-center ' >
            <div className='flex justify-center items-center gap-x-[20px]'>

              <Switch checked={props.handleTheme} onChange={props.handleTheme}
                className={`${props.enabled ? 'bg-[#cfe0ffac]' : ' bg-gray-500'} relative hidden sm:inline-flex h-6 w-11 items-center rounded-full`}>
                {
                  props.enabled ?
                    <span className={`${props.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block  transform transition`}>
                      <i className="fa-solid fa-sun text-black"></i>
                    </span>
                    :
                    <span className={`${props.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block  transform transition`}>
                      <i className="fa-solid fa-moon  text-white"></i>
                    </span>
                }
              </Switch>

              {/* <p> */}
              <i className={`fa-solid fa-square-plus text-[21px] cursor-pointer flex sm:hidden ${props.isLight ? 'text-black' : 'text-white'}`} onClick={clearStorage} ></i>
              {/* </p> */}
              <p className={`w-[20px] h-[20px] md:w-[25px] md:h-[25px] ${props.isLight ? 'nav-icon-dark' : 'nav-icon-light'} flex mb-[2px] justify-center items-center rounded-[50%]`} onClick={handlePopUp} > <img src={localStorage.getItem("user_image")} className='w-[100px] rounded-full' alt="" /> </p>
            </div>

            <div className={popup ? 'open' : 'close'}>
              <div className='shadow-lg py-[18px] absolute flex sm:hidden top-[45px] right-[15px] sm:right[5%] md:right-[6%] bg-white text-black min-w-[150px] min-h-[150px] rounded-[7px]'>
                <ul className='flex flex-col '>
                  {
                    props.isLight ?
                      <li onClick={props.handleTheme} className=' w-full px-[18px] hover:bg-gray-100  h-[40px]  flex items-center gap-x-[19px]'>
                        <i className="fa-solid fa-moon w-[15px]" ></i>
                        <span>Dark Theme</span>
                      </li>
                      :
                      <li onClick={props.handleTheme} className=' w-full px-[18px] hover:bg-gray-100  h-[40px]  flex items-center gap-x-[19px]'>
                        <i className="fa-solid fa-sun w-[15px]" ></i>
                        <span>Light Theme</span>
                      </li>
                  }
                  <li onClick={props.handleLocation} className='w-full hover:bg-gray-100  px-[18px] h-[40px] flex items-center gap-x-[19px]'>
                    <i className="w-[15px] fa-solid fa-house"></i>
                    <span>Home</span>
                  </li>
                  <li onClick={props.logout} className='w-full px-[18px] hover:bg-gray-100  h-[40px] flex items-center gap-x-[19px]'>
                    <i className="w-[15px] fa-solid fa-right-from-bracket"></i>
                    <span>Sign Out</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* navbar ends */}

        {
          // here we will check if there is something in chat data or not. If there's nothing to show then we will display welcome user page.
          storage <= 2 ?
            <>
              <div className=' flex flex-col items-center overflow-scroll md:overflow-visible  '>
                <div className='flex flex-col items-center gap-y-[80px] flex-wrap ' >
                  <div className='flex flex-col items-start px-[10px] ' >
                    <h1 className='  text-white text-[40px] md:text-[60px] main-text '>Welcome, {localStorage.getItem('name')} </h1>
                    <h1 className='text-[#2E2E2E] text-[30px] md:text-[50px]'>How are you doing today?</h1>
                  </div>
                  <div className=' grid grid-cols-1 sm:grid-cols-2 md:flex gap-x-[20px] gap-y-[20px] justify-center  flex-wrap ' >

                    <div className={`relative p-[20px] w-[200px] cursor-pointer min-h-[60px] h-[170px] md:w-[170px] md:h-[185px]  ${props.isLight ? 'cards-light' : 'cards-dark'} rounded-[30px]  flex justify-center items-start`}
                      onClick={(e) => {
                        e.preventDefault()
                        setValue("Tell me something about GDSC SOU")
                      }}>
                      <p>
                        Tell me something about GDSC SOU
                      </p>
                      <p className=' flex items-center justify-center absolute w-[40px] h-[40px] bg-black rounded-full bottom-[15px] right-[15px] '>
                        <img src={img1} className='w-[80%]' alt="" />
                      </p>

                    </div>

                    <div className={` relative p-[20px] w-[200px] cursor-pointer min-h-[60px] md:w-[170px] h-[170px] md:h-[185px] ${props.isLight ? 'cards-light' : 'cards-dark'} rounded-[30px]  flex justify-center items-start `}
                      onClick={(e) => {
                        e.preventDefault()
                        setValue("How can I get involved with GDSC SOU?")
                      }}>
                      <p>

                        How can I get involved with GDSC SOU?
                      </p>
                      <p className=' flex items-center justify-center absolute w-[40px] h-[40px] bg-black rounded-full bottom-[15px] right-[15px] '>
                        <img src={img2} className='w-[60%]' alt="" />
                      </p>

                    </div>

                    <div className={`relative p-[20px] w-[200px]  cursor-pointer min-h-[60px] h-[170px] md:w-[170px] md:h-[185px] ${props.isLight ? 'cards-light' : 'cards-dark'} rounded-[30px]  flex justify-center items-start`}
                      onClick={(e) => {
                        e.preventDefault()
                        setValue("Who are the current members of the GDSC SOU core team?")
                      }}>
                      <p>

                        Who are the current members of the GDSC SOU core team?
                      </p>
                      <p className=' flex items-center justify-center absolute w-[40px] h-[40px] bg-black rounded-full bottom-[15px] right-[15px] '>
                        <img src={img3} className='w-[60%]' alt="" />
                      </p>
                    </div>

                    <div className={`relative p-[20px] w-[200px] cursor-pointer min-h-[60px] md:w-[170px] md:h-[185px] ${props.isLight ? 'cards-light' : 'cards-dark'} rounded-[30px]  hidden sm:flex justify-center items-start`}
                      onClick={(e) => {
                        e.preventDefault()
                        setValue("What are GDSC SOU's acheivements and events?")
                      }}>
                      <p>
                        What are GDSC SOU's acheivements and events?
                      </p>

                      <p className=' flex items-center justify-center absolute w-[40px] h-[40px] bg-black rounded-full bottom-[15px] right-[15px]'>
                        <img src={img4} className='w-[60%]' alt="" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
            :
            <>
              {/* If there is data in the chat then we will display it here  */}
              <div className='flex pt-[20px] flex-col gap-y-[25px] overflow-scroll h-full w-full items-center justify-start'>
                {
                  renderStorage()
                }
                <p ref={ref} className='w-full mt-[150px]'></p>
              </div>
            </>
        }

        {/* This is the bottom input container */}
        <div className=' flxed flex flex-col w-full justify-end items-center'>
          <form action="" onSubmit={(e) => {
            e.preventDefault()
            goToFetch()
            ref.current.scrollIntoView({
              behavior: "smooth",
            })
          }}>
            <div className={` ${props.isLight ? 'input-light' : 'input-dark'} flex justify-between items-center pl-[20px] pr-[20px] w-[78vw] sm:w-[73vw] md:w-[60vw] h-[50px] rounded-[50px]`}>
              <input onChange={(e) => {
                setValue(e.target.value)
              }}
                type="text" className=' bg-transparent text-[16px] sm:text-[17px]  bottom-[50px] w-[55vw] py-[20px] h-[40px] rounded-[50px]  outline-none' placeholder="Enter your prompt here..." value={textValue} />
              <i type='submit' className="  fa-regular fa-paper-plane cursor-pointer" onClick={(e) => {
                e.preventDefault()
                goToFetch()
              }}>
              </i>
            </div>
          </form>
          <p className='text-[#9F9F9F] text-center text-[14px] sm:text-[16px] mt-[10px] w-[90%]'>This chatbot strives to provide accurate responses. Consider checking important informations.</p>
        </div>

      </div>
    </div>
  )
}