"use client";

import { useEffect, useState } from "react";

import { FiEdit, FiPlus, FiSearch } from "react-icons/fi";

import CategoryModal from "@/components/admin/CategoryModal";

import {
  getCategories,
  createCategory,
  updateCategory,
} from "@/services/categoryService";

import { Category } from "@/types/category";

import * as Icons from "react-icons/io5";

export default function Page() {
  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState<any>(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const perPage = 5;

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);

      const res = await getCategories();

      setCategories(res.data || []);
    } catch (error) {
      console.log("CATEGORY ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveCategory(value: any) {
    try {
      if (edit) {
        await updateCategory(edit.id, value);
      } else {
        await createCategory(value);
      }

      setOpen(false);

      setEdit(null);

      await loadCategories();
    } catch (error) {
      console.log("SAVE CATEGORY ERROR", error);
    }
  }

  const filteredList = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filteredList.length / perPage));

  const list = filteredList.slice(
    (page - 1) * perPage,

    page * perPage,
  );

  function convertIconName(icon?: string | null) {
    if (!icon) return "";

    return (
      "Io" +
      icon
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("")
    );
  }

  return (
    <div className="theme-text">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black gradient-text">Categories</h1>

          <p className="theme-muted">Manage wallpaper categories</p>
        </div>

        <button
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

      {/* SEARCH */}

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
          onChange={(e) => {
            setSearch(e.target.value);

            setPage(1);
          }}
          placeholder="Search category..."
          className="
bg-transparent
outline-none
theme-text
w-full
"
        />
      </div>

      {/* TABLE */}

      <div
        className="
glass
rounded-[35px]
overflow-hidden
"
      >
        <table className="w-full">
          <thead>
            <tr className="theme-muted text-left">
              <th className="p-5">Icon</th>

              <th>Name</th>

              <th>Slug</th>

              <th>Wallpapers</th>

              <th>Created</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-10">Loading...</td>
              </tr>
            ) : (
              list.map((category) => {
                const Icon = (Icons as any)[convertIconName(category.icon)];

                return (
                  <tr
                    key={category.id}
                    style={{
                      borderTop:
                        "1px solid color-mix(in srgb,var(--text-main) 10%,transparent)",
                    }}
                  >
                    <td className="p-5 text-3xl">{Icon ? <Icon /> : "✨"}</td>

                    <td className="font-bold">{category.name}</td>

                    <td className="theme-muted">{category.slug}</td>

                    <td>{category.count ?? 0}</td>

                    <td className="theme-muted">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          setEdit(category);

                          setOpen(true);
                        }}
                        className="
glass
w-10
h-10
rounded-full
flex
items-center
justify-center
hover:scale-110
transition
"
                      >
                        <FiEdit />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      <div
        className="
glass
rounded-[25px]
p-5
mt-8
flex
justify-between
items-center
"
      >
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
            onClick={() => setPage((p) => p - 1)}
            className="
glass
px-5
py-2
rounded-full
disabled:opacity-40
"
          >
            ← Previous
          </button>

          <span className="px-5 py-2">
            {page}/{totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="
glass
px-5
py-2
rounded-full
disabled:opacity-40
"
          >
            Next →
          </button>
        </div>
      </div>

      <CategoryModal
        open={open}
        data={edit}
        onClose={() => setOpen(false)}
        onSave={saveCategory}
      />
    </div>
  );
}
