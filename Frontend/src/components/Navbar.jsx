import React from 'react'

function Navbar() {
  function NavButton({children,...props}) {
    return (
      <button className="w-auto px-4 py-3 hover:bg-blue-600 transition-colors duration-200" {...props} >
      {children}
      </button>
    )
  }
  return (
    <div className="flex justify-between items-center bg-blue-900 text-white  sticky top-0 z-50">
      <h1 className="pl-2 text-2xl font-bold">MyVault</h1>
      <div className="flex items-center ">
        <NavButton style={{border_left:1}} onClick={()=>alert("home clicked")}>Home</NavButton>
        <NavButton onClick={()=>alert("about clicked")}>About</NavButton>
        <NavButton onClick={()=>alert("logout clicked")}>Logout</NavButton>
      </div>
    </div>
  );
}

export default Navbar
