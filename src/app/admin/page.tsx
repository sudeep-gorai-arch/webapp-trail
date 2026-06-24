"use client";

import { useState } from "react";

import DashboardCard from "@/components/admin/DashboardCard";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  AreaChart,
  Area,
} from "recharts";

export default function Admin() {
  const [filter, setFilter] = useState("month");

  const stats = [
    {
      title: "Wallpapers",
      value: "12.5K",
      icon: "🖼️",
      growth: "+12%",
    },

    {
      title: "Users",
      value: "5.4K",
      icon: "👥",
      growth: "+8%",
    },

    {
      title: "Downloads",
      value: "98K",
      icon: "⬇️",
      growth: "+35%",
    },

    {
      title: "Revenue",
      value: "₹84K",
      icon: "💰",
      growth: "+18%",
    },
  ];

  const revenue = [
    { month: "Jan", amount: 10000 },
    { month: "Feb", amount: 25000 },
    { month: "Mar", amount: 42000 },
    { month: "Apr", amount: 84000 },
  ];

  const downloads = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 2500 },
    { month: "Mar", value: 5000 },
    { month: "Apr", value: 9000 },
  ];

  const categories = [
    { name: "Anime", downloads: 8000 },
    { name: "Gaming", downloads: 6500 },
    { name: "Nature", downloads: 4000 },
    { name: "Cars", downloads: 2500 },
  ];

  const premium = [
    { name: "Free", value: 4500 },

    { name: "Premium", value: 900 },
  ];

  const wallpapers = [
    "Cyber City",
    "Galaxy Pro",
    "Anime World",
    "Super Cars",
    "Forest HD",
    "Dark Samurai",
    "Mountains",
    "Ocean Life",
    "Future City",
    "Space X",
  ];

  const users = ["Shubham", "Alex", "John", "Maria", "David"];

  return (
    <div
      className="

theme-text

h-[calc(100vh-120px)]

overflow-y-auto

pr-3

no-scrollbar

"
    >
      {/* HEADER */}

      <section
        className="
glass
rounded-[35px]
p-8
mb-8

flex
justify-between
"
      >
        <div>
          <h1 className="text-5xl font-black">
            Dashboard
            <span className="block gradient-text">FlexiWalls Analytics</span>
          </h1>

          <p className="theme-muted">Complete business overview</p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
glass
px-6
rounded-full
outline-none
"
          style={{
            background: "var(--bg-main)",

            color: "var(--text-main)",
          }}
        >
          <option value="today">Today</option>

          <option value="month">This Month</option>

          <option value="year">Year</option>
        </select>
      </section>

      {/* CARDS */}

      <div
        className="
grid
grid-cols-4
gap-6
mb-8
"
      >
        {stats.map((item) => (
          <DashboardCard key={item.title} {...item} />
        ))}
      </div>

      <div
        className="
grid
grid-cols-3
gap-8
"
      >
        {/* REVENUE */}

        <div
          className="
glass
rounded-[30px]
p-6

col-span-2
"
        >
          <h2 className="text-2xl font-bold mb-5">💰 Revenue</h2>

          <ResponsiveContainer height={250}>
            <AreaChart data={revenue}>
              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                dataKey="amount"
                stroke="var(--primary)"
                fill="var(--primary)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* PREMIUM */}

        <div
          className="
glass
rounded-[30px]
p-6
"
        >
          <h2 className="text-2xl font-bold">👑 Premium Ratio</h2>

          <ResponsiveContainer height={250}>
            <PieChart>
              <Pie data={premium} dataKey="value" label>
                {premium.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i ? "var(--secondary)" : "var(--primary)"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* DOWNLOADS */}

        <div
          className="
glass
rounded-[30px]
p-6
"
        >
          <h2 className="font-bold mb-5">⬇ Downloads</h2>

          <ResponsiveContainer height={230}>
            <LineChart data={downloads}>
              <XAxis dataKey="month" />

              <Tooltip />

              <Line dataKey="value" stroke="var(--primary)" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY */}

        <div
          className="
glass
rounded-[30px]
p-6
"
        >
          <h2 className="font-bold mb-5">🔥 Categories</h2>

          <ResponsiveContainer height={230}>
            <BarChart data={categories}>
              <XAxis dataKey="name" />

              <Tooltip />

              <Bar dataKey="downloads" fill="var(--secondary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TOP WALLPAPERS */}

        <div
          className="
glass
rounded-[30px]
p-6
"
        >
          <h2 className="font-bold mb-5">🏆 Top Wallpapers</h2>

          <div
            className="
space-y-3

h-[230px]

overflow-y-auto

no-scrollbar
"
          >
            {wallpapers.map((w, i) => (
              <div
                key={w}
                className="
glass
rounded-xl
p-3

flex
justify-between
"
              >
                <span>
                  #{i + 1} {w}
                </span>

                <span>⬇ {9000 - i * 500}</span>
              </div>
            ))}
          </div>
        </div>

        {/* USERS */}

        <div
          className="
glass
rounded-[30px]
p-6
col-span-3
"
        >
          <h2 className="font-bold mb-5">👥 Recent Users</h2>

          <div
            className="
grid
grid-cols-5
gap-4
"
          >
            {users.map((u) => (
              <div
                key={u}
                className="
glass
rounded-xl
p-5
text-center
"
              >
                👤
                <br />
                {u}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
