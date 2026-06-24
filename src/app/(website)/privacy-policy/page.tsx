import Navbar from "@/components/website/Navbar";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      text: "We collect only required information such as account details, preferences and usage data to improve your experience.",
    },

    {
      title: "Wallpaper Usage",
      text: "Downloaded wallpapers are provided for personal use. Premium content may require an active subscription.",
    },

    {
      title: "Data Protection",
      text: "We protect user information using secure technologies and never sell personal information.",
    },

    {
      title: "Authentication",
      text: "Login tokens are stored securely to keep your FlexiWalls account connected.",
    },

    {
      title: "Updates",
      text: "Our privacy policy may be updated as new features and services are introduced.",
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

max-w-[1100px]

mx-auto
"
      >
        <p
          className="
text-purple-300
font-semibold
"
        >
          Privacy & Security 🔒
        </p>

        <h1
          className="
mt-4

text-5xl
md:text-7xl

font-black
"
        >
          Privacy
          <span
            className="
gradient-text
block
"
          >
            Policy
          </span>
        </h1>

        <p
          className="
mt-6

text-gray-400

max-w-2xl
"
        >
          Your privacy matters. Learn how FlexiWalls handles and protects your
          information.
        </p>

        <div
          className="
mt-16

space-y-8
"
        >
          {sections.map((section) => (
            <div
              key={section.title}
              className="
glass

rounded-[30px]

p-8
"
            >
              <h2
                className="
text-2xl

font-bold

mb-4
"
              >
                {section.title}
              </h2>

              <p
                className="
text-gray-300

leading-8
"
              >
                {section.text}
              </p>
            </div>
          ))}
        </div>

        <div
          className="
mt-12

text-gray-400
"
        >
          Last updated: 2026
        </div>
      </section>
    </main>
  );
}
