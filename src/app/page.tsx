"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Navbar from "@/components/website/Navbar";
import Hero from "@/components/website/Hero";
import HeroWallpaper from "@/components/website/HeroWallpaper";
import WallpaperGrid from "@/components/website/WallpaperGrid";
import PremiumBanner from "@/components/website/PremiumBanner";
import Footer from "@/components/website/Footer";

import {
  getFeaturedWallpapers,
  getTrendingWallpapers,
} from "@/services/wallpaperService";

import { Wallpaper } from "@/types/wallpaper";

export default function Home() {
  const [featured, setFeatured] = useState<Wallpaper[]>([]);

  const [trending, setTrending] = useState<Wallpaper[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const [hero, trend] = await Promise.all([
        getFeaturedWallpapers(),

        getTrendingWallpapers(),
      ]);

      setFeatured(hero.data || []);

      setTrending(trend.data || []);
    } catch (error) {
      console.log("HOME ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="

relative

min-h-screen

overflow-x-hidden

"
      style={{
        color: "var(--text-main)",
      }}
    >
      {/* THEME BACKGROUND GLOW */}

      <div
        className="

fixed

top-0

left-10

w-[500px]

h-[500px]

blur-[170px]

-z-10

"
        style={{
          background: "var(--secondary)",

          opacity: 0.3,
        }}
      />

      <div
        className="

fixed

bottom-0

right-10

w-[500px]

h-[500px]

blur-[170px]

-z-10

"
        style={{
          background: "var(--primary)",

          opacity: 0.25,
        }}
      />

      <Navbar />

      {/* HERO */}

      <Hero />

      {/* FEATURED */}

      <section
        className="

px-6

md:px-16

max-w-[1700px]

mx-auto

mt-10

"
      >
        <div
          className="

flex

items-center

justify-between

mb-10

"
        >
          <div>
            <p
              className="font-semibold"
              style={{
                color: "var(--accent)",
              }}
            >
              Editor's Choice ⭐
            </p>

            <h2
              className="

text-4xl

font-black

"
            >
              Featured Wallpapers
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="opacity-60">Loading wallpapers...</div>
        ) : (
          <div
            className="

flex

gap-8

overflow-x-auto

no-scrollbar

pb-10

"
          >
            {featured.map((item) => (
              <HeroWallpaper key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* CATEGORIES */}

      <section
        className="

px-6

md:px-16

max-w-[1700px]

mx-auto

mt-16

"
      >
        <h2
          className="

text-4xl

font-black

mb-8

"
        >
          Explore Categories ✨
        </h2>

        <div
          className="

flex

flex-wrap

gap-5

"
        >
          {["Anime", "Nature", "Cars", "Space", "Gaming", "Animals"].map(
            (item) => (
              <Link
                href={`/categories/${item.toLowerCase()}`}
                key={item}
                className="

glass

px-8

py-4

rounded-full

transition

hover:scale-105

"
              >
                {item}
              </Link>
            ),
          )}
        </div>
      </section>

      {/* TRENDING */}

      <section
        className="

px-6

md:px-16

max-w-[1700px]

mx-auto

mt-20

"
      >
        <div
          className="

flex

justify-between

items-center

mb-10

"
        >
          <h2
            className="

text-4xl

font-black

"
          >
            Trending 🔥
          </h2>

          <Link
            href="/wallpapers"
            className="transition"
            style={{
              color: "var(--accent)",
            }}
          >
            View all
          </Link>
        </div>

        {loading ? <p>Loading...</p> : <WallpaperGrid wallpapers={trending} />}
      </section>

      {/* PREMIUM */}

      <section
        className="

px-6

md:px-16

max-w-[1500px]

mx-auto

mt-24

"
      >
        <PremiumBanner />
      </section>

      <Footer />
    </main>
  );
}
