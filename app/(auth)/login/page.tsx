"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGIN } from "@/utils/constants";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setCredential((prev) => ({ ...prev, loading: true }));

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_LOGIN_URL + LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });

      const response = await res.json();

      if (res.ok) {
        setCredential((prev) => ({ ...prev, loading: false }));
        localStorage.setItem("access_token", response.access_token);
        router.push("/");
      } else {
        toast.error(
          response?.message || "Invalid credentials! Please try again."
        );
        setCredential((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      toast.error(
        "Unable to sign in. Please check your connection and try again."
      );
      setCredential((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Audit Report System
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={credential.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={credential.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={credential.loading}
              className="disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {credential.loading ? (
                <div className="flex items-center justify-center gap-1">
                  <Spinner /> Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
