"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Image from "next/image";

import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import WallpaperGrid from "@/components/website/WallpaperGrid";

import { getWallpaperById, getWallpapers } from "@/services/wallpaperService";

import { addDownload } from "@/services/downloadService";

import { Wallpaper } from "@/types/wallpaper";

export default function WallpaperDetails() {
  const params = useParams();

  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  const [similar, setSimilar] = useState<Wallpaper[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [params.id]);

  async function load() {
    try {
      const res = await getWallpaperById(params.id as string);

      setWallpaper(res.data);

      const related = await getWallpapers(
        10,
        0,
        "",
        res.data.category?.slug || "",
      );

      setSimilar(related.data.filter((item) => item.id !== res.data.id));
    } catch (error) {
      console.log("DETAIL ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    if (!wallpaper) return;

    try {
      await addDownload(wallpaper.id);

      // open image

      window.open(wallpaper.imageUrl || wallpaper.thumbnailUrl, "_blank");
    } catch (error) {
      window.open(wallpaper.thumbnailUrl, "_blank");
    }
  }

  if (loading) {
    return (
      <div
        className="
text-white
p-20
"
      >
        Loading...
      </div>
    );
  }

  if (!wallpaper) {
    return (
      <div
        className="
text-white
p-20
"
      >
        Wallpaper not found
      </div>
    );
  }

  const quality = wallpaper.resolution?.includes("7680") ? "8K" : "4K";

  return (
    <main
      className="
min-h-screen

text-white

overflow-hidden
"
    >
      <Navbar />

      <section
        className="
pt-40

px-6
md:px-16

max-w-[1600px]

mx-auto
"
      >
        <div
          className="
grid

grid-cols-1

lg:grid-cols-2

gap-16

items-center
"
        >
          {/* IMAGE */}

          <div
            className="
relative

h-[700px]

rounded-[45px]

overflow-hidden

border
border-white/10

shadow-2xl
shadow-purple-900/40
"
          >
            <Image
              src={wallpaper.thumbnailUrl}
              alt={wallpaper.title}
              fill
              priority
              className="
object-cover
"
            />

            <div
              className="
absolute
top-5
right-5

glass

px-5
py-3

rounded-full

font-black
"
            >
              {quality}
            </div>
          </div>

          {/* DETAILS */}

          <div>
            <div
              className="
inline-flex

glass

px-5
py-2

rounded-full
"
            >
              {wallpaper.category?.name}
            </div>

            <h1
              className="
mt-8

text-6xl

font-black

gradient-text
"
            >
              {wallpaper.title}
            </h1>

            <p
              className="
mt-6

text-gray-400

text-lg
"
            >
              Premium {quality} Ultra HD wallpaper for your device.
            </p>

            <div
              className="
grid

grid-cols-2

gap-5

mt-10
"
            >
              <div className="glass rounded-3xl p-6">
                <h3 className="text-3xl font-bold">❤️ {wallpaper.likes}</h3>

                <p className="text-gray-400">Likes</p>
              </div>

              <div className="glass rounded-3xl p-6">
                <h3 className="text-3xl font-bold">
                  ⬇ {wallpaper.downloadCount}
                </h3>

                <p className="text-gray-400">Downloads</p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="
mt-10

w-full

py-5

rounded-full

bg-gradient-to-r
from-blue-500
via-purple-500
to-pink-500

font-black

text-lg

hover:scale-105

transition
"
            >
              Download Wallpaper ⬇
            </button>
          </div>
        </div>
      </section>

      {/* SIMILAR */}

      <section
        className="
px-6
md:px-16

max-w-[1600px]

mx-auto

mt-24
"
      >
        <h2
          className="
text-4xl

font-black

mb-10
"
        >
          Similar Wallpapers ✨
        </h2>

        <WallpaperGrid wallpapers={similar} />
      </section>

      <Footer />
    </main>
  );
}
