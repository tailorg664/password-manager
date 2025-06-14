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
    <div className="login flex flex-col items-center justify-center h-screen bg-blue-200">
      <div className="h-[500px] w-[600px] max-md:w-[500px]  max-sm:w-[350px] flex flex-row">
        {/* Left side for form */}
        <div className="left bg-blue-50 h-full w-full min-sm:w-3/4 flex flex-col items-center rounded-bl-4xl">
          {/* Logo */}
          <h1 className="text-[50px] text-blue-700 font-bold tracking-wide  pt-8">
            Login
          </h1>
          {/* Form */}
          <form onSubmit={handleSubmit}  className="w-full h-full mt-10 ">
            {/* Username or Email */}
            <div className="flex flex-col items-center px-12 mb-10">
              <Input name={"entry"} type="text" width={330} value={formData.entry} onChange={handleChange} placeholder="Username"/>
            </div>
            {/* Password */}
            <div className="flex flex-col items-center px-12">
              <Input name={'password'} value={formData.password} onChange={handleChange} type="password" width={330} placeholder="Password"/>
            </div>
            {/* Redirection */}
            <div className="scale-75 pt-2 font-medium">
              Didn't have an account?
              <a href="/signup" className="text-blue-700">
                {" "}Sign Up
              </a>
            </div>
            <div className="flex flex-col items-center mt-4 px-12">
              <Button type={'submit'} disabled={isLoggingIn}>
                {isLoggingIn ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
        <div className="right h-full w-0 min-sm:w-1/4 bg-blue-700 rounded-tr-4xl"></div>
      </div>
    </div>
  );
}

export default LogIn;
