"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Formik, Form, Field } from "formik";

import { FiSave, FiInfo } from "react-icons/fi";

import { userService, User } from "@/services/userService";

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            setLoading(true);
            setError("");
            const res = await userService.me();
            setUser(res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to load profile");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="theme-text p-10">Loading...</div>;
    }

    return (
        <div className="theme-text">
            <div className="mb-10">
                <h1 className="text-4xl font-black gradient-text">Admin Settings</h1>

                <p className="theme-muted">
                    Update fields supported by backend /api/users/me
                </p>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-blue-200">
                <FiInfo className="mt-1" />
                <p>
                    Backend currently supports username, bio, and avatarUrl. Password and email change endpoints are not available in this backend project.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                    {error}
                </div>
            )}

            {message && (
                <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
                    {message}
                </div>
            )}

            <Formik
                enableReinitialize
                initialValues={{
                    username: user?.username || "",
                    email: user?.email || "",
                    bio: user?.bio || "",
                    avatarUrl: user?.avatarUrl || "",
                }}
                onSubmit={async (values) => {
                    try {
                        setSaving(true);
                        setError("");
                        setMessage("");

                        const res = await userService.update({
                            username: values.username,
                            bio: values.bio,
                            avatarUrl: values.avatarUrl,
                        });

                        setUser(res.data);
                        setMessage("Profile updated successfully.");
                    } catch (err: any) {
                        setError(err.response?.data?.message || "Unable to save profile");
                    } finally {
                        setSaving(false);
                    }
                }}
            >
                {({ values }) => (
                    <Form>
                        <div className="grid grid-cols-3 gap-8">
                            <div className="glass rounded-[35px] p-8 flex flex-col items-center">
                                <Image
                                    src={values.avatarUrl || "https://picsum.photos/seed/admin/300"}
                                    alt="admin"
                                    width={170}
                                    height={170}
                                    className="rounded-full w-40 h-40 object-cover"
                                />

                                <div className="mt-8 text-center">
                                    <h2 className="text-2xl font-bold">
                                        {user?.username || "Administrator"}
                                    </h2>

                                    <p className="theme-muted">
                                        {user?.role?.name || "Admin Account"}
                                    </p>
                                </div>
                            </div>

                            <div className="glass rounded-[35px] p-8 col-span-2 space-y-6">
                                <div>
                                    <label className="theme-muted">Username</label>

                                    <Field
                                        name="username"
                                        className="glass mt-2 p-4 rounded-2xl w-full outline-none theme-text"
                                    />
                                </div>

                                <div>
                                    <label className="theme-muted">Email Address</label>

                                    <Field
                                        name="email"
                                        type="email"
                                        disabled
                                        className="glass mt-2 p-4 rounded-2xl w-full outline-none theme-text opacity-60"
                                    />
                                </div>

                                <div>
                                    <label className="theme-muted">Bio</label>

                                    <Field
                                        as="textarea"
                                        name="bio"
                                        rows={5}
                                        className="glass mt-2 p-4 rounded-2xl w-full outline-none theme-text resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="theme-muted">Avatar URL</label>

                                    <Field
                                        name="avatarUrl"
                                        className="glass mt-2 p-4 rounded-2xl w-full outline-none theme-text"
                                    />
                                </div>

                                <button
                                    disabled={saving}
                                    type="submit"
                                    className="mt-5 px-10 py-4 rounded-full font-black flex items-center gap-3 hover:scale-105 transition disabled:opacity-60"
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
