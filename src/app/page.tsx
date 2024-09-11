import Link from "next/link";

export default function Home() {
  return <main>
    <header className="text-center">
      <h1 className="py-5 text-3xl">Event Manager App</h1>
    </header>
    <div className="flex flex-col gap-y-3 w-[400px] mx-auto">
      <Link className="text-xl px-5 py-10 border border-gray-200 rounded-xl bg-blue-500 hover:bg-blue-800 text-gray-100" href="/user">User Module</Link>
      <Link className="text-xl px-5 py-10 border border-gray-200 rounded-xl bg-blue-500 hover:bg-blue-800 text-gray-100" href="/vendor">Vendor Module</Link>
      <Link className="text-xl px-5 py-10 border border-gray-200 rounded-xl bg-blue-500 hover:bg-blue-800 text-gray-100" href="/admin">Admin Module</Link>
    </div>
  </main>;
}
