'use client'

import { useAuth } from "@/context/AuthContext"
import api from "@/utils/axios"
import { useState } from "react"
import { toast } from "react-toastify"
import {useRouter} from 'next/navigation'


export default function RegisterPage(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [username,setUsername]=useState("")
    const router=useRouter()
    const {login}=useAuth()

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()

        try{
            //Step1: Register the user
            await api.post('user/register/',{
                email,
                username,
                password,
            })
            
            //Step2: Auto login the user with the same credentials
            const res=await api.post('user/token/',{
                email,
                password,
            })

            //Save token and redirect
            login(res.data.access)
            toast.success('Registration successful. Logging you in...')
            router.push('/dashboard')

        }
        catch(err:unknown){
            if (err instanceof Error){
                console.error(err.message)
                toast.error(err.message)
            }else{
                console.error('Unknown error')
                toast.error('Registration or login failed')
            }

        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
                />
                <input type='text' placeholder="Username"
                value={username}
                onChange={e=>setUsername(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
                />
                <input 
                type='password'
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
                required
                />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
                    Register & Login
                </button>    


            </form>
        </div>
    )

}