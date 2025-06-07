import {create} from "zustand";
import axiosInstance from "../axios/axios.js";


const useAuthStore = create((set)=>({
     authUser:null,
     isCheckingAuth:false,
     isLoggingIn:false,
     isSigningUp:false,
     error:null,
      checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axiosInstance.get('/check');
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null , error: error?.response?.data?.message || "Auth error!"}); // unauthorized or session expired
    } finally {
         set({ isCheckingAuth: false });
    }
  },
       login: async (formData) => {
    set({ isLoggingIn: true, error: null });
    try {
         const res = await axiosInstance.post('/login', formData);
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
               const response = await axiosInstance.post("/signup",credentials)
               set({authUser:response.data.user})
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