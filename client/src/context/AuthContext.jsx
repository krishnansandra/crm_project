import{createContext,useContext,useMemo,useState}from"react";import api from"../api";
const C=createContext(null);
export function AuthProvider({children}){
 const[token,setToken]=useState(()=>localStorage.getItem("crm_token"));
 const[user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("crm_user")||"null")}catch{return null}});
 const save=d=>{localStorage.setItem("crm_token",d.token);localStorage.setItem("crm_user",JSON.stringify(d.user));setToken(d.token);setUser(d.user)};
 const register=async p=>{const{data}=await api.post("/auth/register",p);save(data);return data};
 const login=async p=>{const{data}=await api.post("/auth/login",p);save(data);return data};
 const logout=()=>{localStorage.removeItem("crm_token");localStorage.removeItem("crm_user");setToken(null);setUser(null)};
 const value=useMemo(()=>({token,user,register,login,logout}),[token,user]);
 return <C.Provider value={value}>{children}</C.Provider>;
}
export const useAuth=()=>useContext(C);
