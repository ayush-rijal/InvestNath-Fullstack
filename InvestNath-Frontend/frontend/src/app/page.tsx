import Image from "next/image";
import Link from "next/link";
import axios from "@/utils/axios";
import BlogCard from "@/components/BlogCard";
import { Blog } from '@/types/blog';

async function fetchLatestBlogs(): Promise<Blog[]> {
  const res = await axios.get("/blog/blogs/");
  return res.data.slice(0, 3); // Show 3 latest
}

export default async function Home() {
  const latestBlogs = await fetchLatestBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white pb-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-16 pb-10 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow">Welcome to InvestNath</h1>
        <p className="text-xl text-gray-700 mb-6">Your hub for investment pitches, Shark Tank recaps, and entrepreneurial inspiration.</p>
        <Link href="/blogs" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow transition">Read Blogs</Link>
      </section>

      {/* What is InvestNath Section */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">What is InvestNath?</h2>
        <p className="text-gray-600 text-lg mb-4">InvestNath is a platform where you can share and discover investment pitches, read insightful recaps of Shark Tank episodes, and get inspired by real entrepreneurial journeys. Whether you're an aspiring founder, an investor, or a fan of Shark Tank, you'll find something valuable here.</p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="flex flex-col items-center">
            <Image src="/globe.svg" alt="Pitch" width={48} height={48} />
            <span className="mt-2 text-blue-700 font-semibold">Pitch Ideas</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/window.svg" alt="Recap" width={48} height={48} />
            <span className="mt-2 text-blue-700 font-semibold">Shark Tank Recaps</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/file.svg" alt="Learn" width={48} height={48} />
            <span className="mt-2 text-blue-700 font-semibold">Learn & Grow</span>
          </div>
        </div>
      </section>

      {/* Latest Blogs Preview */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Latest Blogs</h2>
          <Link href="/blogs" className="text-blue-600 hover:underline font-medium">View All</Link>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {latestBlogs.length > 0 ? (
            latestBlogs.map((blog) => <BlogCard key={blog.id} {...blog} />)
          ) : (
            <div className="text-gray-500 col-span-3 text-center">No blogs yet. Be the first to write one!</div>
          )}
        </div>
      </section>
    </div>
  );
}
