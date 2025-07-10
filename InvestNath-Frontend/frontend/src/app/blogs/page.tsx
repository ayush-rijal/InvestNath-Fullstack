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
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
}
