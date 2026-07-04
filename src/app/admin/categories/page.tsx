"use client";

import { useEffect, useMemo, useState } from "react";

import Image from "next/image";

import {
    FiEdit,
    FiPlus,
    FiSearch,
    FiTrash,
    FiPower,
} from "react-icons/fi";

import CategoryModal from "@/components/admin/CategoryModal";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategory,
} from "@/services/categoryService";

import { Category } from "@/types/category";

export default function Page() {
    const [open, setOpen] = useState(false);

    const [edit, setEdit] = useState<Category | null>(null);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [categories, setCategories] = useState<Category[]>([]);

    const perPage = 5;

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            setLoading(true);
            setError("");

            const res = await getCategories({ limit: 100, offset: 0 });

            setCategories(res.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to load categories");
        } finally {
            setLoading(false);
        }
    }

    async function saveCategory(value: FormData) {
        try {
            setSaving(true);
            setError("");

            if (edit) {
                await updateCategory(edit.slug, value);
            } else {
                await createCategory(value);
            }

            setOpen(false);
            setEdit(null);

            await loadCategories();
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to save category");
        } finally {
            setSaving(false);
        }
    }

    async function handleToggle(category: Category) {
        try {
            setError("");
            await toggleCategory(category.slug);
            await loadCategories();
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to update category status");
        }
    }

    async function handleDelete(category: Category) {
        const confirmed = window.confirm(
            `Delete category "${category.name}"? This can also remove wallpapers connected to it on the backend.`,
        );

        if (!confirmed) return;

        try {
            setError("");
            await deleteCategory(category.slug);
            await loadCategories();
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to delete category");
        }
    }

    const filteredList = useMemo(
        () =>
            categories.filter((item) =>
                [item.name, item.slug, item.description]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            ),
        [categories, search],
    );

    const totalPages = Math.max(1, Math.ceil(filteredList.length / perPage));

    const list = filteredList.slice(
        (page - 1) * perPage,
        page * perPage,
    );

    return (
        <div className="theme-text">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-black gradient-text">Categories</h1>

                    <p className="theme-muted">
                        Manage categories using the backend /api/categories endpoints
                    </p>
                </div>

                <button
                    disabled={saving}
                    onClick={() => {
                        setEdit(null);
                        setOpen(true);
                    }}
                    className="
                    px-6
                    py-3
                    rounded-full
                    flex
                    gap-2
                    items-center
                    font-bold
                    hover:scale-105
                    transition
                    disabled:opacity-60
                    "
                    style={{
                        background:
                            "linear-gradient(90deg,var(--primary),var(--secondary))",
                        color: "white",
                    }}
                >
                    <FiPlus />
                    Add Category
                </button>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                    {error}
                </div>
            )}

            <div
                className="
                glass
                rounded-[30px]
                p-5
                mb-8
                flex
                items-center
                gap-3
                "
            >
                <FiSearch className="theme-muted" />

                <input
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(1);
                    }}
                    placeholder="Search category..."
                    className="bg-transparent outline-none theme-text w-full"
                />
            </div>

            <div className="glass rounded-[35px] overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="theme-muted text-left">
                            <th className="p-5">Thumbnail</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Wallpapers</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th className="text-right pr-5">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="p-10" colSpan={7}>
                                    Loading...
                                </td>
                            </tr>
                        ) : list.length === 0 ? (
                            <tr>
                                <td className="p-10 theme-muted" colSpan={7}>
                                    No categories found.
                                </td>
                            </tr>
                        ) : (
                            list.map((category) => (
                                <tr
                                    key={category.id}
                                    style={{
                                        borderTop:
                                            "1px solid color-mix(in srgb,var(--text-main) 10%,transparent)",
                                    }}
                                >
                                    <td className="p-5">
                                        {category.thumbnailUrl ? (
                                            <Image
                                                src={category.thumbnailUrl}
                                                alt={category.name}
                                                width={86}
                                                height={58}
                                                className="h-14 w-24 rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="glass flex h-14 w-24 items-center justify-center rounded-xl">
                                                ✨
                                            </div>
                                        )}
                                    </td>

                                    <td>
                                        <div className="font-bold">{category.name}</div>
                                        {category.description && (
                                            <div className="theme-muted max-w-[280px] truncate text-sm">
                                                {category.description}
                                            </div>
                                        )}
                                    </td>

                                    <td className="theme-muted">{category.slug}</td>

                                    <td>{category.wallpaperCount ?? category.count ?? 0}</td>

                                    <td>
                                        <span
                                            className={`rounded-full px-4 py-2 text-sm font-bold ${
                                                category.active
                                                    ? "bg-green-500/15 text-green-300"
                                                    : "bg-red-500/15 text-red-300"
                                            }`}
                                        >
                                            {category.active ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="theme-muted">
                                        {new Date(category.createdAt).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <div className="flex justify-end gap-3 pr-5">
                                            <button
                                                title="Edit"
                                                onClick={() => {
                                                    setEdit(category);
                                                    setOpen(true);
                                                }}
                                                className="glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
                                            >
                                                <FiEdit />
                                            </button>

                                            <button
                                                title={category.active ? "Deactivate" : "Activate"}
                                                onClick={() => handleToggle(category)}
                                                className="glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
                                            >
                                                <FiPower />
                                            </button>

                                            <button
                                                title="Delete"
                                                onClick={() => handleDelete(category)}
                                                className="glass w-10 h-10 rounded-full flex items-center justify-center text-red-400 hover:scale-110 transition"
                                            >
                                                <FiTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="glass rounded-[25px] p-5 mt-8 flex justify-between items-center">
                <div className="theme-muted">
                    Total
                    <span className="theme-text font-bold mx-2">
                        {filteredList.length}
                    </span>
                    categories
                </div>

                <div className="flex gap-3">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((current) => current - 1)}
                        className="glass px-5 py-2 rounded-full disabled:opacity-40"
                    >
                        ← Previous
                    </button>

                    <span className="px-5 py-2">
                        {page}/{totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((current) => current + 1)}
                        className="glass px-5 py-2 rounded-full disabled:opacity-40"
                    >
                        Next →
                    </button>
                </div>
            </div>

            <CategoryModal
                open={open}
                data={edit}
                onClose={() => {
                    setOpen(false);
                    setEdit(null);
                }}
                onSave={saveCategory}
            />
        </div>
    );
}
