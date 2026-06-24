import Image from "next/image";

import { Wallpaper } from "@/types/wallpaper";

export default function HeroWallpaper({ item }: { item: Wallpaper }) {
  const quality = item.resolution?.includes("7680") ? "8K" : "4K";

  return (
    <div
      className="

relative

snap-center

min-w-[330px]

md:min-w-[430px]

h-[520px]

rounded-[32px]

overflow-hidden

glass

group

shadow-xl

hover:-translate-y-2

transition-all

duration-500

"
      style={{
        boxShadow:
          "0 20px 60px color-mix(in srgb,var(--secondary) 35%,transparent)",
      }}
    >
      <Image
        src={item.thumbnailUrl}
        alt={item.title}
        fill
        priority
        className="

object-cover

group-hover:scale-110

transition-transform

duration-700

"
      />

      {/* OVERLAY */}

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
rgba(0,0,0,.25),
transparent
)

`,
        }}
      />

      {/* CATEGORY */}

      <div
        className="

absolute

top-5

left-5

px-4

py-2

rounded-full

glass

text-sm

font-medium

"
      >
        {item.category?.name}
      </div>

      {/* QUALITY */}

      <div
        className="

absolute

top-5

right-5

px-4

py-2

rounded-full

glass

font-bold

"
      >
        {quality}
      </div>

      {/* CONTENT */}

      <div
        className="

absolute

bottom-0

p-7

w-full

text-white

"
      >
        <h1
          className="

text-4xl

font-black

tracking-tight

"
        >
          {item.title}
        </h1>

        <p
          className="

mt-2

opacity-80

"
        >
          Premium {quality} Wallpaper Collection
        </p>

        <div
          className="

mt-6

flex

items-center

justify-between

"
        >
          <button
            className="

px-7

py-3

rounded-full

font-bold

shadow-lg

transition

hover:scale-105

"
            style={{
              background:
                "linear-gradient(90deg,var(--primary),var(--secondary))",

              boxShadow:
                "0 10px 30px color-mix(in srgb,var(--primary) 40%,transparent)",
            }}
          >
            Explore →
          </button>

          <div
            className="

text-sm

space-x-3

"
          >
            <span>❤️ {item.likes}</span>

            <span>⬇ {item.downloadCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
