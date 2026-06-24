"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FiEye, FiEyeOff } from "react-icons/fi";

import Navbar from "@/components/website/Navbar";

import { login } from "@/services/authService";

import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/");
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await login({
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      /**
       * Role based redirect
       */
      const role = typeof user.role === "string" ? user.role : user.role?.name;

      if (role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <section
        className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        pt-28
        "
      >
        <form
          onSubmit={handleLogin}
          className="
          glass
          relative
          w-full
          max-w-md
          rounded-[40px]
          p-10
          shadow-2xl
          shadow-purple-900/40
          "
        >
          <div className="flex justify-center mb-5">
            <Image
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
              className="
              rounded-2xl
              shadow-lg
              shadow-purple-500/50
              "
            />
          </div>

          <h1
            className="
            text-center
            text-5xl
            font-black
            gradient-text
            "
          >
            Welcome Back
          </h1>

          <p
            className="
            text-center
            text-gray-400
            mt-3
            mb-10
            "
          >
            Access your FlexiWalls account
          </p>

          {error && (
            <div
              className="
              mb-5
              rounded-xl
              p-3
              bg-red-500/20
              border
              border-red-500/30
              text-red-300
              "
            >
              {error}
            </div>
          )}

          <label className="text-sm text-gray-300">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="
            mt-2
            mb-5
            w-full
            px-5
            py-4
            rounded-2xl
            bg-white/10
            border
            border-white/10
            outline-none
            focus:border-purple-500
            "
            required
          />

          <label className="text-sm text-gray-300">Password</label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
              w-full
              px-5
              py-4
              pr-14
              rounded-2xl
              bg-white/10
              border
              border-white/10
              outline-none
              focus:border-purple-500
              "
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-white
              "
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            disabled={loading}
            className="
            mt-8
            w-full
            py-4
            rounded-full
            bg-gradient-to-r
            from-blue-500
            via-purple-500
            to-pink-500
            font-black
            hover:scale-[1.03]
            transition
            disabled:opacity-60
            "
          >
            {loading ? "Signing in..." : "Login 🚀"}
          </button>

          <p
            className="
            text-center
            text-gray-400
            mt-8
            "
          >
            New to FlexiWalls?
            <Link
              href="/signup"
              className="
              ml-2
              text-purple-300
              font-bold
              "
            >
              Create Account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
