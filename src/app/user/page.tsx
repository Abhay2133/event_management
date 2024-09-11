import Link from "next/link";

export default function User(props: any) {
  return (
    <main>
      <header className="text-center py-6 bg-blue-800 text-gray-200 text-3xl">
        Welcome User
      </header>
      <div className="flex flex-col py-5 w-[500px] px-5 gap-2 mx-auto border border-gray-300 shadow-md mt-3 rounded-xl justify-center">
        <Link
          href="/user/vendors"
          className="px-8 hover:bg-[#3c63dd] py-3 rounded-md bg-[#3c63b0] text-gray-200"
        >
          Vendors
        </Link>
        <Link
          href="/user/guests"
          className="px-8 hover:bg-[#3c63dd] py-3 rounded-md bg-[#3c63b0] text-gray-200"
        >
          Guest List
        </Link>
        <Link
          href="/user/cart"
          className="px-8 hover:bg-[#3c63dd] py-3 rounded-md bg-[#3c63b0] text-gray-200"
        >
          Cart
        </Link>
        <Link
          href="/user/orders"
          className="px-8 hover:bg-[#3c63dd] py-3 rounded-md bg-[#3c63b0] text-gray-200"
        >
          Order Status
        </Link>
        <Link
          href="/user/logout"
          className=" mt-8 hover:bg-[#3c63dd] text-center block py-3 px-8 bg-[#3c63b0] rounded-full text-gray-100"
        >
          Logout
        </Link>
      </div>
    </main>
  );
}
