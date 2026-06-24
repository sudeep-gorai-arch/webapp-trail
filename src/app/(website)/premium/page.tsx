import Navbar from "@/components/website/Navbar";

import PremiumBanner from "@/components/website/PremiumBanner";

export default function PremiumPage() {
  const plans = [
    {
      name: "Monthly",
      price: "₹99",
      features: ["Unlimited downloads", "Premium wallpapers", "No ads"],
    },

    {
      name: "Lifetime",
      price: "₹999",
      features: [
        "Everything included",
        "Lifetime updates",
        "Exclusive collections",
      ],
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

max-w-[1500px]

mx-auto
"
      >
        <PremiumBanner />

        <div
          className="
mt-20

grid

grid-cols-1

md:grid-cols-2

gap-10
"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="
glass

rounded-[35px]

p-10

border
border-white/10

hover:-translate-y-3

transition-all
duration-500
"
            >
              <h2
                className="
text-4xl

font-black
"
              >
                {plan.name}
              </h2>

              <h1
                className="
mt-6

text-6xl

font-black

gradient-text
"
              >
                {plan.price}
              </h1>

              <div
                className="
space-y-4

mt-8
"
              >
                {plan.features.map((f) => (
                  <p key={f}>✅ {f}</p>
                ))}
              </div>

              <button
                className="
mt-10

w-full

py-4

rounded-full

bg-gradient-to-r

from-blue-500

to-purple-600

font-bold
"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
