'use client'
import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function DashboardPage(){
    const { user }=useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!user){
            router.push('/login')
        }
    },[user,router])

    return(
        <div className='p-10'>
            <h1 className="text-2xl font-bold">
                Welcome, {user?.username || user?.email} 
                </h1>
        </div>
    )
}