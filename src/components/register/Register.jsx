import React, { useState } from 'react'
import toast from 'react-hot-toast';
import empServices from '../../service/empServices';
import { useNavigate } from 'react-router-dom';

import { CgRename } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineEventRepeat } from "react-icons/md";
import {validatePassword} from 'val-pass';
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Register = () => {
 
  let nagivate=useNavigate()
  const [state,setState]=useState({})
  const [matched,setMatched]=useState(true)
  const [errorMessage,setErrorMessage]=useState("")

  const handleChange=(e)=>{
  let{name,value}=e.target 
  if(name=='password'){
    let{validateAll,getAllValidationErrorMessage}=validatePassword(value,8)
    validateAll()?setErrorMessage(""):setErrorMessage(getAllValidationErrorMessage)
    value==""&&setErrorMessage("")
  }
  // if(name=="image"){
  //       let file=e.target.files[0]
  //       value=file
  //       let reader=new FileReader()
  //       reader.onload=function(){
  //           img.src=reader.result
  //           img.style.width="100px"
  //           img.style.height="100px"
  //       }
  //       reader.readAsDataURL(value)
  //   }
  setState({...state,[name]:value})
  }
  
  const handlepassword=(e)=>{
    let {value}=e.target
    state.password!=value?setMatched(false):setMatched(true)
    value==""&&setMatched(true)
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(state);
    
    let {name,email,password,phone,role,address}=state
    if(!name||!email||!password||!phone||!role||!address){
      toast.error("all fields  are mandatory")
      return
    }
    if(phone.length<10 || phone.length>10){
      toast.error("phone number must be 10 digits")
      return
    }
    let{validateAll,getAllValidationErrorMessage}=validatePassword(password)
    if(!validateAll()){
      toast.error(getAllValidationErrorMessage)
      return
    }
    if(!matched){
      toast.error("password and confirm password are unmatched")
      return
    }

    // (async ()=>{
      
    //   try {
    //     let data=await empServices.regiUser(state)
    //     if(data.status==201){
    //     toast.success("registered successfully")
    //     nagivate("/")
    //   }
    //   else{
    //     toast.error("something went wrong")
    //     return
    //   }
    //   } catch (error) {
    //     toast.error("something went wrong")
    //     return
    //   }
    // })()
    
  }
  return (
    <div className='size-full bg-linear-to-l from-[#10cec4] to-[#e0c361]  grid place-items-center' >

      <form action=""  onSubmit={handleSubmit} className='w-1/2 h-[90%] bg-white rounded-3xl shadow-2xl grid place-items-center px-[7%] py-8 max-sm:w-[90%] overflow-scroll'>

        <div className='size-full grid place-items-center text-2xl font-bold'><h1 className=' text-3xl sm:text-2xl'>Registration form</h1></div>

        <div className='flex w-full h-2/3 rounded-lg border-2' ><input type="text" name="name" placeholder='Enter Name' onChange={handleChange} className='flex px-8 w-[95%] h-full outline-0' /><span className=' p-2 grid place-content-center'><CgRename /></span></div>


        <div className='flex w-full h-2/3 rounded-lg border-2'><input type="email" name="email" placeholder='Enter Email' onChange={handleChange} className='flex px-8 w-[95%] h-full outline-0'/><span className='p-2 grid place-items-center'><MdEmail /></span></div>

        <div className='flex w-full h-2/3 rounded-lg border-2'><input type="password" name="password" placeholder='Enter Password' onChange={handleChange} className='flex px-8 w-[95%] h-full outline-0'/><span className='p-2 grid place-items-center'><RiLockPasswordFill /></span></div>

        <div className={`flex w-full h-2/3 rounded-lg ${!errorMessage?'hidden':''} `}><span className='border-red-700'>*{errorMessage}</span></div>

        <div className={`flex w-full h-2/3 rounded-lg border-2 ${matched?'border-black':'border-red-700'}`}  ><input type="password"  placeholder='Re-Type Password' onChange={handlepassword} className='flex px-8 w-[95%] h-full outline-0'/><span className='p-2 grid place-items-center'><MdOutlineEventRepeat /></span></div>
        
        <div className='flex w-full h-2/3 rounded-lg border-2'><input type="text" name="phone" placeholder='Enter Phone' onChange={handleChange} className='flex px-8 w-[95%] h-full outline-0'/><span className='p-2 grid place-items-center'><FaPhoneAlt /></span></div>

        <div className='flex w-full h-2/3 rounded-lg border-2'>
        <select name="role" onChange={handleChange} className='flex px-2 w-full h-2/3 outline-0 bg-white '>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        </div>

        <div className='flex w-full h-2/3 rounded-lg border-2'><input type="text" name="address" placeholder='Enter Address' onChange={handleChange} className='flex px-2 w-[95%] h-full outline-0'/><span className='p-2 grid place-items-center'><FaLocationDot /></span></div>
        
      {/* <div className='flex w-full h-2/3 rounded-lg border-2'><input type="file" name="image" accept="image/*" required/>
                    <img src="" alt=""/></div> */}

        <div className=' w-full h-2/3 bg-linear-to-l from-[dodgerblue] to-[aquamarine] text-white grid place-items-center tracking-widest active:scale-[0.9]'><button className='size-full hover:bg-green-500 '>Click</button></div>

      </form>
    </div>
  )
}

export default Register