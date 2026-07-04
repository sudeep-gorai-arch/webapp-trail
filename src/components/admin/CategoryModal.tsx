"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Formik, Form, Field } from "formik";

import { FiX, FiSave, FiUpload, FiImage } from "react-icons/fi";

import { Category } from "@/types/category";

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    data?: Category | null;
    onSave: (formData: FormData) => Promise<void>;
}

const makeSlug = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function CategoryModal({
    open,
    onClose,
    data,
    onSave,
}: CategoryModalProps) {
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        setPreview(data?.thumbnailUrl || data?.coverImage || "");
    }, [data]);

    if (!open) return null;

    return (
        <div
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            backdrop-blur-md
            "
        >
            <div
                className="
                w-[620px]
                max-h-[88vh]
                overflow-y-auto
                rounded-[35px]
                bg-[rgba(20,20,30,0.96)]
                border
                border-white/10
                shadow-2xl
                p-8
                custom-scroll
                "
            >
                <div
                    className="
                    sticky
                    top-0
                    bg-[rgba(20,20,30,0.96)]
                    z-10
                    flex
                    justify-between
                    items-center
                    pb-5
                    mb-5
                    "
                >
                    <div>
                        <h2 className="text-3xl font-black gradient-text">
                            {data ? "Edit Category" : "Add Category"}
                        </h2>

                        <p className="theme-muted text-sm mt-1">
                            Backend will use this category slug/folder when wallpapers are uploaded.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-white/10
                        flex
                        items-center
                        justify-center
                        hover:bg-white/20
                        transition
                        "
                    >
                        <FiX size={22} />
                    </button>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: data?.name || "",
                        slug: data?.slug || "",
                        icon: data?.icon || "",
                        description: data?.description || "",
                        active: data?.active ?? true,
                        sortOrder: data?.sortOrder ?? 0,
                        thumbnail: null as File | null,
                    }}
                    onSubmit={async (values) => {
                        const formData = new FormData();

                        formData.append("name", values.name.trim());
                        formData.append("slug", makeSlug(values.slug || values.name));
                        formData.append("active", String(values.active));
                        formData.append("sortOrder", String(values.sortOrder || 0));

                        if (values.icon.trim()) {
                            formData.append("icon", values.icon.trim());
                        }

                        if (values.description.trim()) {
                            formData.append("description", values.description.trim());
                        }

                        if (values.thumbnail) {
                            formData.append("thumbnail", values.thumbnail);
                        }

                        await onSave(formData);
                    }}
                >
                    {({ setFieldValue, isSubmitting, values }) => (
                        <Form className="space-y-5">
                            <div>
                                <label className="theme-muted text-sm">Category thumbnail</label>

                                <label
                                    className="
                                    mt-2
                                    h-56
                                    w-full
                                    rounded-[28px]
                                    bg-white/10
                                    border
                                    border-white/10
                                    overflow-hidden
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:bg-white/15
                                    transition
                                    "
                                >
                                    {preview ? (
                                        <Image
                                            src={preview}
                                            alt="category thumbnail"
                                            width={700}
                                            height={260}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 theme-muted">
                                            <FiImage size={42} />
                                            <span>Upload thumbnail</span>
                                        </div>
                                    )}

                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];

                                            if (!file) return;

                                            setFieldValue("thumbnail", file);
                                            setPreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </label>

                                <div className="theme-muted text-xs mt-2 flex items-center gap-2">
                                    <FiUpload />
                                    Field sent as <span className="theme-text">thumbnail</span> to backend.
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="theme-muted text-sm">Name</label>

                                    <Field
                                        name="name"
                                        placeholder="Nature"
                                        className="
                                        mt-2
                                        w-full
                                        rounded-2xl
                                        bg-white/10
                                        border
                                        border-white/10
                                        p-4
                                        outline-none
                                        theme-text
                                        "
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const value = event.target.value;

                                            setFieldValue("name", value);

                                            if (!data) {
                                                setFieldValue("slug", makeSlug(value));
                                            }
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="theme-muted text-sm">Slug</label>

                                    <Field
                                        name="slug"
                                        placeholder="nature"
                                        className="
                                        mt-2
                                        w-full
                                        rounded-2xl
                                        bg-white/10
                                        border
                                        border-white/10
                                        p-4
                                        outline-none
                                        theme-text
                                        "
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="theme-muted text-sm">Description</label>

                                <Field
                                    as="textarea"
                                    name="description"
                                    rows={4}
                                    placeholder="Short category description"
                                    className="
                                    mt-2
                                    w-full
                                    rounded-2xl
                                    bg-white/10
                                    border
                                    border-white/10
                                    p-4
                                    outline-none
                                    theme-text
                                    resize-none
                                    "
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="theme-muted text-sm">Icon text</label>

                                    <Field
                                        name="icon"
                                        placeholder="image"
                                        className="
                                        mt-2
                                        w-full
                                        rounded-2xl
                                        bg-white/10
                                        border
                                        border-white/10
                                        p-4
                                        outline-none
                                        theme-text
                                        "
                                    />
                                </div>

                                <div>
                                    <label className="theme-muted text-sm">Sort order</label>

                                    <Field
                                        name="sortOrder"
                                        type="number"
                                        min="0"
                                        className="
                                        mt-2
                                        w-full
                                        rounded-2xl
                                        bg-white/10
                                        border
                                        border-white/10
                                        p-4
                                        outline-none
                                        theme-text
                                        "
                                    />
                                </div>

                                <label
                                    className="
                                    mt-6
                                    rounded-2xl
                                    bg-white/10
                                    border
                                    border-white/10
                                    p-4
                                    flex
                                    items-center
                                    gap-3
                                    cursor-pointer
                                    theme-text
                                    "
                                >
                                    <Field
                                        type="checkbox"
                                        name="active"
                                        checked={values.active}
                                        className="h-5 w-5"
                                    />
                                    Active
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="glass px-7 py-3 rounded-full font-bold"
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="
                                    px-7
                                    py-3
                                    rounded-full
                                    font-bold
                                    flex
                                    items-center
                                    gap-2
                                    disabled:opacity-60
                                    "
                                    style={{
                                        background:
                                            "linear-gradient(90deg,var(--primary),var(--secondary))",
                                        color: "white",
                                    }}
                                >
                                    <FiSave />
                                    {isSubmitting ? "Saving..." : "Save Category"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
