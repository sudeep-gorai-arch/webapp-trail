import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const links = [
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
      name: "Privacy",
      url: "/privacy-policy",
    },
  ];

  return (
    <footer
      className="
mt-24

border-t
border-white/10

px-6
md:px-16

py-12
"
    >
      <div
        className="
max-w-[1600px]

mx-auto

flex
flex-col
md:flex-row

justify-between

gap-10
"
      >
        {/* BRAND */}

        <div>
          <div
            className="
flex
items-center
gap-3
"
          >
            <Image
              src="/logo.png"
              alt="FlexiWalls"
              width={45}
              height={45}
              className="
rounded-xl
"
            />

            <h2
              className="
text-3xl

font-black

gradient-text
"
            >
              FlexiWalls
            </h2>
          </div>

          <p
            className="
text-gray-400

max-w-sm

mt-5
"
          >
            Premium wallpapers platform for 4K & 8K collections.
          </p>
        </div>

        {/* LINKS */}

        <div
          className="
flex
gap-8
flex-wrap
"
        >
          {links.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="
text-gray-400

hover:text-white

transition
"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div
        className="
text-center

text-gray-500

mt-12
"
      >
        © {new Date().getFullYear()} FlexiWalls. All rights reserved.
      </div>
    </footer>
  );
}
