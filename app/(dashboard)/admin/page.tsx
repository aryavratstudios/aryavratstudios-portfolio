import {
    Search,
    Bell,
    Menu,
    LayoutDashboard,
    ShoppingCart,
    Users,
    Package,
    MessageSquare,
    BarChart3,
    Settings,
    HelpCircle,
    CreditCard,
    FileText,
    TrendingUp,
    TrendingDown,
    Calendar,
    Clock,
    ChevronRight,
    CheckCircle2,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fetchAdminStats } from "./actions";

interface NavItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    badge?: number;
}

interface Event {
    id: string;
    title: string;
    description: string;
    time: string;
    color: string;
}

interface Activity {
    id: string;
    title: string;
    amount?: string;
    time: string;
    icon: React.ReactNode;
    iconBg: string;
    isPositive?: boolean;
}

interface Sale {
    id: string;
    product: string;
    productId: string;
    customer: string;
    email: string;
    location: string;
    address: string;
    total: string;
    shipping: string;
    status: "shipped" | "processing" | "pending";
    image: string;
}

export default async function AdminDashboard() {
    const stats = await fetchAdminStats();

    // Mock navigations stay for UI structure
    const navItems: NavItem[] = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
        { icon: <ShoppingCart size={20} />, label: "Orders", href: "/admin/orders" },
        { icon: <Users size={20} />, label: "Customers", href: "/admin/customers" },
        { icon: <Package size={20} />, label: "Products", href: "/admin/products" },
        { icon: <MessageSquare size={20} />, label: "Messages", href: "/admin/messages", badge: 3 },
    ];

    const upcomingEvents: Event[] = [
        { id: "1", title: "Project Delivery", description: "Final review for Client X", time: "09:00AM", color: "#5E81F4" },
    ];

    const activities: Activity[] = [
        { id: "1", title: "Supabase Live Sync", amount: "Active", time: "Just now", icon: <CreditCard size={18} />, iconBg: "#5E81F4", isPositive: true },
    ];

    const sales: Sale[] = []; // Real sales would be fetched here too

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "shipped": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "processing": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            default: return "bg-white/5 text-white/40 border-white/10";
        }
    };

    return (
        <div className="min-h-screen bg-black transition-colors duration-500">
            {/* Main Content Area */}
            <main className="flex-1 lg:pr-[365px]">
                {/* Header */}
                <header className="h-[84px] bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 border-b border-white/5 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Menu size={18} className="text-white/60" />
                        </button>
                        <h1 className="text-xl font-bold text-white [text-shadow:_0px_0px_16px_rgb(255_255_255_/_0.2)]">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Search size={18} className="text-white/60" />
                        </button>
                        <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative hover:bg-white/10 transition-colors">
                            <Bell size={18} className="text-white/60" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                        </button>
                    </div>
                </header>

                <div className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Sales Card */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">Sales</p>
                                    <h3 className="text-2xl font-bold mt-1 text-white">{stats.totalSales}</h3>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <TrendingUpIcon size={14} className="text-emerald-400" />
                                    <span className="text-xs font-bold text-emerald-400">Live</span>
                                </div>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                <div className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" style={{ width: "100%" }} />
                            </div>
                            <p className="text-[10px] uppercase font-bold tracking-widest mt-4 text-white/20">Real-time sync</p>
                        </div>

                        {/* Leads Card */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">Users</p>
                                    <h3 className="text-2xl font-bold mt-1 text-white">{stats.usersCount}</h3>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
                                    <Users size={14} className="text-primary" />
                                    <span className="text-xs font-bold text-primary">Active</span>
                                </div>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                <div className="h-full bg-primary shadow-[0_0_12px_rgba(94,129,244,0.4)]" style={{ width: "100%" }} />
                            </div>
                            <p className="text-[10px] uppercase font-bold tracking-widest mt-4 text-white/20">Community size</p>
                        </div>

                        {/* Income Card */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">Projects</p>
                                    <h3 className="text-2xl font-bold mt-1 text-white">{stats.activeProjects}</h3>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                                    <Clock size={14} className="text-amber-400" />
                                    <span className="text-xs font-bold text-amber-400">{stats.pendingOrders} Pending</span>
                                </div>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                <div className="h-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]" style={{ width: "100%" }} />
                            </div>
                            <p className="text-[10px] uppercase font-bold tracking-widest mt-4 text-white/20">Operational load</p>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                        <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">Orders Status</h3>
                            </div>
                            {/* Simple chart placeholder */}
                            <div className="h-[250px] flex items-end justify-between gap-1 px-2">
                                {[30, 45, 35, 60, 40, 75, 50, 65, 55, 70, 85, 65].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                            <h3 className="text-lg font-bold text-white mb-6">Planned Income</h3>
                            <div className="flex items-center justify-center h-[200px] relative">
                                <div className="w-32 h-32 rounded-full border-[12px] border-primary/20 border-t-primary shadow-[0_0_20px_rgba(94,129,244,0.2)]" />
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-2xl font-bold text-white">$48,200</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Total Target</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sales Table */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">Latest Sales</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/40 tracking-wider">Product</th>
                                        <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/40 tracking-wider">Customer</th>
                                        <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/40 tracking-wider">Total</th>
                                        <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/40 tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {sales.map((sale) => (
                                        <tr key={sale.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={sale.image} alt="" className="w-8 h-8 rounded-lg border border-white/10" />
                                                    <div>
                                                        <p className="text-sm font-bold text-white leading-none">{sale.product}</p>
                                                        <p className="text-[10px] text-white/20 font-medium mt-1 uppercase tracking-tighter">{sale.productId}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-white/80">{sale.customer}</p>
                                                <p className="text-[10px] text-white/20">{sale.email}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-white">{sale.total}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border", getStatusStyles(sale.status))}>
                                                    {sale.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="fixed right-0 top-0 h-screen w-[365px] bg-zinc-950/50 backdrop-blur-3xl border-l border-white/5 overflow-y-auto hidden lg:block p-8">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-lg shadow-2xl" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Welcome back,</p>
                            <h2 className="text-xl font-bold text-white">Aryavrat HQ</h2>
                        </div>
                    </div>

                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/20 mb-6">Latest Updates</h3>
                    <div className="space-y-4">
                        {activities.map((a) => (
                            <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    {a.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white/80">{a.title}</p>
                                    <p className="text-[10px] text-white/20 font-bold uppercase">{a.time}</p>
                                </div>
                                {a.amount && <span className="text-xs font-bold text-white">{a.amount}</span>}
                            </div>
                        ))}
                    </div>

                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/20 mt-12 mb-6">Upcoming Events</h3>
                    <div className="space-y-4">
                        {upcomingEvents.map((e) => (
                            <div key={e.id} className="p-5 rounded-3xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{e.time}</span>
                                </div>
                                <p className="text-sm font-bold text-white mb-1">{e.title}</p>
                                <p className="text-xs text-white/20 font-medium leading-relaxed">{e.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
}
