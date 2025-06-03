import React from 'react';
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
function Password(){
  return (
    <div className="flex flex-col flex-1 border-box h-screen w-full overflow-y-auto">
      <div className="h-full w-full bg-blue-100">
      {/* Password saving card*/}
        <div className='w-[600px] h-[300px] m-12 bg-gray-200 border-4 rounded-md border-dashed'>
          <h2 className=' mt-4 ml-4 text-2xl font-bold'>Create new password</h2>
          <form action="/submit" method="POST" className='mt-4'>
            <div className='flex gap-4 ml-4 mb-6  '>
              <label htmlFor="username" className='text-xl font-medium'>Username:</label>
              <Input width={400} placeholder ={'username'} type={'username'}/>
            </div>

            <div className='flex ml-4 gap-4 mb-6 bg-green-200'>
              <label htmlFor="url" className='text-xl font-medium'>Link/URL:</label>
              <Input width={400} placeholder ={'default.com'} type={'url'}/>
            </div>

            <div className='flex ml-4 gap-4 mb-6 bg-cyan-300 '>
              <label htmlFor="password" className='text-xl font-medium'>Password:</label>
              <Input width={400} placeholder ={'********'} type={'password'}/>
            </div>

            <div className='w-16 h-10 bg-blue-700 text-xl'>
              <Button children={'Submit'}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
