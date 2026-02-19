"use client";

import { motion } from "framer-motion";
import {
    Search,
    Bell,
    Plus
} from "lucide-react";
import { StatsGrid } from "@/components/admin/dashboard/stats-grid";
import { OrdersChart } from "@/components/admin/dashboard/orders-chart";
import { RecentActivity } from "@/components/admin/dashboard/recent-activity";
import { LatestSales } from "@/components/admin/dashboard/latest-sales";

export default function AdminDashboard() {
    return (
        <div className="space-y-8 font-sans text-white">
            {/* Header / Top Bar */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-white/40 text-sm">Overview of platform performance</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/5 flex-1 md:flex-none">
                        <Search className="w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full md:w-48"
                        />
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative shrink-0">
                        <Bell className="w-5 h-5 text-white/70" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
                        <Plus className="w-5 h-5 text-white/70" />
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <StatsGrid />

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <OrdersChart />
                <RecentActivity />
            </div>

            {/* Latest Sales Table Section */}
            <LatestSales />
        </div>
    );
}
