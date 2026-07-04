"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import {
    FiEdit,
    FiTrash,
    FiPlus,
    FiSearch,
    FiPower,
    FiStar,
} from "react-icons/fi";

import {
    getWallpapers,
    deleteWallpaper,
    toggleActive,
    toggleFeatured,
    togglePremium,
} from "@/services/wallpaperService";

import { Wallpaper } from "@/types/wallpaper";

import { getCategories } from "@/services/categoryService";
import { Category } from "@/types/category";

export default function Page() {
    const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

    const [categories, setCategories] = useState<Category[]>([]);

    const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [page, setPage] = useState(1);

    const limit = 8;

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadWallpapers();
    }, [page, search, category, activeTab]);

    async function loadWallpapers() {
        try {
            setLoading(true);
            setError("");

            const expectedActive = activeTab === "active";

            const res = await getWallpapers(
                limit,
                (page - 1) * limit,
                search,
                category,
                expectedActive,
            );

            const apiWallpapers = res.data || [];

            console.log(
                "TAB:",
                activeTab,
                "EXPECTED ACTIVE:",
                expectedActive,
                "API DATA:",
                apiWallpapers.map((item) => ({
                    title: item.title,
                    active: item.active,
                }))
            );

            setWallpapers(apiWallpapers);
            setTotal(res.pagination?.total || apiWallpapers.length);
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to load wallpapers");
        } finally {
            setLoading(false);
        }
    }

    async function loadCategories() {
        try {
            const res = await getCategories({ limit: 100, offset: 0 });

            setCategories(res.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to load categories");
        }
    }

    const totalPages = Math.max(1, Math.ceil(total / limit));

    async function handleDelete() {
        if (!deleteId) return;

        try {
            setDeleteLoading(true);
            setError("");

            await deleteWallpaper(deleteId);

            setDeleteId(null);
            await loadWallpapers();
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to delete wallpaper");
        } finally {
            setDeleteLoading(false);
        }
    }

    async function handleToggleActive(id: string) {
        try {
            setError("");
            await toggleActive(id);
            await loadWallpapers();
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to update active status");
        }
    }

    async function handleToggleFeatured(id: string) {
        try {
            setError("");
            await toggleFeatured(id);
            await loadWallpapers();
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to update featured status");
        }
    }

    async function handleTogglePremium(id: string) {
        try {
            setError("");
            await togglePremium(id);
            await loadWallpapers();
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to update premium status");
        }
    }

    return (
        <div className="theme-text">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-black gradient-text">Wallpapers</h1>

                    <p className="theme-muted">
                        Manage backend wallpapers from /api/wallpapers
                    </p>
                </div>

                <Link
                    href="/admin/wallpapers/upload"
                    prefetch={false}
                    className="px-6 py-3 rounded-full font-bold flex gap-2 items-center"
                    style={{
                        background:
                            "linear-gradient(90deg,var(--primary),var(--secondary))",
                        color: "white",
                    }}
                >
                    <FiPlus />
                    Add Wallpaper
                </Link>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                    {error}
                </div>
            )}

            <div className="glass rounded-full p-2 mb-8 inline-flex gap-3">
                <button
                    onClick={() => {
                        setActiveTab("active");
                        setPage(1);
                    }}
                    className={`px-8 py-3 rounded-full font-bold transition ${
                        activeTab === "active" ? "bg-green-600 text-white" : "theme-muted"
                    }`}
                >
                    Active Wallpapers
                </button>

                <button
                    onClick={() => {
                        setActiveTab("inactive");
                        setPage(1);
                    }}
                    className={`px-8 py-3 rounded-full font-bold transition ${
                        activeTab === "inactive" ? "bg-red-600 text-white" : "theme-muted"
                    }`}
                >
                    Inactive Wallpapers
                </button>
            </div>

            <div className="glass rounded-[30px] p-5 mb-8 flex gap-5">
                <div className="glass flex-1 rounded-full px-5 py-3 flex gap-3 items-center">
                    <FiSearch />

                    <input
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }}
                        placeholder="Search wallpaper"
                        className="bg-transparent outline-none theme-text w-full"
                    />
                </div>

                <select
                    value={category}
                    onChange={(event) => {
                        setCategory(event.target.value);
                        setPage(1);
                    }}
                    className="glass rounded-full px-5 outline-none theme-text"
                    style={{
                        background: "var(--bg-main)",
                        color: "var(--text-main)",
                    }}
                >
                    <option value="">All Categories</option>

                    {categories.map((item) => (
                        <option key={item.id} value={item.slug}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="glass rounded-[35px] overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="theme-muted text-left">
                            <th className="p-5">Preview</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Quality</th>
                            <th>Likes</th>
                            <th>Downloads</th>
                            <th>Date</th>
                            <th className="text-right pr-5">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="p-10" colSpan={8}>
                                    Loading...
                                </td>
                            </tr>
                        ) : wallpapers.length === 0 ? (
                            <tr>
                                <td className="p-10 theme-muted" colSpan={8}>
                                    No wallpapers found.
                                </td>
                            </tr>
                        ) : (
                            wallpapers.map((item) => (
                                <tr
                                    key={item.id}
                                    style={{
                                        borderTop:
                                            "1px solid color-mix(in srgb,var(--text-main) 10%,transparent)",
                                    }}
                                >
                                    <td className="p-5">
                                        <Image
                                            src={
                                                item.thumbnailUrl ||
                                                item.imageUrl ||
                                                "/placeholder-wallpaper.png"
                                            }
                                            alt={item.title}
                                            width={70}
                                            height={90}
                                            className="h-[90px] w-[70px] rounded-xl object-cover"
                                        />
                                    </td>

                                    <td>
                                        <div className="font-bold">{item.title}</div>
                                        <div className="theme-muted text-sm">{item.resolution}</div>
                                    </td>

                                    <td>
                                        <span className="glass px-4 py-2 rounded-full">
                                            {item.category?.name || "No category"}
                                        </span>
                                    </td>

                                    <td>{item.quality}</td>

                                    <td>❤️ {item.likes ?? 0}</td>

                                    <td>⬇ {item.downloadCount ?? 0}</td>

                                    <td className="theme-muted">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <div className="flex justify-end gap-3 pr-5">
                                            {activeTab === "active" ? (
                                                <>
                                                    <Link
                                                        href={`/admin/wallpapers/edit/${item.id}`}
                                                        className="glass w-10 h-10 rounded-full flex items-center justify-center"
                                                        title="Edit"
                                                    >
                                                        <FiEdit />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleTogglePremium(item.id)}
                                                        title={item.isPremium ? "Remove premium" : "Make premium"}
                                                        className={`glass w-10 h-10 rounded-full flex items-center justify-center ${
                                                            item.isPremium ? "text-yellow-300" : ""
                                                        }`}
                                                    >
                                                        👑
                                                    </button>

                                                    <button
                                                        onClick={() => handleToggleFeatured(item.id)}
                                                        title={item.isFeatured ? "Remove featured" : "Make featured"}
                                                        className={`glass w-10 h-10 rounded-full flex items-center justify-center ${
                                                            item.isFeatured ? "text-yellow-300" : ""
                                                        }`}
                                                    >
                                                        <FiStar />
                                                    </button>

                                                    <button
                                                        onClick={() => handleToggleActive(item.id)}
                                                        title="Deactivate"
                                                        className="glass w-10 h-10 rounded-full flex items-center justify-center"
                                                    >
                                                        <FiPower />
                                                    </button>

                                                    <button
                                                        onClick={() => setDeleteId(item.id)}
                                                        title="Delete"
                                                        className="glass w-10 h-10 rounded-full flex items-center justify-center text-red-500"
                                                    >
                                                        <FiTrash />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleToggleActive(item.id)}
                                                    className="px-5 py-2 rounded-full bg-green-600 text-white font-bold"
                                                >
                                                    Activate
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="glass rounded-[25px] p-5 mt-8 flex justify-between">
                <span className="theme-muted">Total {total} wallpapers</span>

                <div className="flex gap-3">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((current) => current - 1)}
                        className="glass px-5 py-2 rounded-full disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <span className="px-5 py-2">
                        {page}/{totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((current) => current + 1)}
                        className="glass px-5 py-2 rounded-full disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>

            {deleteId && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="glass rounded-[30px] p-8 w-[400px] text-center">
                        <h2 className="text-2xl font-bold mb-3">Delete Wallpaper?</h2>

                        <p className="theme-muted mb-8">
                            Backend will soft-delete this wallpaper and remove its image files.
                        </p>

                        <div className="flex gap-5 justify-center">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="glass px-6 py-3 rounded-full"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={deleteLoading}
                                onClick={handleDelete}
                                className="px-6 py-3 rounded-full bg-red-600 text-white disabled:opacity-60"
                            >
                                {deleteLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}