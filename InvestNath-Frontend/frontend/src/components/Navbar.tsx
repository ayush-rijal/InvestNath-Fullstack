"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-30 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-lg border-b border-blue-800/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-yellow-300 transition">
          <span className="inline-block w-8 h-8 bg-white text-blue-700 rounded-full flex items-center justify-center font-extrabold shadow">IN</span>
          <span className="hidden sm:inline drop-shadow">InvestNath</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-base font-medium">
          <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link href="/blogs" className="hover:text-yellow-300 transition">Blogs</Link>
          {user  && (
            <Link href="/profile" className="hover:text-yellow-300 transition">Profile</Link>
          )}
          {user && (user.is_editor) && (
            <Link href="/blogs/create" className="hover:text-yellow-300 transition">Create Blog</Link>
          )}
          {!user ? (
            <>
              <Link href="/login" className="hover:text-yellow-300 transition">Login</Link>
              <Link href="/register" className="hover:text-yellow-300 transition">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-red-200 hover:text-yellow-300 hover:underline ml-2 transition">Logout</button>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center px-2 py-1 border border-blue-300 rounded text-white hover:bg-blue-800/40 focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 border-t border-blue-800/30 shadow px-4 py-2 flex flex-col gap-2 text-white">
          <Link href="/" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/blogs" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Blogs</Link>
          {user && (
            <Link href="/dashboard" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          )}
          {user && (user.is_staff || user.is_editor) && (
            <Link href="/blogs/create" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Create Blog</Link>
          )}
          {!user ? (
            <>
              <Link href="/login" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/register" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          ) : (
            <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="text-red-200 hover:text-yellow-300 hover:underline text-left transition">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
}
