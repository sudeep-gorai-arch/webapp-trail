"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { FiEdit, FiTrash, FiPlus, FiSearch } from "react-icons/fi";

import {
  getWallpapers,
  deleteWallpaper,
  updateWallpaper,
} from "@/services/wallpaperService";

import { Wallpaper } from "@/types/wallpaper";

import { getCategories } from "@/services/categoryService";
import { Category } from "@/types/category";

import * as Icons from "react-icons/io5";

export default function Page() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  const limit = 5;

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadWallpapers();
  }, [page, search, category, activeTab]);

  async function loadWallpapers() {
    try {
      setLoading(true);

      const res = await getWallpapers(
        limit,
        (page - 1) * limit,
        search,
        category,
        activeTab === "active",
      );

      setWallpapers(res.data || []);

      setTotal(res.pagination?.total || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const res = await getCategories();

      setCategories(res.data || []);
    } catch (error) {
      console.log("CATEGORY ERROR", error);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);

      await deleteWallpaper(deleteId);

      setDeleteId(null);

      loadWallpapers();
    } catch (error) {
      console.log("DELETE ERROR", error);
    } finally {
      setDeleteLoading(false);
    }
  }

  async function handleActivate(id: string) {
    try {
      await updateWallpaper(id, {
        active: true,
      });

      loadWallpapers();
    } catch (error) {
      console.log("ACTIVE ERROR", error);
    }
  }

  return (
    <div className="theme-text">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black gradient-text">Wallpapers</h1>

          <p className="theme-muted">Manage uploaded wallpapers</p>
        </div>

        <Link
          href={"/admin/wallpapers/upload"}
          prefetch={false}
          className="
    px-6
    py-3
    rounded-full
    font-bold
    flex
    gap-2
    items-center
  "
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

      {/* STATUS TABS */}

      <div
        className="
    glass
    rounded-full
    p-2
    mb-8
    inline-flex
    gap-3
  "
      >
        <button
          onClick={() => {
            setActiveTab("active");
            setPage(1);
          }}
          className={`
      px-8
      py-3
      rounded-full
      font-bold
      transition

      ${activeTab === "active" ? "bg-green-600 text-white" : "theme-muted"}
    `}
        >
          Active Wallpapers
        </button>

        <button
          onClick={() => {
            setActiveTab("inactive");
            setPage(1);
          }}
          className={`
      px-8
      py-3
      rounded-full
      font-bold
      transition

      ${activeTab === "inactive" ? "bg-red-600 text-white" : "theme-muted"}
    `}
        >
          Inactive Wallpapers
        </button>
      </div>

      {/* FILTER */}

      <div
        className="
glass
rounded-[30px]
p-5
mb-8

flex
gap-5
"
      >
        <div
          className="
glass
flex-1
rounded-full
px-5
py-3

flex
gap-3
items-center
"
        >
          <FiSearch />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setPage(1);
            }}
            placeholder="Search wallpaper"
            className="
bg-transparent
outline-none
theme-text
w-full
"
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="
    glass
    rounded-full
    px-5
    outline-none
    theme-text
  "
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
              <th className="p-5">Preview</th>

              <th>Title</th>

              <th>Category</th>

              <th>Likes</th>

              <th>Downloads</th>

              <th>Date</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-10">Loading...</td>
              </tr>
            ) : (
              wallpapers.map((item) => (
                <tr key={item.id}>
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
                      className="
rounded-xl
object-cover
"
                    />
                  </td>

                  <td className="font-bold">{item.title}</td>

                  <td>
                    <span className="glass px-4 py-2 rounded-full">
                      {item.category?.name}
                    </span>
                  </td>

                  <td>❤️ {item.likes}</td>

                  <td>⬇ {item.downloadCount}</td>

                  <td className="theme-muted">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="flex gap-3">
                      {activeTab === "active" ? (
                        <>
                          <Link
                            href={`/admin/wallpapers/edit/${item.id}`}
                            className="
              glass
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
            "
                          >
                            <FiEdit />
                          </Link>

                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="
              glass
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              text-red-500
            "
                          >
                            <FiTrash />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleActivate(item.id)}
                          className="
            px-5
            py-2
            rounded-full
            bg-green-600
            text-white
            font-bold
          "
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

      {/* PAGINATION */}

      <div
        className="
glass
rounded-[25px]
p-5
mt-8

flex
justify-between
"
      >
        <span className="theme-muted">Total {total} wallpapers</span>

        <div className="flex gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="glass px-5 py-2 rounded-full"
          >
            Prev
          </button>

          <span className="px-5 py-2">
            {page}/{totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="glass px-5 py-2 rounded-full"
          >
            Next
          </button>
        </div>
      </div>

      {deleteId && (
        <div
          className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
"
        >
          <div
            className="
glass
rounded-[30px]
p-8
w-[400px]
text-center
"
          >
            <h2
              className="
text-2xl
font-bold
mb-3
"
            >
              Delete Wallpaper?
            </h2>

            <p
              className="
theme-muted
mb-8
"
            >
              This action cannot be undone.
            </p>

            <div
              className="
flex
gap-5
justify-center
"
            >
              <button
                onClick={() => setDeleteId(null)}
                className="
glass
px-6
py-3
rounded-full
"
              >
                Cancel
              </button>

              <button
                disabled={deleteLoading}
                onClick={handleDelete}
                className="
px-6
py-3
rounded-full
bg-red-600
text-white
"
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
