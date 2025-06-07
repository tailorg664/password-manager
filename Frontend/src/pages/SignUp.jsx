import React, { useState} from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import useAuthStore from "../store/useAuthStore.js";
//import {useNavigate} from "react-router-dom";
function SignUp() {
  const {signup,isSigningUp}= useAuthStore();
  const [formData,setFormData]=useState({
    fullname:"",
    email:"",
    username:"",
    password:"",
    confirmPassword:""
  })
  const validateForm = () => {
    if (!formData.email.trim()) alert("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) alert("Invalid email format");
    if (!formData.password) alert("Password is required.");
    if (formData.password.length < 6) alert("Password must be of atleast 6 digits.")
    if (!formData.confirmPassword) alert("Confirm Password is required.");
    if(formData.password !== formData.confirmPassword) alert("Confirm password doesnt matches password.")
    return true;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e){
    e.preventDefault()
    const success = validateForm()
    if(success){
      signup(formData).then(()=>{alert("User Logged in!")})
    }
    else{
      alert("An error occured,Please try again!")
    }
  }
  return (
    <div className="login flex flex-col items-center justify-center h-screen bg-blue-200">
      <div className="h-[600px] w-[600px] max-md:w-[500px]  max-sm:w-[350px] flex flex-row">
        {/* Left side for form */}
        <div className="left bg-blue-50 h-full w-full min-sm:w-3/4 flex flex-col items-center rounded-bl-4xl">
          {/* Logo */}
          <h1 className="text-[50px] text-blue-700 font-bold tracking-wide  pt-4">
            SignUp
          </h1>
          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full h-full mt-8 ">
            {/* Full Name */}
            <div className="flex flex-col items-center px-12 mb-8">
              <Input name={'fullname'} type="text" width={360} placeholder="Fullname" value={formData.fullname} onChange={handleChange}/>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center px-12 mb-8">
              <Input name={'email'} type="text" placeholder="Email" width={360} value={formData.email} onChange={handleChange}/>
            </div>
            {/* Username */}
            <div className="flex flex-col items-center px-12 mb-8">
              <Input name={'username'} type="text" width={360} placeholder="Username" value={formData.username} onChange={handleChange}/>
            </div>
            {/* Password */}
            <div className="flex flex-col items-center px-12 mb-8">
              <Input name={'password'} type="password" width={360} placeholder="Password" value={formData.password} onChange={handleChange}/>
            </div>
            <div className="flex flex-col items-center px-12 mb-8">
              <Input name={'confirmPassword'} type="password" width={360} placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}/>
            </div>
            <div className="flex flex-col items-center  px-12">
              <Button type={"submit"} >{isSigningUp? (<>
                <div className={'font-bold text-red-700'}>Loading</div>
              </>):"Signup"}</Button>
            </div>
          </form>
        </div>
        {/* Right side for design */}
        <div className="right h-full w-0 min-sm:w-1/4 bg-blue-700 rounded-tr-4xl"></div>
      </div>
    </div>
  );
}

export default SignUp;
