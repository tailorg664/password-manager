import React from "react";
import illustration from "/Vault-rafiki.svg";
import { useNavigate } from "react-router-dom";
//import useAuthStore from "../store/useAuthStore.js";

// import './home.css'
function Home() {
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    const { name } = e.target;
    if (name === "github") navigate("https://github.com/tailorg664");
    if (name === "linkedin") navigate("https://linkedin.com/Gaurav-Tailor/");
    else navigate("http://gmail.com");
  };
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex min-h-screen flex-col items-center justify-between bg-black/95 px-4 py-6 sm:flex-row sm:px-16">
        {/* LEFT: Text */}
        <div className="mb-10 w-full sm:mb-0 sm:w-1/2">
          <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl animate-gradient-x">
            Manage your passwords securely and trustfully
          </h1>
          <p className="ml-4 pt-8 font-mono text-lg text-blue-200 sm:text-xl">
            My Vault is a password management application for those who are very
            frustrated with lots of passwords. From generation of passwords to
            saving them securely — that’s our mission. Strict authentication is
            our aim and zero data leaks is our strong point.
          </p>
          <button
            className="mt-10 rounded-3xl border-2 border-blue-500 bg-blue-500 px-6 py-3 text-2xl font-bold text-white transition-colors duration-300 hover:border-blue-400 hover:bg-blue-400"
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
          <div
            onClick={handleNavigation}
            name="github"
            className="flex flex-row gap-2 pt-8 text-xl font-medium"
          >
            <img src="/github-mark/github-mark-white.png" className="w-8" />{" "}
            Github
          </div>
          <div
            onClick={handleNavigation}
            name="linkedin"
            className="flex flex-row gap-2 pt-8 text-xl font-medium"
          >
            <img src="/in-logo/InBug-White.png" className="w-8" /> Linkedin
          </div>
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
