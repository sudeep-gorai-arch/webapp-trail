"use client";

import { useState } from "react";

import Image from "next/image";

import { Formik, Form, Field } from "formik";

import { FiSave, FiEye, FiEyeOff, FiUpload } from "react-icons/fi";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const [avatar, setAvatar] = useState("https://picsum.photos/seed/admin/300");

  return (
    <div className="theme-text">
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-4xl font-black gradient-text">Admin Settings</h1>

        <p className="theme-muted">Manage your admin account information</p>
      </div>

      <Formik
        initialValues={{
          username: "Admin",

          email: "admin@flexiwalls.com",

          currentPassword: "",

          newPassword: "",

          confirmPassword: "",

          avatar: null,
        }}
        onSubmit={(values) => {
          console.log(values);

          /*

PATCH /admin/profile


{
 username,
 email,
 password,
 avatar
}


*/
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-3 gap-8">
              {/* PROFILE CARD */}

              <div
                className="
glass
rounded-[35px]
p-8
flex
flex-col
items-center
"
              >
                <Image
                  src={avatar}
                  alt="admin"
                  width={170}
                  height={170}
                  className="
rounded-full
w-40
h-40
object-cover
"
                />

                <label
                  className="
mt-6

glass

px-6
py-3

rounded-full

cursor-pointer

flex
gap-3
items-center
"
                >
                  <FiUpload />
                  Change Avatar
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      setAvatar(URL.createObjectURL(file));

                      setFieldValue("avatar", file);
                    }}
                  />
                </label>

                <div
                  className="
mt-8
text-center
"
                >
                  <h2
                    className="
text-2xl
font-bold
"
                  >
                    Administrator
                  </h2>

                  <p className="theme-muted">Super Admin Account</p>
                </div>
              </div>

              {/* ACCOUNT FORM */}

              <div
                className="
glass

rounded-[35px]

p-8

col-span-2

space-y-6
"
              >
                <div>
                  <label className="theme-muted">Username</label>

                  <Field
                    name="username"
                    className="
glass
mt-2
p-4
rounded-2xl
w-full
outline-none
theme-text
"
                  />
                </div>

                <div>
                  <label className="theme-muted">Email Address</label>

                  <Field
                    name="email"
                    type="email"
                    className="
glass
mt-2
p-4
rounded-2xl
w-full
outline-none
theme-text
"
                  />
                </div>

                {/* PASSWORD */}

                <div
                  className="
grid
grid-cols-2
gap-5
"
                >
                  <div>
                    <label className="theme-muted">Current Password</label>

                    <div
                      className="
glass
mt-2
p-4
rounded-2xl
flex
"
                    >
                      <Field
                        name="currentPassword"
                        type={showPassword ? "text" : "password"}
                        className="
bg-transparent
outline-none
flex-1
theme-text
"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="theme-muted">New Password</label>

                    <Field
                      name="newPassword"
                      type="password"
                      className="
glass
mt-2
p-4
rounded-2xl
w-full
outline-none
theme-text
"
                    />
                  </div>
                </div>

                <div>
                  <label className="theme-muted">Confirm Password</label>

                  <Field
                    name="confirmPassword"
                    type="password"
                    className="
glass
mt-2
p-4
rounded-2xl
w-full
outline-none
theme-text
"
                  />
                </div>

                <button
                  type="submit"
                  className="
mt-5

px-10
py-4

rounded-full

font-black

flex

items-center

gap-3

hover:scale-105

transition
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
