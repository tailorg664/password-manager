import {create} from 'zustand'
import axiosInstance from "../axios/axios.js";

const usePasswordStore = create((set)=>({
     savedPasswords:[],
     generatedPassword:null,
     generatePassword:async(formData)=>{
          set({})
     },
     savePasswordData:()=>{}

}))
export default  usePasswordStore