import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
function Navbar() {
  const [isTop, setIsTop] = React.useState(true);
  
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTop]);
  const navigate = useNavigate();
  function NavButton({ children, ...props }) {
    return (
      <button
        className=" w-auto px-4 py-3 transition-all duration-200 hover:bg-blue-600/25   hover:text-xl "
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
    <div
      className={`fixed z-50 flex w-full justify-center ${isTop ? "top-5" : "top-8"} transition-all duration-300`}
    >
      <div
        className={`mx-10 flex h-12 ${isTop ? "w-[1300px]" : "w-[1200px]"} items-center justify-between overflow-hidden rounded-3xl bg-blue-300/60 shadow-lg shadow-sky-300 backdrop-blur-sm transition-all duration-500`}
      >
        <h1 className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text pl-4 text-2xl font-bold text-transparent">
          MyVault
        </h1>
        <div className="flex items-center text-gray-800">
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
