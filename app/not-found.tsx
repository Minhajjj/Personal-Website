import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#D9D7CB] text-[#211E1F] px-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8 max-w-md">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#211E1F] text-[#D9D7CB] rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </main>
  );
}
