"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/website/Navbar";

import CategoryCard from "@/components/website/CategoryCard";

import { getCategories } from "@/services/categoryService";

import { Category } from "@/types/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const response = await getCategories();

      setCategories(response.data || []);
    } catch (error) {
      console.log("CATEGORY ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
relative

min-h-screen

text-white

pb-20
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
"
      >
        {/* HEADER */}

        <div
          className="
mb-14
"
        >
          <p
            className="
text-purple-300

font-semibold
"
          >
            Explore Collection ✨
          </p>

          <h1
            className="
mt-3

text-5xl
md:text-7xl

font-black
"
          >
            Wallpaper
            <span
              className="
gradient-text
block
"
            >
              Categories
            </span>
          </h1>

          <p
            className="
mt-5

text-gray-400

max-w-xl
"
          >
            Choose your favorite style from our premium wallpaper collections.
          </p>
        </div>

        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div
            className="
grid

grid-cols-1

sm:grid-cols-2

lg:grid-cols-3

xl:grid-cols-4

gap-8
"
          >
            {categories.map((item) => (
              <CategoryCard key={item.id} category={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
