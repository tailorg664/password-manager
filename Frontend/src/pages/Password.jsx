import React from 'react';
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
function Password(){
  return (
    <div className='flex flex-col h-screen w-full'>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-12 p-10">
      {/* Save Password Card */}
      <div className="relative w-[600px] border-4 border-dashed rounded-md p-6">
        <h2 className="text-2xl font-bold mb-6">Save New Password</h2>

        {/* Card Name */}
        <div className="absolute top-4 right-6 flex items-center gap-2">
          <label htmlFor="cardName" className="text-sm font-medium">Card Name:</label>
          <input
            type="text"
            placeholder="e.g. Google"
            className="border border-gray-400 rounded px-2 py-1 text-sm w-[160px]"
          />
        </div>

        <form className="grid grid-cols-[130px_1fr] gap-y-6 gap-x-4 mt-2">
          <label className={'text-xl font-medium'}>Username:</label>
          <Input placeholder="username" />

          <label className={'text-xl font-medium'}>Link/URL:</label>
          <Input placeholder="default.com" type="url" />


          <label className={'text-xl font-medium'}>Password:</label>
          <Input placeholder="********" type="password" />

          <div></div>
          <Button>Submit</Button>
        </form>
      </div>
      {/* Password Generator Panel */}
      <div className=" w-[500px] bg-white border-4 border-dashed rounded-lg p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Generate Password</h3>

        {/* Your password generator logic here */}
        <input
          readOnly
          value="A#sD9!eL7"
          className="w-full text-center text-lg font-mono mb-4 p-2 border border-gray-300 rounded"
        />
        <Button children={'Generate now'}/>

        {/* Options like length, symbols, etc */}
        <div className="mt-4 flex flex-col gap-2">
          <label>
            Length:
            <input type="range" min="8" max="32" className="w-full" />
          </label>
          <div className="flex items-center gap-4">
            <label><input type="checkbox" /> Symbols</label>
            <label><input type="checkbox" /> Numbers</label>
            <label><input type="checkbox" /> Uppercase</label>
          </div>
        </div>
      </div>
    </div>
    {/*Saved passwords*/}
      <div className="max-w-full mx-12 bg-white rounded-md p-4">
        <div className={'font-medium text-4xl text-gray-500 pb-4'}>Saved Passwords</div>
        <div className="grid grid-cols-3 font-semibold border-b pb-2 mb-4">
          <span>Name</span>
          <span>URL/Link</span>
          <span>Password</span>
        </div>
        {/* Sample Data - Replace with Dynamic Rendering */}
        {[1, 2, 3].map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center bg-gray-100 p-3 mb-2 rounded-md"
          >
            <div className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center text-sm font-semibold bg-gray-200 rounded-full mr-2">
                {index+1}
              </span>
              Figma
            </div>
            <span>https://figma.com</span>
            <span>************</span>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Password;
