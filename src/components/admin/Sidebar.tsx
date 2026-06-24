"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import {
  FiHome,
  FiImage,
  FiUsers,
  FiGrid,
  FiSettings,
  FiUpload,
  FiLogOut,
  FiMessageSquare,
} from "react-icons/fi";

import { logout as logoutApi } from "@/services/authService";

export default function Sidebar() {
  const path = usePathname();

  const router = useRouter();

  const [logoutLoading, setLogoutLoading] = useState(false);

  async function handleLogout() {
    try {
      setLogoutLoading(true);

      /**
       * backend logout
       * user_sessions:
       * isActive = false
       * logoutAt = now()
       */
      await logoutApi();
    } catch (error) {
      console.log("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      router.refresh();

      router.replace("/login");

      setLogoutLoading(false);
    }
  }

  const menu = [
    {
      name: "Dashboard",
      url: "/admin",
      icon: FiHome,
    },

    {
      name: "Wallpapers",
      url: "/admin/wallpapers",
      icon: FiImage,
    },

    {
      name: "Upload",
      url: "/admin/wallpapers/upload",
      icon: FiUpload,
    },

    {
      name: "Categories",
      url: "/admin/categories",
      icon: FiGrid,
    },

    {
      name: "Users",
      url: "/admin/users",
      icon: FiUsers,
    },

    {
      name: "Complaints",
      url: "/admin/complaints",
      icon: FiMessageSquare,
    },

    {
      name: "Settings",
      url: "/admin/settings",
      icon: FiSettings,
    },
  ];

  return (
    <aside
      className="
relative
w-72
min-h-screen
p-6
flex
flex-col
border-r
border-white/10
"
      style={{
        background: `

linear-gradient(

180deg,

color-mix(
in srgb,
var(--secondary) 35%,
transparent
),

rgba(0,0,0,.15)

)

`,
      }}
    >
      {/* LOGO */}

      <Link
        href="/admin"
        className="
flex
items-center
gap-3
mb-12
"
      >
        <div
          className="
w-12
h-12
rounded-2xl
glass
flex
items-center
justify-center
overflow-hidden
"
        >
          <Image src="/logo.png" alt="logo" width={40} height={40} />
        </div>

        <div>
          <h1
            className="
text-xl
font-black
gradient-text
"
          >
            FlexiWalls
          </h1>

          <p
            className="
text-xs
theme-muted
"
          >
            Admin Panel
          </p>
        </div>
      </Link>

      {/* MENU */}

      <nav
        className="
flex-1
space-y-3
"
      >
        {menu.map((item) => {
          const active = path === item.url;

          const Icon = item.icon;

          return (
            <Link
              key={item.url}
              href={item.url}
              className="
flex
items-center
gap-4
px-5
py-4
rounded-2xl
transition-all
duration-300
group
"
              style={{
                background: active
                  ? "linear-gradient(90deg,var(--primary),var(--secondary))"
                  : "transparent",

                color: active ? "white" : "var(--text-main)",
              }}
            >
              <span
                className="
text-xl
group-hover:scale-125
transition
"
              >
                <Icon />
              </span>

              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}

      <button
        disabled={logoutLoading}
        onClick={handleLogout}
        className="
mb-5
flex
items-center
gap-4
px-5
py-4
rounded-2xl
glass
transition
hover:scale-105
disabled:opacity-60
"
      >
        <FiLogOut className="text-xl" />

        <span className="font-semibold">
          {logoutLoading ? "Logging out..." : "Logout"}
        </span>
      </button>

      {/* FOOTER */}

      <div
        className="
glass
rounded-[28px]
p-5
"
      >
        <p className="font-bold mb-2">🚀 Pro Manager</p>

        <p
          className="
text-sm
theme-muted
"
        >
          Control wallpapers, users and premium content.
        </p>
      </div>
    </aside>
  );
}
