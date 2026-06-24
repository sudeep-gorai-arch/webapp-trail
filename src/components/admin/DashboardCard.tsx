"use client";

export default function DashboardCard({
  title,
  value,
  icon,
  growth,
}: {
  title: string;
  value: string | number;
  icon: string;
  growth?: string;
}) {
  return (
    <div
      className="
      glass

      rounded-[30px]

      p-8

      hover:-translate-y-2
      hover:scale-[1.02]

      transition-all

      duration-300
      "
    >
      <div
        className="
        flex
        justify-between
        items-start
        "
      >
        <div
          className="
          w-14
          h-14

          rounded-2xl

          glass

          flex
          items-center
          justify-center

          text-3xl
          "
        >
          {icon}
        </div>

        {growth && (
          <span
            className="
            glass

            px-3
            py-1

            rounded-full

            text-sm
            "
          >
            {growth}
          </span>
        )}
      </div>

      <h2
        className="
        mt-8

        theme-muted
        "
      >
        {title}
      </h2>

      <p
        className="
        mt-2

        text-4xl

        font-black

        gradient-text
        "
      >
        {value}
      </p>
    </div>
  );
}
