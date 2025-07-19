import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import useAuthStore from "../store/useAuthStore.js";
import { Eye, EyeOff } from "lucide-react";
function Login() {
  const { isLoggingIn, login } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    entry: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.entry || !formData.password)
      return console.log("Fill missing values");
    if (formData.password.length < 6)
      return console.log("Password must be of atleast 6 digits.");
    return true;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      login(formData).then(() => console.log("User logged in!"));
    } else {
      console.log("Problem occurred while login. Please try again!");
    }
  }

  return (
    <div className="animate-gradient-password login flex h-screen flex-col items-center justify-center bg-radial from-black to-slate-800 text-slate-50">
      <div className="flex h-[500px] w-60 flex-row max-md:w-[500px] max-sm:w-[350px] sm:w-[600px]">
        {/* Left side for form */}
        <div className="left flex h-full w-full flex-col items-center rounded-bl-4xl bg-transparent inset-shadow-custom min-sm:w-3/4">
          {/* Logo */}
          <h1 className="pt-6 text-6xl font-bold tracking-wide text-blue-400">
            Login
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-md flex-col gap-10 px-12"
          >
            {/* Username or Email */}
            <div className="flex flex-col gap-2">
              <input
                name="entry"
                type="text"
                value={formData.entry}
                onChange={handleChange}
                placeholder="Username or Email"
                className="rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-sm text-blue-100 placeholder-blue-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}

            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-lg border border-slate-700 bg-transparent px-3 py-2 pr-10 text-sm text-blue-100 placeholder-blue-300 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Redirect to signup */}
              <div className="scale-90 text-sm text-slate-400">
                Don’t have an account?
                <Link to="/signup" className="ml-1 text-blue-500 underline">
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit">
              {isLoggingIn ? (
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
                "Login"
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

export default Login;
