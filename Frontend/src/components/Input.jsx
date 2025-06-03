import React from "react";

function Input({width,...props}){
     return (
          <input style={{ width: typeof width === "number" ? `${width}px` : width }}
            className={`border-2 border-gray-300 rounded-lg p-2 mb-0 `}
            {...props}
          />
     )
}
export default Input