import axios from "@/utils/axios";
import BlogCard from "@/components/BlogCard";
import { Blog } from '@/types/blog'

async function fetchBlogs(): Promise<Blog[]> {
  const res = await axios.get("/blog/blogs/");
  return res.data;
}

export default async function BlogListPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white pb-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-12 pb-8 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2 drop-shadow">All Blogs</h1>
        <p className="text-lg text-gray-600 mb-6">Explore investment pitches, Shark Tank recaps, and more from the InvestNath community.</p>
      </div>
      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
      {blogs.length === 0 && (
        <div className="text-center text-gray-500 mt-12 text-lg">No blogs found. Be the first to write one!</div>
      )}
    </div>
  );
}
