import React from "react";

function Input({...props }) {
  return (
    <input
      
      className={`mb-0 rounded-lg border-1 w-60 sm:w-[340px] border-blue-300 placeholder:text-blue-200 p-2 font-light text-blue-100`}
      {...props}
    />
  );
}
export default Input;
