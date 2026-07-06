"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Formik, Form, Field, FieldArray } from "formik";

import {
    FiUpload,
    FiTrash,
    FiArrowLeft,
    FiCheckCircle,
    FiXCircle,
    FiX,
    FiVideo,
    FiImage,
} from "react-icons/fi";

import { useRouter } from "next/navigation";

import { uploadWallpapers } from "@/services/wallpaperService";

import { getCategories } from "@/services/categoryService";

import { Category } from "@/types/category";

type MediaType = "IMAGE" | "VIDEO";

type UploadPopup = {
    type: "success" | "error";
    title: string;
    message: string;
    uploadedCount: number;
    totalCount: number;
};

type WallpaperUploadItem = {
    title: string;
    description?: string;
    file: File;
    mediaType: MediaType;
    previewImage?: File;
    thumbnail?: File;
    durationSeconds?: string;
    videoBitrate?: string;
    videoFps?: string;
};

type PreviewItem = {
    mediaUrl: string;
    previewImageUrl?: string;
    thumbnailUrl?: string;
};

const selectStyle = {
    background: "var(--bg-main)",
    color: "var(--text-main)",
};

const acceptedMedia =
    "image/*,video/mp4,video/webm,video/quicktime,video/x-m4v,.mp4,.webm,.mov,.m4v";

function isVideoFile(file: File) {
    const type = String(file.type || "").toLowerCase();

    if (type.startsWith("video/")) {
        return true;
    }

    return /\.(mp4|webm|mov|m4v)$/i.test(file.name);
}

function getMediaType(file: File): MediaType {
    return isVideoFile(file) ? "VIDEO" : "IMAGE";
}

function cleanFileName(fileName: string) {
    return fileName.replace(/\.[^/.]+$/, "");
}

function formatFileSize(size: number) {
    if (!Number.isFinite(size) || size <= 0) {
        return "0 MB";
    }

    const mb = size / (1024 * 1024);

    if (mb >= 1) {
        return `${mb.toFixed(1)} MB`;
    }

    return `${(size / 1024).toFixed(1)} KB`;
}

function revokePreviewItem(preview?: PreviewItem) {
    if (!preview) return;

    if (preview.mediaUrl) {
        URL.revokeObjectURL(preview.mediaUrl);
    }

    if (preview.previewImageUrl) {
        URL.revokeObjectURL(preview.previewImageUrl);
    }

    if (preview.thumbnailUrl) {
        URL.revokeObjectURL(preview.thumbnailUrl);
    }
}

