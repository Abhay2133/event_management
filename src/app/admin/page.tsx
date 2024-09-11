import Link from "next/link";

export default function Vendor(props: any) {
  return (
    <main>
      <h1 className="text-center text-3xl p-5 bg-[#3b54b8] text-gray-100">
        Welcome Admin
      </h1>
      <div className="border border-gray-300 rounded-xl  mt-3 shadow-md flex flex-col gap-3 [&>*]:px-10  [&>*]:bg-[#3b54b8]  [&>*]:text-gray-100   text-xl  w-[400px] p-5 mx-auto">
        <Link
          href="/admin/maintain/users"
          className="hover:bg-[#312e86] py-10 rounded-lg"
        >
          Mantain Users
        </Link>
        <Link
          href="/admin/maintain/vendors"
          className="hover:bg-[#312e86] py-10 rounded-lg"
        >
          Maintain Vendors
        </Link>
        <a
          href="/api/logout"
          className="hover:bg-[#312e86] py-3 rounded-full mt-6"
        >
          Logout
        </a>
      </div>
    </main>
  );
}
