import React from "react";

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
            <div className="flex flex-col items-center px-12">
              <input
                type="text"
                placeholder="Email"
                className="border-2 border-gray-300 rounded-lg p-2 mb-6 w-full"
              />
            </div>
            {/* Username */}
            <div className="flex flex-col items-center px-12">
              <input
                type="text"
                placeholder="Username"
                className="border-2 border-gray-300 rounded-lg p-2 mb-6 w-full"
              />
            </div>
            {/* Password */}
            <div className="flex flex-col items-center px-12">
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-gray-300 rounded-lg p-2 mb-0 w-full"
              />
            </div>
            
            <div className="flex flex-col items-center mt-4 px-12">
              <button className=" bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-[300px]">
                Sign Up
              </button>
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
