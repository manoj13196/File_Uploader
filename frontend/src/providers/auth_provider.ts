import { AuthBindings } from "@refinedev/core"

import axios from "axios";

export const authProvider:AuthBindings={

    login: async({email, password})=>{
        try{
           await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });   

            await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,{
                email, password,
            },{
                withCredentials:true,
            });

            return{
                success:true,
                redirectTo:'/folders'
            };
        }
        catch(error){
            return{
                success:false,
                error:{
                    name:"LoginError",
                    message:"Invalid credentials"
                }
            }
        }
    },


logout: async () => {
  const response=await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if(!response.ok){
    throw new Error("Logout failed")
  }
  return {
    success: true,
    redirectTo: "/login",
  };
},



    check:async ()=>{
        try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`,{
                withCredentials:true,
            });
            if (res.data) {
        return {
          authenticated: true,
        };
      } else {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
        }catch(error){
return {
        authenticated: false,
        redirectTo: "/login",
      };
        }
    },
    
     getIdentity: async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      });

      return {
        id: res.data.id,
        name: res.data.email,
        email: res.data.email,
      };
    } catch {
      return null;
    }
  },

  onError: async (error) => {
    console.error("Refine auth error", error);
    return {};
  },
}