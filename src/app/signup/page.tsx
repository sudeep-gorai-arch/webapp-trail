"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FiEye, FiEyeOff } from "react-icons/fi";

import Navbar from "@/components/website/Navbar";

import { register } from "@/services/authService";

export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const res = await register({
        username,

        email,

        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role?.name === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
      min-h-screen
      text-white
      "
    >
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
          onSubmit={handleSignup}
          className="
          glass

          w-full
          max-w-md

          rounded-[40px]

          p-10

          shadow-2xl
          shadow-purple-900/40
          "
        >
          {/* LOGO */}

          <div
            className="
            flex
            justify-center
            mb-5
            "
          >
            <Image
              src="/logo.png"
              alt="FlexiWalls"
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
            Create Account
          </h1>

          <p
            className="
            text-center

            text-gray-400

            mt-3

            mb-10
            "
          >
            Join FlexiWalls Premium Experience
          </p>

          {error && (
            <div
              className="
              mb-5

              bg-red-500/20

              border
              border-red-500/30

              rounded-xl

              p-3

              text-red-300
              "
            >
              {error}
            </div>
          )}

          {/* USERNAME */}

          <label
            className="
            text-sm
            text-gray-300
            "
          >
            Username
          </label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            required
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
            focus:ring-2
            focus:ring-purple-500/30
            "
          />

          {/* EMAIL */}

          <label
            className="
            text-sm
            text-gray-300
            "
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
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
            focus:ring-2
            focus:ring-purple-500/30
            "
          />

          {/* PASSWORD */}

          <label
            className="
            text-sm
            text-gray-300
            "
          >
            Password
          </label>

          <div
            className="
            relative
            mt-2
            "
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
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
              focus:ring-2
              focus:ring-purple-500/30
              "
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

          {/* BUTTON */}

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
            "
          >
            {loading ? "Creating..." : "Create Account 🚀"}
          </button>

          <p
            className="
            text-center

            mt-8

            text-gray-400
            "
          >
            Already have account?
            <Link
              href="/login"
              className="
              ml-2

              text-purple-300

              font-bold
              "
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
