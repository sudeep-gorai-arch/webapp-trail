"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FiHeart, FiDownload, FiMoreVertical, FiShare2 } from "react-icons/fi";

import { Wallpaper } from "@/types/wallpaper";

import { addFavorite } from "@/services/favoriteService";

import { addDownload } from "@/services/downloadService";

export default function WallpaperCard({ wallpaper }: { wallpaper: Wallpaper }) {
  const router = useRouter();

  const [menu, setMenu] = useState(false);

  const [liked, setLiked] = useState(false);

  const image =
    wallpaper.imageUrl ||
    wallpaper.thumbnailUrl ||
    "https://picsum.photos/400/800";

  function checkLogin() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");

      return false;
    }

    return true;
  }

  async function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();

    if (!checkLogin()) return;

    try {
      await addFavorite(wallpaper.id);

      setLiked(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDownload(e: React.MouseEvent) {
    e.preventDefault();

    try {
      await addDownload(wallpaper.id);

      window.open(image, "_blank");
    } catch (error) {
      window.open(image, "_blank");
    }
  }

  return (
    <Link
      href={`/wallpaper/${wallpaper.id}`}
      className="
relative

h-[360px]

rounded-[30px]

overflow-hidden

group

border
border-white/10

bg-white/5

block

hover:-translate-y-2

transition-all

duration-500

shadow-xl
shadow-purple-950/30
"
    >
      <Image
        src={image}
        alt={wallpaper.title || "Wallpaper"}
        fill
        sizes="300px"
        className="
object-cover

group-hover:scale-110

transition

duration-700
"
      />

      {/* DARK OVERLAY */}

      <div
        className="
absolute

inset-0

bg-gradient-to-t

from-black

via-black/20

to-transparent
"
      />

      {/* TOP ACTIONS */}

      <div
        className="
absolute

top-4

right-4

flex

gap-3
"
      >
        <button
          onClick={handleFavorite}
          className="
w-10
h-10

rounded-full

glass

flex
items-center
justify-center

hover:scale-110

transition
"
        >
          <FiHeart className={liked ? "text-red-500 fill-red-500" : ""} />
        </button>

        <div
          className="
relative
"
        >
          <button
            onClick={(e) => {
              e.preventDefault();

              setMenu(!menu);
            }}
            className="
w-10
h-10

rounded-full

glass

flex

items-center

justify-center
"
          >
            <FiMoreVertical />
          </button>

          {menu && (
            <div
              className="
absolute

right-0

top-12

w-40

glass

rounded-2xl

p-2

z-20
"
            >
              <button
                onClick={handleDownload}
                className="
flex
gap-2

items-center

w-full

px-3
py-2

rounded-xl

hover:bg-white/10
"
              >
                <FiDownload />
                Download
              </button>

              <button
                className="
flex

gap-2

items-center

w-full

px-3
py-2

rounded-xl

hover:bg-white/10
"
              >
                <FiShare2 />
                Share
              </button>
            </div>
          )}
        </div>
      </div>

      {/* QUALITY */}

      <div
        className="
absolute

top-4

left-4

glass

px-4
py-2

rounded-full

text-xs

font-bold
"
      >
        {wallpaper.resolution?.includes("7680") ? "8K" : "4K"}
      </div>

      {/* DETAILS */}

      <div
        className="
absolute

bottom-0

p-5

w-full
"
      >
        <h3
          className="
font-black

text-lg
"
        >
          {wallpaper.title}
        </h3>

        <div
          className="
flex

justify-between

items-center

mt-3

text-sm

text-gray-300
"
        >
          <span>❤️ {wallpaper.likes ?? 0}</span>

          <span>⬇ {wallpaper.downloadCount ?? 0}</span>
        </div>
      </div>
    </Link>
  );
}
