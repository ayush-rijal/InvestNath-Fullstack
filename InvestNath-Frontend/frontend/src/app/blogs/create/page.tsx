'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import { toast } from 'react-toastify'
import type {ReactQuillProps} from  'react-quill'

const ReactQuill = dynamic<ReactQuillProps>(() => import('react-quill'), {
  ssr: false,
})
import 'react-quill/dist/quill.snow.css'

export default function CreateBlogPage() {
  const { user, token } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)

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
      router.push('/blog')
    } catch(err:unknown){
        if(err instanceof Error){
            console.error(err.message)
            toast.error(err.message)
        }else{
            console.error(err)
            toast.error('Failed to create blog')
        }
    }
  }

  if (!user || !(user.is_staff || user.role === 'editor')) {
    return <p className="p-4">Only editors or admins can write blogs.</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6">Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          className="mb-4 bg-white"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Post Blog
        </button>
      </form>
    </div>
  )
}