 function Button({children,...props}){
     return (
       <button
         className=" bg-blue-500 hover:bg-blue-600 text-slate-50 font-semibold py-2 px-6 rounded-lg shadow transition"
         {...props}
       >
         {children}
       </button>
     );
}

export default Button;