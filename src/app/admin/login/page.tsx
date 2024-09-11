"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setVerified] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/verify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "Admin" }),
    })
      .then(async (response: any) => {
        let data = await response.json();
        console.table({ data });
        if (data.type == "error") return setVerified(false);
        router.replace("/admin");
      })
      .catch((e: any) => {
        console.log(e);
        setVerified(false);
      });
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Redirect user on successful login
        router.replace("/admin");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return isVerified ? (
    <div className=" gap-5 flex h-screen w-full justify-center items-center text-lg">
      <div className="animate-spin h-[30px] aspect-square border-[5px] border-[#00000044] border-t-blue-600 rounded-full "></div>
      Loading
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-gray-800 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full  text-gray-800 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
}
