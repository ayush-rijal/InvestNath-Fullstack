'use client'

import { createContext , useContext , useState , useEffect , ReactNode } from 'react'
import {jwtDecode} from 'jwt-decode'

interface DecodedToken {
    email:string
    exp:number
    user_id:number
    username?:string
    [key:string]:unknown
}

interface AuthContextType {
    user:DecodedToken | null
    token:string | null
    login:(token:string)=>void
    logout:()=>void
}

const AuthContext=createContext<AuthContextType | undefined>(undefined)

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<DecodedToken | null>(null)
    const[token,setToken]=useState<string | null>(null)

    useEffect(()=>{
        const storedToken=localStorage.getItem('access')
        if(storedToken){
            const decoded:DecodedToken=jwtDecode(storedToken)
            setToken(storedToken)
            setUser(decoded)

        }
        
    },[])

    const login=(newToken:string)=>{
        const decoded:DecodedToken=jwtDecode(newToken)
        localStorage.setItem('access',newToken)
        setToken(newToken)
        setUser(decoded)
    }
    const logout=()=>{
        localStorage.removeItem('access')
        setToken(null)
        setUser(null)
        
    }

    return (
        <AuthContext.Provider value={{user,token,login,logout}}>
         {children}   
        </AuthContext.Provider>
    )

}

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if (!context) throw new Error ('useAuth must be used within an AuthProvider')
    return context    
}