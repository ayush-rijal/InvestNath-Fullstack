"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="p-4 bg-gray-100 flex justify-between">
      <h1 className="text-xl font-bold">InvestNath</h1>

      {user ? (
        <button onClick={handleLogout} className="text-red-600">
          Logout
        </button>
      ) : (
        <span>Guest</span>
      )}
    </nav>
  );
}
