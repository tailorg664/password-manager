import React from "react";
import "../index.css";
function Popup() {
  return (
    <>
      <div className="h-[50px] w-[300px] flex items-center justify-center">
        <h1 className="bg-red-400 text-2xl font-bold">MyVault</h1>
        <div className="      flex flex-col items-center justify-center mt-4">
          <button className="text-red-950 ">Enable autofill</button>
        </div>
      </div>
    </>
  );
}

export default Popup;
