'use client'
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

export default function ProfilePage() {
  const { user, loading } = useAuth()

  if (loading || !user) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">My Profile</h1>
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">Username:</span>
          <span className="text-gray-900">{user.username || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-900">{user.email}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">User ID:</span>
          <span className="text-gray-900">{user.user_id}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">Roles:</span>
          <span className="text-gray-900">
            {user.is_staff ? 'Staff' : ''}
            {user.is_editor ? (user.is_staff ? ', Editor' : 'Editor') : ''}
            {!user.is_staff && !user.is_editor ? 'User' : ''}
          </span>
        </div>
      </div>
      <Link href="/blogs" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow text-lg font-semibold text-center transition">View Blogs</Link>
    </div>
  )
}