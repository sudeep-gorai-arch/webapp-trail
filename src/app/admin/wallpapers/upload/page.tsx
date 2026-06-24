"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Formik, Form, Field, FieldArray } from "formik";

import { FiUpload, FiTrash } from "react-icons/fi";

import { uploadWallpapers } from "@/services/wallpaperService";

import { getCategories } from "@/services/categoryService";

import { Category } from "@/types/category";

export default function Page() {
  const [previews, setPreviews] = useState<string[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const res = await getCategories();

      setCategories(res.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  const selectStyle = {
    background: "var(--bg-main)",
    color: "var(--text-main)",
  };

  return (
    <div className="theme-text">
      <h1 className="text-4xl font-black gradient-text">
        Batch Upload Wallpapers
      </h1>

      <p className="theme-muted mt-2 mb-10">
        Upload multiple wallpapers into same category
      </p>

      <Formik
        initialValues={{
          categoryId: "",

          quality: "4K",

          resolution: "2160x3840",

          type: "free",

          wallpapers: [] as any[],
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (!values.categoryId) {
              alert("Select category");

              return;
            }

            if (values.wallpapers.length === 0) {
              alert("Select wallpapers");

              return;
            }

            setUploading(true);

            await uploadWallpapers({
              categoryId: values.categoryId,

              quality: values.quality,

              resolution: values.resolution,

              isPremium: values.type === "premium",

              isFeatured: values.type === "featured",

              wallpapers: values.wallpapers,
            });

            alert("Wallpapers uploaded 🚀");

            resetForm();

            setPreviews([]);
          } catch (error) {
            console.log(error);

            alert("Upload failed");
          } finally {
            setUploading(false);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* SETTINGS */}

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
                  className="
glass
mt-2
w-full
p-4
rounded-2xl
outline-none
"
                >
                  <option value="">Select</option>

                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
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
                  className="
glass
mt-2
w-full
p-4
rounded-2xl
"
                >
                  <option>4K</option>

                  <option>8K</option>
                </Field>
              </div>

              <div>
                <label className="theme-muted">Resolution</label>

                <Field
                  name="resolution"
                  className="
glass
mt-2
w-full
p-4
rounded-2xl
outline-none
theme-text
"
                />
              </div>

              <div>
                <label className="theme-muted">Wallpaper Type</label>

                <Field
                  as="select"
                  name="type"
                  style={selectStyle}
                  className="
glass
mt-2
w-full
p-4
rounded-2xl
"
                >
                  <option value="free">Free</option>

                  <option value="premium">👑 Premium</option>

                  <option value="featured">⭐ Featured</option>
                </Field>
              </div>
            </div>

            {/* UPLOAD BOX */}

            <label
              className="
glass
rounded-[35px]
h-52
flex
flex-col
items-center
justify-center
cursor-pointer
mb-10
"
            >
              <FiUpload size={45} />

              <h2 className="text-xl font-bold mt-4">Select Wallpapers</h2>

              <input
                hidden
                multiple
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);

                  setPreviews((old) => [
                    ...old,

                    ...files.map((f) => URL.createObjectURL(f)),
                  ]);

                  setFieldValue(
                    "wallpapers",

                    [
                      ...values.wallpapers,

                      ...files.map((f) => ({
                        title: f.name.replace(/\..+/, ""),

                        description: "",

                        file: f,
                      })),
                    ],
                  );
                }}
              />
            </label>

            <FieldArray name="wallpapers">
              {({ remove }) => (
                <div
                  className="
grid
grid-cols-5
gap-5
"
                >
                  {values.wallpapers.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="
glass
rounded-[25px]
p-4
"
                    >
                      <Image
                        src={previews[index]}
                        alt="preview"
                        width={200}
                        height={160}
                        className="
h-32
w-full
object-cover
rounded-xl
"
                      />

                      <Field
                        name={`wallpapers.${index}.title`}
                        className="
glass
mt-3
p-3
rounded-xl
w-full
outline-none
theme-text
text-sm
"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          remove(index);

                          setPreviews((p) => p.filter((_, i) => i !== index));
                        }}
                        className="
mt-3
w-full
glass
p-2
rounded-xl
flex
justify-center
"
                      >
                        <FiTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            <button
              disabled={uploading}
              type="submit"
              className="
mt-10
px-10
py-4
rounded-full
font-black
"
              style={{
                background:
                  "linear-gradient(90deg,var(--primary),var(--secondary))",

                color: "white",
              }}
            >
              {uploading ? "Uploading..." : "Upload Wallpapers 🚀"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
