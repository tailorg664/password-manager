import React from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

function SignUp() {
  return (
    <div className="login flex flex-col items-center justify-center h-screen bg-blue-200">
      <div className="h-[500px] w-[600px] max-md:w-[500px]  max-sm:w-[350px] flex flex-row">
        {/* Left side for form */}
        <div className="left bg-blue-50 h-full w-full min-sm:w-3/4 flex flex-col items-center rounded-bl-4xl">
          {/* Logo */}
          <h1 className="text-[50px] text-blue-700 font-bold tracking-wide  pt-8">
            SignUp
          </h1>
          {/* Form */}
          <form action="submit" className="w-full h-full mt-8 ">
            {/* Email */}
            <div className="flex flex-col items-center px-12 mb-8">
              <Input type="text" placeholder="Email" width={360}/>
            </div>
            {/* Username */}
            <div className="flex flex-col items-center px-12 mb-8">
              <Input type="text" width={360} placeholder="Username"/>
            </div>
            {/* Password */}
            <div className="flex flex-col items-center px-12 mb-8">
              <Input type="password" width={360} placeholder="Password"/>
            </div>
            
            <div className="flex flex-col items-center  px-12">
              <Button children={'SignUp'}/>
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
