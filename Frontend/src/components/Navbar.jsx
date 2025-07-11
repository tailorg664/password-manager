import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
function Navbar() {
  const navigate = useNavigate();
  function NavButton({ children, ...props }) {
    return (
      <button
        className="w-auto px-4 py-3 transition-colors duration-200 hover:bg-blue-600/25"
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
    <div className="fixed top-5 z-50 flex w-full justify-center">
      <div className="flex w-[1200px] items-center justify-between rounded-3xl bg-blue-200/55 text-blue-900 shadow-lg shadow-white backdrop-blur-xl transition-all hover:w-[1300px]">
        <h1 className="pl-4 text-2xl font-bold">MyVault</h1>
        <div className="flex items-center">
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
    </div>
  );
}

export default Navbar;
