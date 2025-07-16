import React, {useState} from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import useAuthStore from "../store/useAuthStore.js";
function LogIn() {
  const {isLoggingIn,login,}=useAuthStore()
  const [formData,setFormData]= useState({
    entry :"",
    password:""
  })
  const handleChange=(e)=>{
    const {name,value} = e.target
    setFormData(
      {...formData,
        [name]:value
      })
  }
  const validataForm =()=>{
    if(!formData.entry || !formData.password) return console.log("Fill missing values")
    if (formData.password.length < 6) return console.log("Password must be of atleast 6 digits.")
    return true;
  }
  function handleSubmit(e){
    e.preventDefault()
    const success = validataForm()
    if(success) login(formData).then(()=>console.log("User logged in!"))
    else{console.log("Problem occured while login. Please try again!")}
  }

  return (
    <div className="login animate-gradient-password flex h-screen flex-col items-center justify-center bg-radial from-black to-slate-800 text-slate-50">
      <div className="flex h-[500px] w-[600px] flex-row max-md:w-[500px] max-sm:w-[350px]">
        {/* Left side for form */}
        <div className="left flex h-full w-full flex-col items-center rounded-bl-4xl bg-gray-800 min-sm:w-3/4">
          {/* Logo */}
          <h1 className="pt-8 text-[50px] font-bold tracking-wide text-blue-400">
            Login
          </h1>
          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 h-full w-full">
            {/* Username or Email */}
            <div className="mb-10 flex flex-col items-center px-12">
              <Input
                name={"entry"}
                type="text"
                width={330}
                value={formData.entry}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            {/* Password */}
            <div className="flex flex-col items-center px-12">
              <Input
                name={"password"}
                value={formData.password}
                onChange={handleChange}
                type="password"
                width={330}
                placeholder="Password"
              />
            </div>
            {/* Redirection */}
            <div className="scale-75 pt-2 font-medium">
              Didn't have an account?
              <a href="/signup" className="text-blue-700">
                {" "}
                Sign Up
              </a>
            </div>
            <div className="mt-4 flex flex-col items-center px-12">
              <Button type={"submit"} disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                    <span>Loading</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
        {/* Right side for design */}
        <div className="right h-full w-0 rounded-tr-4xl bg-blue-700 min-sm:w-1/4"></div>
      </div>
    </div>
  );
}

export default LogIn;
