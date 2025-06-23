import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
function Navbar() {
  const navigate = useNavigate();
  function NavButton({ children, ...props }) {
    return (
      <button
        className="w-auto px-4 py-3 hover:bg-blue-600 transition-colors duration-200"
        {...props}
      >
        {children}
      </button>
    );
  }
  const { authUser, logout } = useAuthStore();
  const label = authUser ? "Logout" : "Login";

  const handleClick = () => {
    if (label === "Login") {
      navigate("/login");
    } else {
      logout();
    }
  };
  return (
    <div className="flex justify-between items-center bg-blue-950 text-blue-100  sticky top-0 z-50">
      <h1 className="pl-4 text-2xl font-bold">MyVault</h1>
      <div className="flex items-center ">
        <NavButton onClick={() => navigate("/")}>Home</NavButton>
        <NavButton
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          About
        </NavButton>
        <NavButton onClick={handleClick}>{label}</NavButton>
      </div>
    </div>
  );
}

export default Navbar;