export default function Page() {
    const router = useRouter();

    const [previews, setPreviews] = useState<PreviewItem[]>([]);

    const [categories, setCategories] = useState<Category[]>([]);

    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState("");

    const [uploadPopup, setUploadPopup] = useState<UploadPopup | null>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            const res = await getCategories({
                active: true,
                limit: 100,
                offset: 0,
            });

            setCategories(res.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to load categories");
        }
    }

    function addFiles(
        files: File[],
        currentWallpapers: WallpaperUploadItem[],
        setFieldValue: (field: string, value: any) => void,
    ) {
        if (files.length === 0) {
            return;
        }

        const newWallpapers: WallpaperUploadItem[] = files.map((file) => {
            const mediaType = getMediaType(file);

            return {
                title: cleanFileName(file.name),
                description: "",
                file,
                mediaType,
                durationSeconds: "",
                videoBitrate: "",
                videoFps: "",
            };
        });

        const newPreviews: PreviewItem[] = files.map((file) => ({
            mediaUrl: URL.createObjectURL(file),
        }));

        setPreviews((old) => [...old, ...newPreviews]);

        setFieldValue("wallpapers", [
            ...currentWallpapers,
            ...newWallpapers,
        ]);
    }

    function removeFile(index: number, remove: (index: number) => void) {
        remove(index);

        setPreviews((current) => {
            revokePreviewItem(current[index]);

            return current.filter((_, i) => i !== index);
        });
    }

    function updateExtraPreview(
        index: number,
        type: "previewImageUrl" | "thumbnailUrl",
        file: File,
    ) {
        const url = URL.createObjectURL(file);

        setPreviews((current) => {
            const next = [...current];

            const oldPreview = next[index];

            if (!oldPreview) {
                next[index] = {
                    mediaUrl: "",
                    [type]: url,
                };

                return next;
            }

            const oldUrl = oldPreview[type];

            if (oldUrl) {
                URL.revokeObjectURL(oldUrl);
            }

            next[index] = {
                ...oldPreview,
                [type]: url,
            };

            return next;
        });
    }

    return (
        <div className="theme-text">
            <div className="mb-10 flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-black gradient-text">
                        Batch Upload Wallpapers
                    </h1>

                    <p className="theme-muted mt-2">
                        Upload image and video wallpapers to the backend. Images
                        are stored as static wallpapers, and videos are stored as
                        video wallpapers with optional preview/thumbnail images.
                    </p>
                </div>

                <button
                    onClick={() => router.back()}
                    className="glass flex items-center gap-2 rounded-full px-6 py-3"
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
                initialValues={{
                    categoryId: "",
                    quality: "UHD_4K",
                    type: "free",
                    tags: "",
                    wallpapers: [] as WallpaperUploadItem[],
                }}
                onSubmit={async (values, { resetForm }) => {
                    const totalCount = values.wallpapers.length;

                    try {
                        setError("");
                        setUploadPopup(null);

                        if (!values.categoryId) {
                            setError("Select a category first.");
                            return;
                        }

                        if (totalCount === 0) {
                            setError("Select at least one wallpaper image or video.");
                            return;
                        }

                        setUploading(true);

                        const res = await uploadWallpapers({
                            categoryId: values.categoryId,
                            quality: values.quality,
                            isPremium: values.type === "premium",
                            isFeatured: values.type === "featured",
                            tags: values.tags,
                            wallpapers: values.wallpapers,
                        });

                        const uploadedCount = Array.isArray(res.data)
                            ? res.data.length
                            : totalCount;

                        setUploadPopup({
                            type: "success",
                            title: "Upload Completed",
                            message:
                                uploadedCount === totalCount
                                    ? "All selected wallpapers were uploaded successfully."
                                    : `${uploadedCount} wallpapers were uploaded successfully. ${
                                          totalCount - uploadedCount
                                      } wallpapers were not uploaded.`,
                            uploadedCount,
                            totalCount,
                        });

                        resetForm();

                        previews.forEach(revokePreviewItem);
                        setPreviews([]);
                    } catch (err: any) {
                        const backendMessage =
                            err.response?.data?.message ||
                            err.message ||
                            "Upload failed. Please try again.";

                        const uploadedCount = Array.isArray(err.response?.data?.data)
                            ? err.response.data.data.length
                            : 0;

                        setUploadPopup({
                            type: "error",
                            title: "Upload Failed",
                            message: backendMessage,
                            uploadedCount,
                            totalCount,
                        });

                        setError("");
                    } finally {
                        setUploading(false);
                    }
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div
                            className="
                            glass
                            rounded-[35px]
                            p-8
                            grid
                            grid-cols-4
                            gap-6
                            mb-10
                            "
                        >
                            <div>
                                <label className="theme-muted">Category</label>

                                <Field
                                    as="select"
                                    name="categoryId"
                                    style={selectStyle}
                                    className="glass mt-2 w-full p-4 rounded-2xl outline-none"
                                >
                                    <option value="">Select</option>

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

                            <div>
                                <label className="theme-muted">Tags</label>

                                <Field
                                    name="tags"
                                    placeholder="anime, dark, mobile"
                                    className="glass mt-2 w-full p-4 rounded-2xl outline-none theme-text"
                                />
                            </div>
                        </div>

                        <label
                            className="
                            glass
                            rounded-[35px]
                            h-56
                            flex
                            flex-col
                            items-center
                            justify-center
                            cursor-pointer
                            mb-10
                            border
                            border-white/10
                            transition
                            hover:border-white/25
                            "
                        >
                            <FiUpload size={45} />

                            <h2 className="text-xl font-bold mt-4">
                                Select Wallpapers
                            </h2>

                            <p className="theme-muted text-sm mt-2 text-center">
                                Images: JPG, PNG, WEBP, AVIF
                                <br />
                                Videos: MP4, WEBM, MOV, M4V
                            </p>

                            <input
                                hidden
                                multiple
                                type="file"
                                accept={acceptedMedia}
                                onChange={(event) => {
                                    const files = Array.from(event.target.files || []);

                                    addFiles(
                                        files,
                                        values.wallpapers,
                                        setFieldValue,
                                    );

                                    event.target.value = "";
                                }}
                            />
                        </label>

                        <FieldArray name="wallpapers">
                            {({ remove }) => (
                                <div className="grid grid-cols-4 gap-5">
                                    {values.wallpapers.map((item, index) => {
                                        const preview = previews[index];

                                        const isVideo = item.mediaType === "VIDEO";

                                        return (
                                            <div
                                                key={`${item.file.name}-${index}`}
                                                className="glass rounded-[25px] p-4"
                                            >
                                                <div className="relative overflow-hidden rounded-xl bg-black/40">
                                                    {isVideo ? (
                                                        <video
                                                            src={preview?.mediaUrl}
                                                            className="h-36 w-full object-cover"
                                                            muted
                                                            loop
                                                            playsInline
                                                            controls
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={preview?.mediaUrl || ""}
                                                            alt="preview"
                                                            width={260}
                                                            height={170}
                                                            unoptimized
                                                            className="h-36 w-full object-cover"
                                                        />
                                                    )}

                                                    <div
                                                        className={`
                                                        absolute
                                                        left-3
                                                        top-3
                                                        flex
                                                        items-center
                                                        gap-1.5
                                                        rounded-full
                                                        px-3
                                                        py-1
                                                        text-xs
                                                        font-bold
                                                        ${
                                                            isVideo
                                                                ? "bg-purple-500/80 text-white"
                                                                : "bg-emerald-500/80 text-white"
                                                        }
                                                        `}
                                                    >
                                                        {isVideo ? <FiVideo /> : <FiImage />}
                                                        {isVideo ? "Video" : "Image"}
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex items-center justify-between gap-2 text-xs text-white/50">
                                                    <span className="truncate">
                                                        {item.file.name}
                                                    </span>

                                                    <span>{formatFileSize(item.file.size)}</span>
                                                </div>

                                                <Field
                                                    as="select"
                                                    name={`wallpapers.${index}.mediaType`}
                                                    style={selectStyle}
                                                    className="glass mt-3 p-3 rounded-xl w-full outline-none theme-text text-sm"
                                                >
                                                    <option value="IMAGE">Image Wallpaper</option>
                                                    <option value="VIDEO">Video Wallpaper</option>
                                                </Field>

                                                <Field
                                                    name={`wallpapers.${index}.title`}
                                                    placeholder="Title"
                                                    className="glass mt-3 p-3 rounded-xl w-full outline-none theme-text text-sm"
                                                />

                                                <Field
                                                    as="textarea"
                                                    name={`wallpapers.${index}.description`}
                                                    placeholder="Description"
                                                    rows={3}
                                                    className="glass mt-3 p-3 rounded-xl w-full outline-none theme-text text-sm resize-none"
                                                />

                                                {isVideo && (
                                                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                                                        <div className="mb-3 text-xs font-bold text-white/70">
                                                            Video options
                                                        </div>

                                                        <label className="block cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white/70 transition hover:bg-white/[0.08]">
                                                            Preview Image
                                                            <span className="ml-2 text-white/35">
                                                                optional
                                                            </span>

                                                            <input
                                                                hidden
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(event) => {
                                                                    const file =
                                                                        event.target.files?.[0];

                                                                    if (!file) return;

                                                                    setFieldValue(
                                                                        `wallpapers.${index}.previewImage`,
                                                                        file,
                                                                    );

                                                                    updateExtraPreview(
                                                                        index,
                                                                        "previewImageUrl",
                                                                        file,
                                                                    );

                                                                    event.target.value = "";
                                                                }}
                                                            />
                                                        </label>

                                                        {preview?.previewImageUrl && (
                                                            <Image
                                                                src={preview.previewImageUrl}
                                                                alt="video preview"
                                                                width={220}
                                                                height={120}
                                                                unoptimized
                                                                className="mt-3 h-20 w-full rounded-xl object-cover"
                                                            />
                                                        )}

                                                        <label className="mt-3 block cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white/70 transition hover:bg-white/[0.08]">
                                                            Thumbnail Image
                                                            <span className="ml-2 text-white/35">
                                                                optional
                                                            </span>

                                                            <input
                                                                hidden
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(event) => {
                                                                    const file =
                                                                        event.target.files?.[0];

                                                                    if (!file) return;

                                                                    setFieldValue(
                                                                        `wallpapers.${index}.thumbnail`,
                                                                        file,
                                                                    );

                                                                    updateExtraPreview(
                                                                        index,
                                                                        "thumbnailUrl",
                                                                        file,
                                                                    );

                                                                    event.target.value = "";
                                                                }}
                                                            />
                                                        </label>

                                                        {preview?.thumbnailUrl && (
                                                            <Image
                                                                src={preview.thumbnailUrl}
                                                                alt="video thumbnail"
                                                                width={220}
                                                                height={120}
                                                                unoptimized
                                                                className="mt-3 h-20 w-full rounded-xl object-cover"
                                                            />
                                                        )}

                                                        <div className="mt-3 grid grid-cols-3 gap-2">
                                                            <Field
                                                                name={`wallpapers.${index}.durationSeconds`}
                                                                placeholder="Duration"
                                                                className="glass p-2 rounded-xl w-full outline-none theme-text text-xs"
                                                            />

                                                            <Field
                                                                name={`wallpapers.${index}.videoBitrate`}
                                                                placeholder="Bitrate"
                                                                className="glass p-2 rounded-xl w-full outline-none theme-text text-xs"
                                                            />

                                                            <Field
                                                                name={`wallpapers.${index}.videoFps`}
                                                                placeholder="FPS"
                                                                className="glass p-2 rounded-xl w-full outline-none theme-text text-xs"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index, remove)}
                                                    className="mt-3 w-full glass p-3 rounded-xl flex items-center justify-center gap-2 text-red-300 transition hover:bg-red-500/10"
                                                >
                                                    <FiTrash />
                                                    Remove
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </FieldArray>

                        <button
                            disabled={uploading}
                            type="submit"
                            className="mt-10 px-10 py-4 rounded-full font-black disabled:opacity-60"
                            style={{
                                background:
                                    "linear-gradient(90deg,var(--primary),var(--secondary))",
                                color: "white",
                            }}
                        >
                            {uploading
                                ? "Uploading..."
                                : `Upload ${values.wallpapers.length || ""} Wallpapers 🚀`}
                        </button>
                    </Form>
                )}
            </Formik>

            {uploadPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-5 backdrop-blur-sm">
                    <div
                        className="
                        relative
                        w-full
                        max-w-[460px]
                        rounded-[35px]
                        border
                        border-white/15
                        bg-[rgba(18,18,24,0.98)]
                        p-8
                        text-center
                        shadow-[0_30px_90px_rgba(0,0,0,0.85)]
                        "
                    >
                        <button
                            onClick={() => setUploadPopup(null)}
                            className="
                            absolute
                            right-5
                            top-5
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/15
                            bg-white/10
                            hover:bg-white/20
                            transition
                            "
                        >
                            <FiX />
                        </button>

                        <div
                            className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border ${
                                uploadPopup.type === "success"
                                    ? "border-green-400/30 bg-green-500/20 text-green-300"
                                    : "border-red-400/30 bg-red-500/20 text-red-300"
                            }`}
                        >
                            {uploadPopup.type === "success" ? (
                                <FiCheckCircle size={42} />
                            ) : (
                                <FiXCircle size={42} />
                            )}
                        </div>

                        <h2 className="text-3xl font-black gradient-text">
                            {uploadPopup.title}
                        </h2>

                        <p className="mt-3 leading-7 text-white/80">
                            {uploadPopup.message}
                        </p>

                        <div
                            className="
                            mt-7
                            rounded-[25px]
                            border
                            border-white/15
                            bg-[rgba(255,255,255,0.08)]
                            p-5
                            "
                        >
                            <div className="text-sm text-white/60">
                                Wallpapers uploaded
                            </div>

                            <div
                                className={`mt-2 text-4xl font-black ${
                                    uploadPopup.type === "success"
                                        ? "text-green-300"
                                        : "text-red-300"
                                }`}
                            >
                                {uploadPopup.uploadedCount}
                                <span className="text-xl text-white/55">
                                    {" "}
                                    / {uploadPopup.totalCount}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setUploadPopup(null)}
                            className="mt-8 w-full rounded-full px-8 py-4 font-black shadow-lg transition hover:scale-[1.02]"
                            style={{
                                background:
                                    uploadPopup.type === "success"
                                        ? "linear-gradient(90deg,#16a34a,#22c55e)"
                                        : "linear-gradient(90deg,#dc2626,#f97316)",
                                color: "white",
                            }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}