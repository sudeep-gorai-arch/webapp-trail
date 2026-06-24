import Navbar from "@/components/website/Navbar";

export default function About() {
  const features = [
    {
      title: "Premium Quality",
      desc: "Explore hand-picked 4K and 8K ultra HD wallpapers optimized for every device.",
      icon: "💎",
    },

    {
      title: "Fresh Collections",
      desc: "New wallpapers and trending categories are added regularly.",
      icon: "🚀",
    },

    {
      title: "Made For Everyone",
      desc: "Anime, Gaming, Nature, Cars, Space and more collections in one place.",
      icon: "🌎",
    },
  ];

  return (
    <main
      className="
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

max-w-[1400px]

mx-auto
"
      >
        {/* HEADER */}

        <div
          className="
text-center
max-w-3xl
mx-auto
"
        >
          <p
            className="
text-purple-300
font-semibold
"
          >
            Welcome to FlexiWalls ✨
          </p>

          <h1
            className="
mt-4

text-5xl
md:text-7xl

font-black
"
          >
            About
            <span className="gradient-text block">FlexiWalls</span>
          </h1>

          <p
            className="
mt-8

text-gray-300

text-lg
leading-8
"
          >
            FlexiWalls is a premium wallpaper platform built for users who love
            beautiful digital experiences. Discover stunning HD, 4K and 8K
            wallpapers across multiple categories with a smooth modern
            experience.
          </p>
        </div>

        {/* FEATURES */}

        <div
          className="
grid

grid-cols-1
md:grid-cols-3

gap-8

mt-20
"
        >
          {features.map((item) => (
            <div
              key={item.title}
              className="
glass

rounded-[35px]

p-8

hover:-translate-y-3

transition-all
duration-500
"
            >
              <div
                className="
text-5xl
mb-6
"
              >
                {item.icon}
              </div>

              <h2
                className="
text-2xl

font-black

mb-4
"
              >
                {item.title}
              </h2>

              <p
                className="
text-gray-300

leading-7
"
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* MISSION */}

        <div
          className="
glass

rounded-[40px]

p-10

mt-20
"
        >
          <h2
            className="
text-4xl

font-black

gradient-text
"
          >
            Our Mission
          </h2>

          <p
            className="
mt-5

text-gray-300

leading-8
"
          >
            Our mission is simple — provide users with premium quality
            wallpapers that make every screen feel unique, beautiful and
            personal.
          </p>
        </div>
      </section>
    </main>
  );
}
