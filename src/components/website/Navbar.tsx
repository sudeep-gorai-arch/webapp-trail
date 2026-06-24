"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { FiUser, FiLogOut } from "react-icons/fi";

import { IoColorPaletteOutline } from "react-icons/io5";

import { logout as logoutApi } from "@/services/authService";

interface Role {
  id: string;
  name: "ADMIN" | "USER" | string;
  description?: string | null;
}

interface AuthUser {
  id: string;

  email: string;

  username: string;

  avatarUrl?: string | null;

  role?: Role | null;
}

export default function Navbar() {
  const pathname = usePathname();

  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);

  const [open, setOpen] = useState(false);

  const [themeOpen, setThemeOpen] = useState(false);

  const [theme, setTheme] = useState("dark");

  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsed: AuthUser = JSON.parse(savedUser);

        setUser(parsed);
      } catch {
        localStorage.removeItem("user");

        setUser(null);
      }
    } else {
      setUser(null);
    }

    const savedTheme = localStorage.getItem("theme") || "dark";

    setTheme(savedTheme);

    document.documentElement.setAttribute("data-theme", savedTheme);
  }, [pathname]);

  const isAdmin = user?.role?.name === "ADMIN";

  async function handleLogout() {
    try {
      setLogoutLoading(true);

      // backend logout
      await logoutApi();
    } catch (error) {
      console.log("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      setUser(null);

      setOpen(false);

      router.refresh();

      router.replace("/");

      setLogoutLoading(false);
    }
  }

  function changeTheme(value: string) {
    setTheme(value);

    localStorage.setItem("theme", value);

    document.documentElement.setAttribute("data-theme", value);

    setThemeOpen(false);
  }

  const menus = [
    {
      name: "Home",
      url: "/",
    },

    {
      name: "Categories",
      url: "/categories",
    },

    {
      name: "Premium",
      url: "/premium",
    },

    {
      name: "Favorites",
      url: "/favorites",
    },

    {
      name: "About",
      url: "/about",
    },

    {
      name: "Privacy",
      url: "/privacy-policy",
    },
  ];

  const themes = [
    {
      name: "Light",
      value: "light",
      icon: "☀️",
    },

    {
      name: "Dark",
      value: "dark",
      icon: "🌙",
    },

    {
      name: "Purple",
      value: "purple",
      icon: "💜",
    },

    {
      name: "Ocean",
      value: "ocean",
      icon: "🌊",
    },

    {
      name: "Emerald",
      value: "emerald",
      icon: "💚",
    },

    {
      name: "Sunset",
      value: "sunset",
      icon: "🔥",
    },
  ];

  return (
    <nav
      className="
fixed
top-0
left-0
w-full
z-50
px-8
py-5
flex
items-center
justify-between
glass
"
    >
      {/* LOGO */}

      <Link
        href="/"
        className="
flex
items-center
gap-3
"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={45}
          height={45}
          className="
rounded-xl
shadow-lg
shadow-purple-500/40
"
        />

        <span
          className="
text-3xl
font-black
gradient-text
"
        >
          FlexiWalls
        </span>
      </Link>

      {/* MENU */}

      <div
        className="
hidden
md:flex
gap-10
"
      >
        {menus.map((m) => (
          <Link
            key={m.url}
            href={m.url}
            className={
              pathname === m.url
                ? "theme-text font-bold"
                : "theme-muted hover:opacity-100 opacity-80"
            }
          >
            {m.name}
          </Link>
        ))}
      </div>

      {/* RIGHT */}

      <div
        className="
relative
flex
items-center
gap-4
"
      >
        {/* THEME */}

        <div className="relative">
          <button
            onClick={() => setThemeOpen(!themeOpen)}
            className="
w-11
h-11
rounded-full
glass
flex
items-center
justify-center
text-xl
"
          >
            <IoColorPaletteOutline />
          </button>

          {themeOpen && (
            <div
              className="
absolute
right-0
top-14
w-52
glass
rounded-2xl
p-3
space-y-1
"
            >
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => changeTheme(t.value)}
                  className={`
theme-item
flex
items-center
gap-3
${theme === t.value ? "bg-white/20" : ""}
`}
                >
                  <span>{t.icon}</span>

                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* USER */}

        {user ? (
          <>
            <button
              onClick={() => setOpen(!open)}
              className="
flex
items-center
gap-3
px-4
py-2
rounded-full
glass
"
            >
              <div
                className="
w-9
h-9
rounded-full
bg-gradient-to-r
from-blue-500
to-purple-600
flex
items-center
justify-center
"
              >
                <FiUser />
              </div>

              <span>{user.username}</span>
            </button>

            {open && (
              <div
                className="
absolute
right-0
top-16
w-52
glass
rounded-2xl
p-3
"
              >
                <Link
                  href="/profile"
                  className="
block
px-4
py-3
hover:glass
rounded-xl
"
                >
                  Profile
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="
block
px-4
py-3
hover:glass
rounded-xl
"
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  disabled={logoutLoading}
                  onClick={handleLogout}
                  className="
w-full
flex
items-center
gap-2
px-4
py-3
hover:glass
rounded-xl
"
                >
                  <FiLogOut />

                  {logoutLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div
              className="
w-11
h-11
rounded-full
glass
flex
items-center
justify-center
"
            >
              <FiUser />
            </div>

            {pathname !== "/login" && (
              <Link
                href="/login"
                className="
px-6
py-3
rounded-full
bg-white/10
"
              >
                Login
              </Link>
            )}

            {pathname !== "/signup" && (
              <Link
                href="/signup"
                className="
px-6
py-3
rounded-full
bg-gradient-to-r
from-blue-500
to-purple-600
font-bold
"
              >
                Sign Up
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
