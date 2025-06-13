import {create} from "zustand";
import axiosInstance from "../axios/axios.js";


const useAuthStore = create((set,get)=>({
     authUser:null,
     isCheckingAuth:false,
     isLoggingIn:false,
     isSigningUp:false,
     error:null,
      checkAuth: async () => {
          set({ isCheckingAuth: true, error: null });

            try {
              const res = await axiosInstance.get('/auth/check');

              // Optional: log once to confirm structure
              console.log("✅ checkAuth user:", res.data.user);
              set({ authUser: res.data.user,error:null });

            } catch (error) {
                   const errMsg =
                     error?.response?.data?.message || "Unauthorized or session expired";

                   console.error("❌ checkAuth error:", errMsg);

                   set({ authUser: null, error: errMsg });
                 }
            finally {
                   set({ isCheckingAuth: false });
          }
},

       login: async (formData) => {
    set({ isLoggingIn: true, error: null });
    try {
         const res = await axiosInstance.post('/auth/login', formData);
         set({ authUser: res.data.user });
       } catch (err) {
         set({ error: err.response?.data?.message || 'Login failed' });
       } finally {
         set({ isLoggingIn: false });
       }
     },

     logout:()=>{},
     signup: async (credentials)=>{
          set({isSigningUp:true})
          try{
               const response = await axiosInstance.post("/auth/signup",credentials)
               const user = response.data.user
               set({authUser: user})
               console.log(get().authUser)
          }
          catch (error){
               set({error: error?.response?.data?.message || "Signup failed"})
          }
          finally {
               set({isSigningUp:false})
          }
     }
}))
export default  useAuthStore;