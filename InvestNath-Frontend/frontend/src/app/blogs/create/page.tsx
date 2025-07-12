'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import { toast } from 'react-toastify'
import Link from 'next/link'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css'

export default function CreateBlogPage() {
  const { user, token } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content || !thumbnail) {
      toast.error('All fields are required')
      return
    }
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('thumbnail', thumbnail)
      await api.post('/blog/blogs/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success('Blog created')
      router.push('/blogs')
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        toast.error(err.message)
      } else {
        console.error(err)
        toast.error('Failed to create blog')
      }
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setThumbnail(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  if (!user || !(user.is_staff || user.is_editor)) {
    return <p className="p-4">Only editors or admins can write blogs.</p>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-1">Create Blog</h1>
            <p className="text-gray-600 text-base">Share your investment pitch or Shark Tank recap with the world!</p>
          </div>
          <Link href="/blogs" className="text-blue-600 hover:underline font-medium">Back to Blogs</Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="mb-2 bg-white"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mb-2"
              required
            />
            {preview && (
              <img src={preview} alt="Thumbnail Preview" className="w-full max-h-56 object-cover rounded shadow mb-2 border" />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded font-semibold text-lg shadow hover:bg-blue-700 transition"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  )
}