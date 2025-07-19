import React, { useState } from "react";
import {Eye,EyeOff} from "lucide-react";
import Button from "../components/Button.jsx";
import useAuthStore from "../store/useAuthStore.js";
//import {useNavigate} from "react-router-dom";
function Signup() {
  const { signup, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const validateForm = () => {
    if (
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.username ||
      !formData.fullname
    ) {
      return console.log("Fill missing values");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return console.log("Invalid email format");
    if (formData.password.length < 6)
      return console.log("Password must be of atleast 6 digits.");
    if (formData.password !== formData.confirmPassword)
      return console.log("Confirm password doesnt matches password.");
    return true;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      signup(formData).then(() => {
        console.log("User signed up!");
      });
    } else {
      console.log("An error occured,Please try again!");
    }
  }
  
  return (
    <div className="animate-gradient-password login flex h-screen flex-col items-center justify-center bg-radial from-black to-slate-800">
      <div className="flex h-[600px] w-60 flex-row max-md:w-[500px] max-sm:w-[350px] sm:w-[600px]">
        {/* Left side for form */}
        <div className="left flex h-full w-full flex-col items-center rounded-bl-4xl bg-transparent inset-shadow-custom min-sm:w-3/4">
          {/* Logo */}
          <h1 className="pt-6 text-6xl font-bold tracking-wide text-blue-400">
            SignUp
          </h1>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-md flex-col gap-10 px-12"
          >
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <input
                name="fullname"
                type="text"
                placeholder="Fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-transparent px-3 py-2 pr-10 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-transparent px-3 py-2 pr-10 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <Button type="submit">
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  <span>Loading</span>
                </div>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </div>
        {/* Right side for design */}
        <div className="right h-full w-0 rounded-tr-4xl bg-blue-700 min-sm:w-1/4"></div>
      </div>
    </div>
  );
}

export default Signup;
