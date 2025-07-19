import React from "react";
import illustration from "/Vault-rafiki.svg";
import { useNavigate } from "react-router-dom";
//import useAuthStore from "../store/useAuthStore.js";

// import './home.css'
function Home() {
  const navigate = useNavigate();
  function Card({ children }) {
    return (
      <div className="animate-gradient-password flex h-20 w-80 flex-row items-center rounded-[40px] border-4 border-red-200 bg-radial from-black to-blue-600 p-2">
        <div className="border-2animate-gradient-x h-13 w-13 rounded-4xl border-amber-100 bg-gradient-to-r from-pink-500 to-violet-500"></div>
        <div className="ml-6 text-2xl font-medium text-gray-300">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="animate-gradient-password bg-radial from-black to-slate-700">
        <div className="flex min-h-screen flex-col items-center bg-radial px-4 py-32 text-slate-50 sm:flex-row sm:content-center sm:px-16 sm:py-0">
          {/* LEFT: Text */}
          <div className="flex w-full flex-col items-center text-center sm:w-1/2 sm:items-start sm:text-left">
            <h1 className="animate-gradient-x max-w-[800px] min-w-60 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-3xl font-bold text-transparent sm:text-xl md:text-6xl">
              Manage your passwords securely and trustfully
            </h1>
            <p className="font-segoe max-w-[800px] pt-8 text-blue-200 sm:text-xl">
              My Vault is your trusted password manager — from generating
              strong, unique passwords to storing them securely, we’ve got you
              covered. With robust authentication and a zero data-leak policy,
              your privacy is always our top priority.
            </p>
            <button
              className="mt-10 animate-[wiggle_1s_ease-in-out_infinite] rounded-3xl border-2 border-blue-500 bg-blue-500 px-6 py-3 text-2xl font-bold text-gray-200 transition-all duration-300 hover:border-purple-500 hover:bg-purple-500 hover:shadow-md hover:shadow-purple-300"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>

          {/* RIGHT: Image */}
          <div className="flex w-full justify-center sm:w-1/2">
            <img
              src={illustration}
              alt="Security illustration"
              className="h-auto max-w-[500px]"
            />
          </div>
        </div>
        {/* Middle */}
        <div className="flex flex-row justify-center pb-10 text-2xl font-medium text-purple-400 sm:text-5xl">
          Our services Provides...
        </div>
        <div className="flex h-96 scale-75 flex-col items-center justify-around gap-y-3 sm:h-64 sm:scale-100 sm:flex-row sm:items-baseline-last sm:gap-0">
          <Card>Protection</Card>
          <Card>Crypto Locking</Card>
          <Card>Full Control</Card>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 gap-4 border-t-4 border-white bg-gray-900 p-4 pb-20 text-gray-200 sm:grid-cols-2">
        <div className="left">
          <h1 className="border-b-2 text-2xl font-bold">MyVault</h1>
          <div className="pt-2 text-sm">
            The site is in development and improvements will start to implement
            in upcoming time. Licence and registration is valid till the site's
            lifetime. This site is a project and is a solo project. Github and
            Linkedin links are provided. You may enjoy the site and get the most
            profit out of it.
          </div>
          <h1 className="border-b-2 text-2xl font-bold">Contact</h1>
          <div className="pt-2 text-sm">
            If you have any questions or suggestions, please feel free to reach
            out to me via email at:{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=gaurav_t@me.iitr.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              gaurav_t@me.iitr.ac.in
            </a>
          </div>
        </div>
        <div className="right">
          <div className="border-b-2 text-2xl font-bold">
            Sites and Contacts
          </div>
          <a
            href="https://github.com/tailorg664"
            name="github"
            target="_blank"
            className="flex flex-row gap-2 pt-8 text-xl font-medium"
          >
            <img src="/github-mark/github-mark-white.png" className="w-8" />{" "}
            Github
          </a>
          <a
            href="https://linkedin.com/Gaurav-Tailor/"
            name="linkedin"
            target="_blank"
            className="flex flex-row gap-2 pt-8 text-xl font-medium"
          >
            <img src="/in-logo/InBug-White.png" className="w-8" /> Linkedin
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

{
  /* <video
          ref={videoRef}
          src={animation}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="max-w-[500px] h-auto"
        /> */
}
