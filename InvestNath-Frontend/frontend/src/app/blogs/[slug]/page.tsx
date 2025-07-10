
import api from '@/utils/axios'
import { Blog } from '@/types/blog'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface BlogPageProps {
  params: { slug: string }
}

export default async function BlogPage({ params }: BlogPageProps) {
  let blog: Blog | null = null

  try {
    const res = await api.get(`/blog/blogs/${params.slug}/`)
    blog = res.data
  } catch (err) {
    console.error('Blog not found', err)
    notFound()
  }

  if (!blog) return null

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-2">
        by {blog.author_username} • {new Date(blog.created_at).toLocaleDateString()}
      </p>
      {blog.thumbnail && (
        <Image
          src={blog.thumbnail}
          alt="Thumbnail"
          width={800}
          height={400}
          className="rounded mb-6"
        />
      )}
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  )
}
