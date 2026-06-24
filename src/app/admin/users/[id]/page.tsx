"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { FiArrowLeft, FiSlash, FiCheckCircle } from "react-icons/fi";

export default function Page() {
  const params = useParams();

  const router = useRouter();

  const [blocked, setBlocked] = useState(false);

  const user = {
    username: "Shubham",

    email: "admin@test.com",

    bio: "Wallpaper lover",

    role: "ADMIN",

    premium: true,

    premiumUntil: "2026-12-20",

    downloads: 500,

    favorites: 120,

    likes: 90,

    joined: "2026-01-01",
  };

  return (
    <div className="theme-text">
      {/* TOP BAR */}

      <div
        className="

flex

justify-between

items-center

mb-8

"
      >
        <button
          onClick={() => router.back()}
          className="

glass

px-6

py-3

rounded-full

flex

items-center

gap-3

hover:scale-105

transition

"
        >
          <FiArrowLeft />
          Back
        </button>

        <button
          onClick={() => setBlocked(!blocked)}
          className="

px-6

py-3

rounded-full

flex

items-center

gap-3

font-bold

hover:scale-105

transition

"
          style={{
            background: blocked
              ? "linear-gradient(90deg,#22c55e,#16a34a)"
              : "linear-gradient(90deg,#ef4444,#dc2626)",

            color: "white",
          }}
        >
          {blocked ? <FiCheckCircle /> : <FiSlash />}

          {blocked ? "Unblock User" : "Block User"}
        </button>
      </div>

      {/* PROFILE CARD */}

      <div
        className="

glass

rounded-[40px]

p-10

"
      >
        <div
          className="

flex

justify-between

items-start

"
        >
          <div>
            <h1
              className="

text-5xl

font-black

gradient-text

"
            >
              {user.username}
            </h1>

            <p className="theme-muted mt-2">{user.email}</p>

            <p className="theme-muted">User ID : {params.id}</p>
          </div>

          <div
            className="

glass

px-6

py-3

rounded-full

font-bold

"
          >
            {blocked ? "🚫 Blocked" : "🟢 Active"}
          </div>
        </div>

        <p
          className="

mt-8

theme-muted

"
        >
          {user.bio}
        </p>

        {/* DETAILS */}

        <div
          className="

grid

grid-cols-3

gap-6

mt-10

"
        >
          <div className="glass p-6 rounded-3xl">
            <p className="theme-muted">Role</p>

            <h2 className="text-2xl font-bold">{user.role}</h2>
          </div>

          <div className="glass p-6 rounded-3xl">
            <p className="theme-muted">Subscription</p>

            <h2 className="text-2xl font-bold">
              {user.premium ? "👑 Premium" : "🆓 Free"}
            </h2>

            <p className="theme-muted text-sm">Until {user.premiumUntil}</p>
          </div>

          <div className="glass p-6 rounded-3xl">
            <p className="theme-muted">Joined</p>

            <h2 className="text-2xl font-bold">{user.joined}</h2>
          </div>

          <div className="glass p-6 rounded-3xl">
            <p className="theme-muted">Downloads</p>

            <h2 className="text-3xl font-black">⬇ {user.downloads}</h2>
          </div>

          <div className="glass p-6 rounded-3xl">
            <p className="theme-muted">Favorites</p>

            <h2 className="text-3xl font-black">❤️ {user.favorites}</h2>
          </div>

          <div className="glass p-6 rounded-3xl">
            <p className="theme-muted">Likes</p>

            <h2 className="text-3xl font-black">👍 {user.likes}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
