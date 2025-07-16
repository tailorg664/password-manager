// tailwind.config.js
import scrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        seoge:["Segoe UI",'sans-serif']
      }
    },
  },
  plugins: [scrollbar],
};
