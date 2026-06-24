export default function PremiumBanner() {
  const features = [
    "8K Ultra HD Wallpapers",

    "Exclusive Collections",

    "Unlimited Downloads",

    "No Advertisements",
  ];

  return (
    <div
      className="

relative

overflow-hidden

rounded-[40px]

glass

p-10

md:p-16

shadow-2xl

"
      style={{
        boxShadow:
          "0 25px 80px color-mix(in srgb,var(--secondary) 35%,transparent)",

        background: `
linear-gradient(
135deg,
color-mix(in srgb,var(--primary) 25%,transparent),
color-mix(in srgb,var(--secondary) 25%,transparent),
color-mix(in srgb,var(--accent) 15%,transparent)
)
`,
      }}
    >
      {/* GLOW */}

      <div
        className="

absolute

-top-20

-right-20

w-72

h-72

rounded-full

blur-[120px]

"
        style={{
          background: "var(--accent)",

          opacity: 0.45,
        }}
      />

      <div
        className="

relative

z-10

"
      >
        <div
          className="

inline-flex

px-5

py-2

rounded-full

glass

mb-6

font-bold

"
        >
          👑 PREMIUM
        </div>

        <h1
          className="

text-5xl

md:text-7xl

font-black

theme-text

"
        >
          Unlock
          <span
            className="

block

gradient-text

"
          >
            FlexiWalls Pro
          </span>
        </h1>

        <p
          className="

mt-5

max-w-xl

text-lg

theme-muted

"
        >
          Experience the ultimate wallpaper collection with exclusive premium
          quality content.
        </p>

        <div
          className="

grid

grid-cols-1

md:grid-cols-2

gap-4

mt-10

"
        >
          {features.map((item) => (
            <div
              key={item}
              className="

glass

rounded-2xl

px-5

py-4

theme-text

hover:scale-105

transition

"
            >
              ✨ {item}
            </div>
          ))}
        </div>

        <button
          className="

mt-10

px-10

py-4

rounded-full

font-black

shadow-lg

hover:scale-105

transition

"
          style={{
            background:
              "linear-gradient(90deg,var(--primary),var(--secondary),var(--accent))",

            boxShadow:
              "0 15px 40px color-mix(in srgb,var(--primary) 45%,transparent)",

            color: "white",
          }}
        >
          Upgrade Now 🚀
        </button>
      </div>
    </div>
  );
}
