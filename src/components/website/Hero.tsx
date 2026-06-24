"use client";

import Link from "next/link";

import { FiSearch, FiDownload } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      className="
      relative

      pt-40
      pb-20

      px-6
      md:px-16

      overflow-hidden
      "
    >
      {/* Glow */}

      <div
        className="
        absolute
        top-10
        left-20

        w-[400px]
        h-[400px]

        bg-purple-600/30

        blur-[150px]

        -z-10
        "
      />

      <div
        className="
        max-w-[1600px]
        mx-auto

        grid
        grid-cols-1
        lg:grid-cols-2

        gap-16

        items-center
        "
      >
        {/* LEFT */}

        <div>
          <div
            className="
            inline-flex

            glass

            rounded-full

            px-5
            py-2

            mb-6
            "
          >
            🚀 New 8K Wallpapers Daily
          </div>

          <h1
            className="
            text-5xl
            md:text-7xl

            font-black

            leading-tight
            "
          >
            Discover
            <span
              className="
              block
              gradient-text
              "
            >
              Stunning Wallpapers
            </span>
          </h1>

          <p
            className="
            mt-6

            max-w-xl

            text-lg

            text-gray-400

            leading-8
            "
          >
            Personalize your devices with premium 4K and 8K wallpapers across
            Anime, Gaming, Cars, Nature and Space.
          </p>

          {/* SEARCH */}

          <div
            className="
            mt-10

            max-w-lg

            glass

            rounded-full

            px-5
            py-4

            flex
            items-center

            gap-4
            "
          >
            <FiSearch
              className="
              text-purple-300
              "
            />

            <input
              placeholder="Search wallpapers..."
              className="
              flex-1

              bg-transparent

              outline-none

              text-white
              "
            />
          </div>

          <div
            className="
            flex
            gap-5

            mt-10
            "
          >
            <Link
              href="/categories"
              className="
              px-8
              py-4

              rounded-full

              bg-gradient-to-r
              from-blue-500
              to-purple-600

              font-bold
              "
            >
              Explore Now
            </Link>

            <button
              className="
              glass

              px-8
              py-4

              rounded-full

              flex
              items-center

              gap-2
              "
            >
              <FiDownload />
              Download App
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}

        <div
          className="
          hidden
          lg:block

          relative

          h-[500px]
          "
        >
          <div
            className="
            absolute
            right-10

            w-[280px]
            h-[480px]

            rounded-[40px]

            bg-gradient-to-br

            from-blue-500

            via-purple-500

            to-pink-500


            rotate-6

            shadow-2xl
            shadow-purple-700/50
            "
          />

          <div
            className="
            absolute
            right-40
            top-16

            w-[250px]
            h-[430px]

            rounded-[40px]

            glass

            -rotate-6
            "
          />
        </div>
      </div>
    </section>
  );
}
