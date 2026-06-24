"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { userService, User } from "@/services/userService";
import { Trash2 } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await userService.list();

    setUsers(data);
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete user?")) return;

    await userService.remove(id);

    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="theme-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="theme-muted">
              <th className="p-4 text-left">User</th>

              <th>Email</th>

              <th>Premium</th>

              <th>Favorites</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-white/10">
                <td className="p-4">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="font-semibold"
                  >
                    {user.username || "User"}
                  </Link>
                </td>

                <td>{user.email}</td>

                <td>{user.isPremium ? "⭐ Premium" : "Free"}</td>

                <td>{user.stats.favorites}</td>

                <td>
                  <button onClick={() => deleteUser(user.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
