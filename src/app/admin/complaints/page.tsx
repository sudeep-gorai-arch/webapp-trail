"use client";

import { useMemo, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

type Complaint = {
    id: string;
    user: string;
    email: string;
    subject: string;
    category: string;
    status: "Open" | "In Progress" | "Resolved";
    priority: "Low" | "Medium" | "High";
    createdAt: string;
};

export default function ComplaintsPage() {
    const [loading] = useState(false);
    const [error] = useState("");

    const complaints = useMemo<Complaint[]>(
        () => [
            {
                id: "CMP001",
                user: "John Doe",
                email: "john@example.com",
                subject: "Wallpaper not downloading",
                category: "Download",
                priority: "High",
                status: "Open",
                createdAt: "01 Jul 2026",
            },
            {
                id: "CMP002",
                user: "Emily Watson",
                email: "emily@example.com",
                subject: "Premium purchase issue",
                category: "Subscription",
                priority: "High",
                status: "In Progress",
                createdAt: "30 Jun 2026",
            },
            {
                id: "CMP003",
                user: "Michael Lee",
                email: "michael@example.com",
                subject: "Image quality issue",
                category: "Wallpaper",
                priority: "Medium",
                status: "Resolved",
                createdAt: "29 Jun 2026",
            },
            {
                id: "CMP004",
                user: "Sophia Smith",
                email: "sophia@example.com",
                subject: "App crashes while opening",
                category: "Bug",
                priority: "High",
                status: "Open",
                createdAt: "28 Jun 2026",
            },
            {
                id: "CMP005",
                user: "Alex Brown",
                email: "alex@example.com",
                subject: "Unable to login",
                category: "Account",
                priority: "Low",
                status: "Resolved",
                createdAt: "27 Jun 2026",
            },
        ],
        []
    );

    const statusClass = (status: Complaint["status"]) => {
        switch (status) {
            case "Resolved":
                return "bg-green-500/20 text-green-300";
            case "In Progress":
                return "bg-yellow-500/20 text-yellow-300";
            default:
                return "bg-red-500/20 text-red-300";
        }
    };

    const priorityClass = (priority: Complaint["priority"]) => {
        switch (priority) {
            case "High":
                return "bg-red-500/20 text-red-300";
            case "Medium":
                return "bg-yellow-500/20 text-yellow-300";
            default:
                return "bg-green-500/20 text-green-300";
        }
    };

    return (
        <div className="theme-text">
            <div className="mb-8">
                <h1 className="text-4xl font-black gradient-text">
                    Complaints
                </h1>

                <p className="theme-muted">
                    Review user complaints and track their resolution status.
                </p>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-orange-200">
                <FiAlertCircle className="mt-1 text-xl" />

                <p>
                    This page currently displays dummy complaints. Connect it
                    with your complaint API later.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                    {error}
                </div>
            )}

            <div className="glass overflow-hidden rounded-[35px]">
                <table className="w-full">
                    <thead>
                        <tr className="theme-muted text-left">
                            <th className="p-5">Complaint ID</th>
                            <th>User</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="p-10">
                                    Loading...
                                </td>
                            </tr>
                        ) : complaints.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="p-10 theme-muted"
                                >
                                    No complaints found.
                                </td>
                            </tr>
                        ) : (
                            complaints.map((complaint) => (
                                <tr
                                    key={complaint.id}
                                    className="border-t border-white/10 hover:bg-white/5 transition"
                                >
                                    <td className="p-5 font-semibold">
                                        {complaint.id}
                                    </td>

                                    <td>
                                        <div className="font-medium">
                                            {complaint.user}
                                        </div>
                                        <div className="text-xs theme-muted">
                                            {complaint.email}
                                        </div>
                                    </td>

                                    <td>{complaint.subject}</td>

                                    <td>{complaint.category}</td>

                                    <td>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClass(
                                                complaint.priority
                                            )}`}
                                        >
                                            {complaint.priority}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                                                complaint.status
                                            )}`}
                                        >
                                            {complaint.status}
                                        </span>
                                    </td>

                                    <td>{complaint.createdAt}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}