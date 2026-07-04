"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { userService, User } from "@/services/userService";
import { FiInfo } from "react-icons/fi";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await userService.list();

            setUsers(data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Unable to load user information");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="theme-text">
            <div className="mb-8">
                <h1 className="text-4xl font-black gradient-text">Users</h1>
                <p className="theme-muted">
                    Current backend exposes /api/users/me only, so this page shows the logged-in admin account.
                </p>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-blue-200">
                <FiInfo className="mt-1" />
                <p>
                    Full admin user listing, delete, block, and user detail actions need backend routes like GET /api/admin/users. I did not add backend changes because you asked to keep backend untouched.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                    {error}
                </div>
            )}

            <div className="glass rounded-[35px] overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="theme-muted text-left">
                            <th className="p-5">User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Premium</th>
                            <th>Favorites</th>
                            <th>Downloads</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="p-10" colSpan={6}>
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td className="p-10 theme-muted" colSpan={6}>
                                    No user data available.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="border-t border-white/10">
                                    <td className="p-5">
                                        <Link
                                            href={`/admin/users/${user.id}`}
                                            className="font-semibold"
                                        >
                                            {user.username || "User"}
                                        </Link>
                                    </td>

                                    <td>{user.email}</td>
                                    <td>{user.role?.name || "USER"}</td>
                                    <td>{user.isPremium ? "⭐ Premium" : "Free"}</td>
                                    <td>{user.stats.favorites}</td>
                                    <td>{user.stats.downloads}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
