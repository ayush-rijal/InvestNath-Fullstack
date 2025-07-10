import Link from "next/link";
import Image from "next/image";

type BlogCardProps = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  author_username: string;
  created_at: string;
};

export default function BlogCard({
  title,
  slug,
  thumbnail,
  author_username,
  created_at,
}: BlogCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Link href={`/blogs/${slug}`}>
        <h2 className="text-xl font-bold text-blue-700 hover:underline">
          {" "}
          {title}{" "}
        </h2>
      </Link>

      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={192}
          className="w-full h-48 object-cover rounded mt-3"
        />
      )}
      <p className="text-sm text-gray-600 mt-2">
        by <span className="font-semibold">{author_username}</span> on{" "}
        {new Date(created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
