 function Button({children,...props}){
     return (
       <button
         className=" bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-slate-50 font-semibold py-2 px-6 rounded-lg shadow transition"
         {...props}
       >
         {children}
       </button>
     );
}

export default Button;