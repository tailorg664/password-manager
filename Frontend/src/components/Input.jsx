import React from "react";

function Input({ width, ...props }) {
  return (
    <input
      style={{ width: typeof width === "number" ? `${width}px` : width }}
      className={`mb-0 rounded-lg border-2 border-gray-300 p-2`}
      {...props}
    />
  );
}
export default Input;
