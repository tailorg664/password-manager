import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
import { Menu } from "lucide-react";
function Navbar() {
  const [isTop, setIsTop] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef(null);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    const handleClickOutside = (e) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTop, isDropdownOpen]);
  const navigate = useNavigate();
  function NavButton({ children, ...props }) {
    return (
      <button
        className="w-auto px-4 py-3 transition-all duration-200 hover:bg-blue-600/25 hover:text-xl"
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
        {isMobile ? (
          <NavButton onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <Menu />
          </NavButton>
        ) : (
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
        )}
      </div>
      {isDropdownOpen && (
        <div className="absolute top-16 right-10 z-50 flex flex-col rounded-lg bg-blue-300/60 p-4 backdrop-blur-sm">
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
      )}
    </div>
  );
}

export default Navbar;
