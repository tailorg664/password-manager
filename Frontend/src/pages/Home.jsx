import React from "react";
import illustration from "/Vault-rafiki.svg";

// import './home.css'
function Home() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between min-h-screen bg-blue-200 px-4 sm:px-16 py-6">
        {/* LEFT: Text */}
        <div className="sm:w-1/2 w-full mb-10 sm:mb-0">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
            Manage your passwords securely and trustfully
          </h1>
          <p className="pt-8 text-lg sm:text-xl font-mono">
            My Vault is a password management application for those who are very
            frustrated with lots of passwords. From generation of passwords to
            saving them securely — that’s our mission. Strict authentication is
            our aim and zero data leaks is our strong point.
          </p>
          <button className="mt-10 px-6 py-3 text-2xl font-bold rounded-3xl border-2 text-white bg-red-500 hover:bg-red-400 transition-colors duration-300 border-red-500 hover:border-red-400">
            Sign Up
          </button>
        </div>

        {/* RIGHT: Image */}
        <div className="sm:w-1/2 w-full flex justify-center">
          <img
            src={illustration}
            alt="Security illustration"
            className="max-w-[500px] h-auto"
          />
        </div>
      </div>
      {/* Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t-4 border-white bg-gray-700 p-4 text-gray-200 pb-20">
        <div className="left">
          <h1 className="text-2xl font-bold border-b-2 ">MyVault</h1>
          <div className=" pt-2 text-sm">
            The site is in development and improvements will start to implement
            in upcoming time. Licence and registration is valid till the site's
            lifetime. This site is a project and is a solo project. Github and
            Linkedin links are provided. You may enjoy the site and get the most
            profit out of it.
          </div>
          <h1 className="text-2xl font-bold border-b-2 ">Contact</h1>
          <div className=" pt-2 text-sm">
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
          <div className="font-bold text-2xl border-b-2">
            Sites and Contacts
          </div>
          <div className="flex flex-row gap-2 pt-8 text-xl font-medium">
            <img src="/github-mark/github-mark-white.png" className="w-8" />{" "}
            Github
          </div>
          <div className="flex flex-row gap-2 pt-8 text-xl font-medium">
            <img src="/in-logo/InBug-White.png" className="w-8" />{" "}
            Linkedin
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
