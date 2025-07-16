import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Loading.json"; // adjust path
function Loading(){
     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
               {/* Lottie Animation */}
               <div className="w-40 h-40">
                 <Lottie animationData={loadingAnimation} loop={true} />
               </div>
             </div>
     )
}
export default  Loading