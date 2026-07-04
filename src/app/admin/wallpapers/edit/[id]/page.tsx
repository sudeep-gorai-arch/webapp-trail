"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useParams, useRouter } from "next/navigation";

import { Formik, Form, Field } from "formik";

import { FiSave, FiArrowLeft } from "react-icons/fi";

import { getWallpaperById, updateWallpaper } from "@/services/wallpaperService";

import { getCategories } from "@/services/categoryService";

import { Category } from "@/types/category";

export default function Page() {
    const params = useParams();

    const router = useRouter();

    const id = params.id as string;

    const [preview, setPreview] = useState<string>("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [categories, setCategories] = useState<Category[]>([]);

    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setError("");

            const [wallpaper, categoryRes] = await Promise.all([
                getWallpaperById(id),
                getCategories({ limit: 100, offset: 0 }),
            ]);

            const data = wallpaper.data;

            setPreview(
                data.thumbnailUrl || data.imageUrl || "/placeholder-wallpaper.png",
            );

            setInitialValues({
                title: data.title,
                description: data.description || "",
                categoryId: data.category?.id || "",
                quality: data.quality || "UHD_4K",
                type: data.isPremium
                    ? "premium"
                    : data.isFeatured
                        ? "featured"
                        : "free",
                tags: data.tags?.join(", ") || "",
                active: data.active ?? true,
            });

            setCategories(categoryRes.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to load wallpaper");
        } finally {
            setLoading(false);
        }
    }

    const selectStyle = {
        background: "var(--bg-main)",
        color: "var(--text-main)",
    };

    if (loading || !initialValues) {
        return <div className="p-10 theme-text">Loading...</div>;
    }

    return (
        <div className="theme-text">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black gradient-text">Edit Wallpaper</h1>

                    <p className="theme-muted">Wallpaper ID : {id}</p>
                </div>

                <button
                    onClick={() => router.back()}
                    className="glass px-6 py-3 rounded-full flex gap-2 items-center"
                >
                    <FiArrowLeft />
                    Back
                </button>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                    {error}
                </div>
            )}

            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={async (values) => {
                    try {
                        setSaving(true);
                        setError("");

                        await updateWallpaper(id, {
                            title: values.title,
                            description: values.description,
                            categoryId: values.categoryId,
                            quality: values.quality,
                            isPremium: values.type === "premium",
                            isFeatured: values.type === "featured",
                            active: values.active,
                            tags: values.tags
                                .split(",")
                                .map((tag: string) => tag.trim())
                                .filter(Boolean),
                        });

                        router.push("/admin/wallpapers");
                    } catch (err: any) {
                        setError(err.response?.data?.message || "Unable to update wallpaper");
                    } finally {
                        setSaving(false);
                    }
                }}
            >
                {({ values }) => (
                    <Form>
                        <div className="grid grid-cols-3 gap-8">
                            <div className="glass rounded-[35px] p-6">
                                {preview && (
                                    <Image
                                        src={preview}
                                        alt="preview"
                                        width={500}
                                        height={700}
                                        className="rounded-[25px] h-[500px] w-full object-cover"
                                    />
                                )}

                                <div className="mt-5 glass rounded-2xl p-4 text-center theme-muted">
                                    Image replacement is not exposed by the current backend update endpoint.
                                </div>
                            </div>

                            <div className="glass rounded-[35px] p-8 col-span-2 space-y-6">
                                <div>
                                    <label className="theme-muted">Title</label>
                                    <Field
                                        name="title"
                                        className="glass mt-2 w-full p-4 rounded-2xl outline-none theme-text"
                                    />
                                </div>

                                <div>
                                    <label className="theme-muted">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        rows={5}
                                        className="glass mt-2 w-full p-4 rounded-2xl outline-none theme-text resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="theme-muted">Category</label>
                                        <Field
                                            as="select"
                                            name="categoryId"
                                            style={selectStyle}
                                            className="glass mt-2 w-full p-4 rounded-2xl"
                                        >
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </Field>
                                    </div>

                                    <div>
                                        <label className="theme-muted">Quality</label>
                                        <Field
                                            as="select"
                                            name="quality"
                                            style={selectStyle}
                                            className="glass mt-2 w-full p-4 rounded-2xl"
                                        >
                                            <option value="HD">HD</option>
                                            <option value="FULL_HD">Full HD</option>
                                            <option value="QHD">QHD</option>
                                            <option value="UHD_4K">4K UHD</option>
                                            <option value="UHD_8K">8K UHD</option>
                                        </Field>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="theme-muted">Wallpaper Type</label>
                                        <Field
                                            as="select"
                                            name="type"
                                            style={selectStyle}
                                            className="glass mt-2 w-full p-4 rounded-2xl"
                                        >
                                            <option value="free">Free</option>
                                            <option value="premium">👑 Premium</option>
                                            <option value="featured">⭐ Featured</option>
                                        </Field>
                                    </div>

                                    <label className="glass mt-8 rounded-2xl p-4 flex items-center gap-3 theme-text">
                                        <Field
                                            type="checkbox"
                                            name="active"
                                            checked={values.active}
                                            className="h-5 w-5"
                                        />
                                        Active
                                    </label>
                                </div>

                                <div>
                                    <label className="theme-muted">Tags</label>
                                    <Field
                                        name="tags"
                                        placeholder="anime, dark, mobile"
                                        className="glass mt-2 w-full p-4 rounded-2xl outline-none theme-text"
                                    />
                                </div>

                                <button
                                    disabled={saving}
                                    type="submit"
                                    className="px-10 py-4 rounded-full font-black flex gap-3 disabled:opacity-60"
                                    style={{
                                        background:
                                            "linear-gradient(90deg,var(--primary),var(--secondary))",
                                        color: "white",
                                    }}
                                >
                                    <FiSave />
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
