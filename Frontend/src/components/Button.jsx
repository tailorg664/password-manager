 function Button({children,...props}){
     return (<button className=" bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-[300px]" {...props}>
          {children}
        </button>
     )
}

export default Button;