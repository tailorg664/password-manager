import React from 'react'

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4 sticky top-0 z-50">
      <h1 className="text-2xl font-bold">MyVault</h1>
      <div className="flex items-center space-x-3 sm:space-x-6">
        <div className="w-auto px-3 py-1 bg-red-600 hover:bg-red-400 transition-colors duration-300" onClick={() =>alert('Home clicked')}>
          Home
        </div>
        <div className="w-auto px-3 py-1 bg-red-600 hover:bg-red-400 transition-colors duration-300" >
          Logout
        </div>
        <div className="w-auto px-3 py-1 bg-red-600 hover:bg-red-400 transition-colors duration-300">
          About
        </div>
      </div>
    </div>
  );
}

export default Navbar
