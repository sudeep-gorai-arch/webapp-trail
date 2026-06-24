"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import WallpaperGrid from "@/components/website/WallpaperGrid";

import { getFavorites } from "@/services/favoriteService";

import { Wallpaper } from "@/types/wallpaper";

export default function FavoritesPage() {
  const router = useRouter();

  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");

      return;
    }

    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const response = await getFavorites();

      /*
Depending on backend:

case 1:
[
 {id, wallpaper:{}}
]

case 2:
[
 wallpapers
]
*/

      const data = response.data.map((item: any) =>
        item.wallpaper ? item.wallpaper : item,
      );

      setWallpapers(data);
    } catch (error) {
      console.log("FAVORITES ERROR", error);
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
pt-40

px-6
md:px-16

max-w-[1700px]

mx-auto

pb-20
"
      >
        {/* HEADER */}

        <div
          className="
flex

items-center

justify-between

mb-14
"
        >
          <div>
            <p
              className="
text-purple-300

font-semibold
"
            >
              Your Collection ❤️
            </p>

            <h1
              className="
text-5xl
md:text-7xl

font-black

mt-3
"
            >
              Favorite
              <span
                className="
gradient-text

block
"
              >
                Wallpapers
              </span>
            </h1>

            <p
              className="
text-gray-400

mt-5
"
            >
              All wallpapers you love in one place.
            </p>
          </div>

          <div
            className="
hidden
md:flex

glass

rounded-3xl

px-8
py-5

text-xl

font-bold
"
          >
            ❤️ {wallpapers.length}
          </div>
        </div>

        {loading ? (
          <div
            className="
glass

rounded-[30px]

p-10

text-center

text-gray-300
"
          >
            Loading favorites...
          </div>
        ) : wallpapers.length === 0 ? (
          <div
            className="
glass

rounded-[40px]

p-20

text-center
"
          >
            <h2
              className="
text-4xl

font-black
"
            >
              No Favorites Yet 😢
            </h2>

            <p
              className="
text-gray-400

mt-5
"
            >
              Explore wallpapers and tap the heart icon to save them here.
            </p>

            <button
              onClick={() => router.push("/")}
              className="
mt-10

px-10
py-4

rounded-full

bg-gradient-to-r

from-blue-500

to-purple-600

font-bold
"
            >
              Explore Wallpapers
            </button>
          </div>
        ) : (
          <WallpaperGrid wallpapers={wallpapers} />
        )}
      </section>

      <Footer />
    </main>
  );
}
