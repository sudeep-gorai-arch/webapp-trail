"use client";

import { useEffect, useState } from "react";

import { FiBell, FiSearch } from "react-icons/fi";

import { IoColorPaletteOutline } from "react-icons/io5";

export default function Header() {
  const [themeOpen, setThemeOpen] = useState(false);

  const [theme, setTheme] = useState("dark");

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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";

    setTheme(savedTheme);

    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  function changeTheme(value: string) {
    setTheme(value);

    localStorage.setItem("theme", value);

    document.documentElement.setAttribute("data-theme", value);

    setThemeOpen(false);
  }

  return (
    <header
      className="

flex

justify-between

items-center

mb-10

"
    >
      {/* SEARCH */}

      <div
        className="

glass

rounded-full

px-6

py-3

flex

items-center

gap-3

w-[500px]

"
      >
        <FiSearch />

        <input
          className="

bg-transparent

outline-none

flex-1

theme-text

placeholder:opacity-60

"
          placeholder="Search wallpapers, users..."
        />
      </div>

      <div
        className="

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

glass

w-12

h-12

rounded-full

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

z-50

"
            >
              {themes.map((item) => (
                <button
                  key={item.value}
                  onClick={() => changeTheme(item.value)}
                  className={`

theme-item

flex

items-center

gap-3

${theme === item.value ? "bg-white/20" : ""}

`}
                >
                  <span>{item.icon}</span>

                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NOTIFICATION */}

        <div
          className="

glass

w-12

h-12

rounded-full

flex

items-center

justify-center

"
        >
          <FiBell />
        </div>

        {/* ADMIN */}

        <div
          className="

glass

px-5

h-12

rounded-full

flex

items-center

font-bold

"
        >
          Admin
        </div>
      </div>
    </header>
  );
}
