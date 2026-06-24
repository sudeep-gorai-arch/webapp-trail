"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useParams, useRouter } from "next/navigation";

import { Formik, Form, Field } from "formik";

import { FiSave, FiUpload, FiArrowLeft } from "react-icons/fi";

import { getWallpaperById, updateWallpaper } from "@/services/wallpaperService";

import { getCategories } from "@/services/categoryService";

import { Category } from "@/types/category";

export default function Page() {
  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

  const [preview, setPreview] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [wallpaper, categoryRes] = await Promise.all([
        getWallpaperById(id),

        getCategories(),
      ]);

      const data = wallpaper.data;

      setPreview(
        data.thumbnailUrl || data.imageUrl || "/placeholder-wallpaper.png",
      );

      setInitialValues({
        title: data.title,

        description: data.description || "",

        categoryId: data.category?.id || "",

        quality: data.quality || "4K",

        resolution: data.resolution,

        type: data.isPremium
          ? "premium"
          : data.isFeatured
            ? "featured"
            : "free",

        image: null,
      });

      setCategories(categoryRes.data || []);
    } catch (error) {
      console.log("EDIT LOAD ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  const selectStyle = {
    background: "var(--bg-main)",

    color: "var(--text-main)",
  };

  if (loading || !initialValues) {
    return <div className="p-10">Loading...</div>;
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
          className="
          glass
          px-6
          py-3
          rounded-full
          flex
          gap-2
          items-center
          "
        >
          <FiArrowLeft />
          Back
        </button>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const payload: any = {
            title: values.title,

            description: values.description,

            categoryId: values.categoryId,

            quality: values.quality,

            resolution: values.resolution,

            isPremium: values.type === "premium",

            isFeatured: values.type === "featured",
          };

          await updateWallpaper(id, payload);

          router.push("/admin/wallpapers");
        }}
      >
        {() => (
          <Form>
            <div className="grid grid-cols-3 gap-8">
              <div className="glass rounded-[35px] p-6">
                {preview && (
                  <Image
                    src={preview}
                    alt="preview"
                    width={500}
                    height={700}
                    className="
                    rounded-[25px]
                    h-[500px]
                    w-full
                    object-cover
                    "
                  />
                )}

                <label
                  className="
                mt-5
                glass
                rounded-2xl
                p-4
                flex
                justify-center
                gap-3
                cursor-pointer
                "
                >
                  <FiUpload />
                  Image disabled
                </label>
              </div>

              <div
                className="
              glass
              rounded-[35px]
              p-8
              col-span-2
              space-y-6
              "
              >
                <Field
                  name="title"
                  className="
                  glass
                  w-full
                  p-4
                  rounded-2xl
                  "
                />

                <Field
                  as="textarea"
                  name="description"
                  rows={5}
                  className="
                  glass
                  w-full
                  p-4
                  rounded-2xl
                  "
                />

                <Field
                  as="select"
                  name="categoryId"
                  style={selectStyle}
                  className="
                  glass
                  w-full
                  p-4
                  rounded-2xl
                  "
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Field>

                <Field
                  name="resolution"
                  className="
                  glass
                  w-full
                  p-4
                  rounded-2xl
                  "
                />

                <Field
                  as="select"
                  name="type"
                  style={selectStyle}
                  className="
                  glass
                  w-full
                  p-4
                  rounded-2xl
                  "
                >
                  <option value="free">Free</option>

                  <option value="premium">👑 Premium</option>

                  <option value="featured">⭐ Featured</option>
                </Field>

                <button
                  type="submit"
                  className="
                  px-10
                  py-4
                  rounded-full
                  font-black
                  flex
                  gap-3
                  "
                  style={{
                    background:
                      "linear-gradient(90deg,var(--primary),var(--secondary))",

                    color: "white",
                  }}
                >
                  <FiSave />
                  Save Changes
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
