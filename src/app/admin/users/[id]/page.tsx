"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { FiArrowLeft, FiInfo } from "react-icons/fi";

import { userService, User } from "@/services/userService";

export default function Page() {
    const params = useParams();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            setLoading(true);
            setError("");
            const data = await userService.get(params.id as string);
            setUser(data);
        } catch (err: any) {
            setError(err.message || err.response?.data?.message || "Unable to load user");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="theme-text p-10">Loading...</div>;
    }

    return (
        <div className="theme-text">
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => router.back()}
                    className="glass px-6 py-3 rounded-full flex items-center gap-3 hover:scale-105 transition"
                >
                    <FiArrowLeft />
                    Back
                </button>
            </div>

            {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-blue-200">
                    <FiInfo className="mt-1" />
                    <p>{error}</p>
                </div>
            )}

            {user && (
                <div className="glass rounded-[40px] p-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-5xl font-black gradient-text">
                                {user.username}
                            </h1>

                            <p className="theme-muted mt-2">{user.email}</p>
                            <p className="theme-muted">User ID : {params.id}</p>
                        </div>

                        <div className="glass px-6 py-3 rounded-full font-bold">
                            🟢 Active
                        </div>
                    </div>

                    <p className="mt-8 theme-muted">
                        {user.bio || "No bio added."}
                    </p>

                    <div className="grid grid-cols-3 gap-6 mt-10">
                        <div className="glass p-6 rounded-3xl">
                            <p className="theme-muted">Role</p>
                            <h2 className="text-2xl font-bold">{user.role?.name || "USER"}</h2>
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <p className="theme-muted">Subscription</p>
                            <h2 className="text-2xl font-bold">
                                {user.isPremium ? "👑 Premium" : "🆓 Free"}
                            </h2>
                            {user.premiumUntil && (
                                <p className="theme-muted text-sm">Until {new Date(user.premiumUntil).toLocaleDateString()}</p>
                            )}
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <p className="theme-muted">Joined</p>
                            <h2 className="text-2xl font-bold">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </h2>
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <p className="theme-muted">Downloads</p>
                            <h2 className="text-3xl font-black">⬇ {user.stats.downloads}</h2>
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <p className="theme-muted">Favorites</p>
                            <h2 className="text-3xl font-black">❤️ {user.stats.favorites}</h2>
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <p className="theme-muted">Likes</p>
                            <h2 className="text-3xl font-black">👍 {user.stats.likes}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
