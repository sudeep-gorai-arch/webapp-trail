"use client";

import { useMemo, useState } from "react";

import { Formik, Form, Field } from "formik";

import { FiX, FiSave, FiSearch } from "react-icons/fi";

import * as Icons from "react-icons/io5";

import type { IconType } from "react-icons";

// ==============================
// DYNAMIC ICON LIST
// ==============================

const iconList = Object.entries(Icons)
  .filter(([name]) => name.startsWith("Io"))
  .map(([name, Icon]) => {
    const value = name
      .replace(/^Io/, "")
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "");

    return {
      name,
      value,
      Icon: Icon as IconType,
    };
  });

export default function CategoryModal({
  open,
  onClose,
  data,
  onSave,
}: any) {
  const [iconSearch, setIconSearch] = useState("");

  const filteredIcons = useMemo(() => {
    return iconList.filter((item) =>
      item.value.includes(iconSearch.toLowerCase()),
    );
  }, [iconSearch]);

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
      {/* MODAL */}

      <div
        className="
        w-[540px]

        max-h-[85vh]
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
        {/* HEADER */}

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
          <h2
            className="
            text-3xl
            font-black
            gradient-text
            "
          >
            {data ? "Edit Category" : "Add Category"}
          </h2>

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
          }}
          onSubmit={async (values) => {
            await onSave(values);
          }}
        >
          {({
            setFieldValue,
            isSubmitting,
            values,
          }) => (
            <Form className="space-y-5">
              {/* NAME */}

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
                  onChange={(e: any) => {
                    const value = e.target.value;

                    setFieldValue("name", value);

                    setFieldValue(
                      "slug",
                      value.toLowerCase().trim().replaceAll(" ", "-"),
                    );
                  }}
                />
              </div>

              {/* SLUG */}

              <div>
                <label className="theme-muted text-sm">Slug</label>

                <Field
                  name="slug"
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

              {/* ICON */}

              <div>
                <label className="theme-muted text-sm">Icon</label>

                {/* SELECTED */}

                <div
                  className="
                  mt-2

                  w-full

                  rounded-2xl

                  bg-white/10

                  border
                  border-white/10

                  p-4

                  flex
                  items-center
                  gap-3

                  theme-text
                  "
                >
                  {values.icon &&
                    (() => {
                      const selected = iconList.find(
                        (i) => i.value === values.icon,
                      );

                      if (!selected) return null;

                      const Icon = selected.Icon;

                      return <Icon className="text-2xl" />;
                    })()}

                  <span>{values.icon || "Select Icon"}</span>
                </div>

                {/* SEARCH */}

                <div
                  className="
                  mt-3

                  bg-white/10

                  rounded-xl

                  px-4
                  py-3

                  flex
                  items-center
                  gap-2
                  "
                >
                  <FiSearch />

                  <input
                    value={iconSearch}
                    onChange={(e) => setIconSearch(e.target.value)}
                    placeholder="Search icon"
                    className="
                    bg-transparent
                    outline-none
                    w-full
                    "
                  />
                </div>

                {/* ICON GRID */}

                <div
                  className="
                  mt-4

                  grid
                  grid-cols-8

                  gap-3

                  max-h-[180px]

                  overflow-y-auto

                  pr-2

                  custom-scroll
                  "
                >
                  {filteredIcons.map((item) => {
                    const Icon = item.Icon;

                    return (
                      <button
                        type="button"
                        key={item.name}
                        title={item.value}
                        onClick={() => {
                          setFieldValue("icon", item.value);
                        }}
                        className={`

                        h-12

                        rounded-xl

                        flex
                        items-center
                        justify-center

                        text-xl

                        transition


                        ${
                          values.icon === item.value
                            ? `
                          bg-purple-600
                          text-white
                          scale-105
                          `
                            : `
                          bg-white/10
                          hover:bg-white/20
                          `
                        }

                        `}
                      >
                        <Icon />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SAVE */}

              <button
                disabled={isSubmitting}
                type="submit"
                className="
                sticky
                bottom-0

                w-full

                py-4

                rounded-full

                font-black

                flex
                justify-center
                items-center
                gap-3

                hover:scale-[1.02]

                transition

                disabled:opacity-50
                "
                style={{
                  background:
                    "linear-gradient(90deg,var(--primary),var(--secondary))",

                  color: "white",
                }}
              >
                <FiSave />

                {isSubmitting
                  ? "Saving..."
                  : data
                    ? "Update Category"
                    : "Create Category"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}