"use client";

import { useEffect, useMemo, useState } from "react";

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

import { getCategories } from "@/services/categoryService";
import { getWallpapers } from "@/services/wallpaperService";
import { userService, User } from "@/services/userService";
import { Category } from "@/types/category";
import { Wallpaper } from "@/types/wallpaper";

export default function Admin() {
    const [filter, setFilter] = useState("month");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

    const [wallpaperTotal, setWallpaperTotal] = useState(0);

    const [categories, setCategories] = useState<Category[]>([]);

    const [adminUser, setAdminUser] = useState<User | null>(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setLoading(true);
            setError("");

            const [wallpaperRes, categoryRes, userRes] = await Promise.allSettled([
                getWallpapers(20, 0, "", "", undefined, { sort: "downloads" }),
                getCategories({ limit: 100, offset: 0 }),
                userService.me(),
            ]);

            if (wallpaperRes.status === "fulfilled") {
                setWallpapers(wallpaperRes.value.data || []);
                setWallpaperTotal(wallpaperRes.value.pagination?.total || wallpaperRes.value.data?.length || 0);
            }

            if (categoryRes.status === "fulfilled") {
                setCategories(categoryRes.value.data || []);
            }

            if (userRes.status === "fulfilled") {
                setAdminUser(userRes.value.data);
            }

            const failed = [wallpaperRes, categoryRes, userRes].find(
                (result) => result.status === "rejected",
            );

            if (failed && failed.status === "rejected") {
                setError(failed.reason?.response?.data?.message || "Some dashboard data could not be loaded");
            }
        } finally {
            setLoading(false);
        }
    }

    const totalDownloads = useMemo(
        () => wallpapers.reduce((sum, item) => sum + (item.downloadCount ?? item.downloads ?? 0), 0),
        [wallpapers],
    );

    const premiumCount = useMemo(
        () => wallpapers.filter((item) => item.isPremium).length,
        [wallpapers],
    );

    const stats = [
        {
            title: "Wallpapers",
            value: loading ? "..." : String(wallpaperTotal),
            icon: "🖼️",
            growth: "Live",
        },
        {
            title: "Categories",
            value: loading ? "..." : String(categories.length),
            icon: "🗂️",
            growth: "Live",
        },
        {
            title: "Downloads",
            value: loading ? "..." : String(totalDownloads),
            icon: "⬇️",
            growth: "Top 20",
        },
        {
            title: "Premium",
            value: loading ? "..." : String(premiumCount),
            icon: "👑",
            growth: "Top 20",
        },
    ];

    const downloads = wallpapers.slice(0, 8).map((item) => ({
        title: item.title.length > 12 ? `${item.title.slice(0, 12)}...` : item.title,
        value: item.downloadCount ?? item.downloads ?? 0,
    }));

    const categoryChart = categories.slice(0, 8).map((category) => ({
        name: category.name,
        wallpapers: category.wallpaperCount ?? category.count ?? 0,
    }));

    const premium = [
        { name: "Free", value: Math.max(wallpapers.length - premiumCount, 0) },
        { name: "Premium", value: premiumCount },
    ];

    return (
        <div className="theme-text h-[calc(100vh-120px)] overflow-y-auto pr-3 no-scrollbar">
            <section className="glass rounded-[35px] p-8 mb-8 flex justify-between">
                <div>
                    <h1 className="text-5xl font-black">
                        Dashboard
                        <span className="block gradient-text">FlexiWalls Analytics</span>
                    </h1>

                    <p className="theme-muted">
                        Live admin overview from your backend APIs
                    </p>

                    {error && (
                        <p className="mt-3 text-sm text-red-300">
                            {error}
                        </p>
                    )}
                </div>

                <select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="glass px-6 rounded-full outline-none"
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

            <div className="grid grid-cols-4 gap-6 mb-8">
                {stats.map((item) => (
                    <DashboardCard key={item.title} {...item} />
                ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div className="glass rounded-[30px] p-6 col-span-2">
                    <h2 className="text-2xl font-bold mb-5">⬇ Top Downloads</h2>

                    <ResponsiveContainer height={250}>
                        <AreaChart data={downloads}>
                            <XAxis dataKey="title" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                dataKey="value"
                                stroke="var(--primary)"
                                fill="var(--primary)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass rounded-[30px] p-6">
                    <h2 className="text-2xl font-bold">👑 Premium Ratio</h2>

                    <ResponsiveContainer height={250}>
                        <PieChart>
                            <Pie data={premium} dataKey="value" label>
                                {premium.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={index ? "var(--secondary)" : "var(--primary)"}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass rounded-[30px] p-6">
                    <h2 className="font-bold mb-5">🔥 Categories</h2>

                    <ResponsiveContainer height={230}>
                        <BarChart data={categoryChart}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="wallpapers" fill="var(--secondary)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass rounded-[30px] p-6 col-span-2">
                    <h2 className="font-bold mb-5">🏆 Top Wallpapers</h2>

                    <div className="space-y-3 h-[230px] overflow-y-auto no-scrollbar">
                        {wallpapers.slice(0, 10).map((wallpaper, index) => (
                            <div
                                key={wallpaper.id}
                                className="glass rounded-xl p-3 flex justify-between"
                            >
                                <span>
                                    #{index + 1} {wallpaper.title}
                                </span>

                                <span>⬇ {wallpaper.downloadCount ?? wallpaper.downloads ?? 0}</span>
                            </div>
                        ))}

                        {!loading && wallpapers.length === 0 && (
                            <div className="theme-muted p-4">
                                No wallpapers available yet.
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass rounded-[30px] p-6 col-span-3">
                    <h2 className="font-bold mb-5">👤 Current Admin User</h2>

                    {adminUser ? (
                        <div className="grid grid-cols-4 gap-4">
                            <div className="glass rounded-xl p-5">
                                <p className="theme-muted">Username</p>
                                <h3 className="font-bold">{adminUser.username}</h3>
                            </div>

                            <div className="glass rounded-xl p-5">
                                <p className="theme-muted">Email</p>
                                <h3 className="font-bold truncate">{adminUser.email}</h3>
                            </div>

                            <div className="glass rounded-xl p-5">
                                <p className="theme-muted">Role</p>
                                <h3 className="font-bold">{adminUser.role?.name || "User"}</h3>
                            </div>

                            <div className="glass rounded-xl p-5">
                                <p className="theme-muted">Premium</p>
                                <h3 className="font-bold">{adminUser.isPremium ? "Yes" : "No"}</h3>
                            </div>
                        </div>
                    ) : (
                        <p className="theme-muted">
                            Login token required to show current user details.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
