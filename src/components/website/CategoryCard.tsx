"use client";

import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types/category";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="

relative

h-[280px]

rounded-[32px]

overflow-hidden

group

glass

hover:-translate-y-3

transition-all

duration-500

block

"
      style={{
        boxShadow:
          "0 20px 60px color-mix(in srgb,var(--secondary) 30%,transparent)",
      }}
    >
      <Image
        src={
          category.imageUrl ||
          `https://picsum.photos/seed/${category.slug}/800/1200`
        }
        alt={category.name}
        fill
        className="

object-cover

group-hover:scale-125

transition-transform

duration-700

"
      />

      {/* IMAGE OVERLAY */}

      <div
        className="

absolute

inset-0

"
        style={{
          background: `
linear-gradient(
to top,
rgba(0,0,0,.85),
rgba(0,0,0,.35),
transparent
)
`,
        }}
      />

      {/* ICON */}

      <div
        className="

absolute

top-5

right-5

glass

w-14

h-14

rounded-2xl

flex

items-center

justify-center

text-2xl

"
      >
        ✨
      </div>

      {/* CONTENT */}

      <div
        className="

absolute

bottom-0

p-7

text-white

"
      >
        <h2
          className="

text-3xl

font-black

"
        >
          {category.name}
        </h2>

        <p
          className="

mt-2

opacity-80

"
        >
          {category.count ?? 0}
          &nbsp; Wallpapers
        </p>

        <div
          className="

mt-5

inline-flex

px-6

py-3

rounded-full

font-bold

transition

group-hover:scale-105

"
          style={{
            background:
              "linear-gradient(90deg,var(--primary),var(--secondary))",

            boxShadow:
              "0 10px 35px color-mix(in srgb,var(--primary) 40%,transparent)",
          }}
        >
          Explore →
        </div>
      </div>
    </Link>
  );
}
