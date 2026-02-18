import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateProjectStatus, togglePortfolio, updateProfileRole, createCoupon, updateProjectPrice, createUser } from "./actions";
import { Button } from "@/components/ui/button";
import { Shield, Eye, EyeOff, User, Users, Tag, DollarSign, Plus, AlertCircle, CheckCircle2, ArrowUpRight, Brain, Image as ImageIcon, Activity } from "lucide-react";
import { getDiscordStatus } from "@/lib/discord";
import { AutoSubmitInput, AutoSubmitSelect } from "@/components/admin/auto-submit-controls";
import { addPortfolioItem, deletePortfolioItem } from "./portfolio-actions";
import { CustomSelect } from "@/components/ui/custom-select";
import { ExternalLink } from "lucide-react";

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profile || profile.role !== "admin") {
        redirect("/dashboard");
    }

    // Parallel data fetching for efficiency
    const [
        { data: projects },
        { data: allProfiles },
    ] = await Promise.all([
        supabase.from("projects").select("*, profiles(email, full_name, role)").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").order("role"),
    ]);
    const { data: coupons } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    const { data: portfolio } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
    const discordStatus = await getDiscordStatus();
    const botInviteUrl = "https://discord.com/api/oauth2/authorize?client_id=1471380841044377774&permissions=8&scope=bot";

    return (
        <div className="space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shadow-glow-primary">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Command Console</h1>
                    </div>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Global pipeline and infrastructure management.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className={cn(
                        "flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all",
                        discordStatus.status === 'connected'
                            ? "bg-white/5 border-white/20 text-white shadow-glow-primary"
                            : "bg-red-500/5 border-red-500/20 text-red-500"
                    )}>
                        {discordStatus.status === 'connected' ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-[2px] leading-none mb-1 opacity-70">Bot Active</span>
                                    <span className="text-[10px] font-bold uppercase truncate max-w-[120px]">{discordStatus.guildName}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-4 h-4" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-[2px] leading-none mb-1">Grid Offline</span>
                                    <a href={botInviteUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase underline hover:text-white">Request Uplink</a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Tabs defaultValue="projects" className="space-y-8">
                <TabsList className="bg-zinc-900/40 border border-white/5 p-1 rounded-2xl h-14">
                    <TabsTrigger value="projects" className="rounded-xl px-8 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black transition-all">Projects</TabsTrigger>
                    <TabsTrigger value="intelligence" className="rounded-xl px-8 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black transition-all">Intelligence</TabsTrigger>
                    <TabsTrigger value="team" className="rounded-xl px-8 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black transition-all">Team & Users</TabsTrigger>
                    <TabsTrigger value="portfolio" className="rounded-xl px-8 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black transition-all">Portfolio</TabsTrigger>
                    <TabsTrigger value="coupons" className="rounded-xl px-8 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black transition-all">Economic Control</TabsTrigger>
                </TabsList>

                <TabsContent value="projects">
                    <Card className="glass-card border-white/5 bg-zinc-900/20 overflow-hidden shadow-2xl">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-xl font-black uppercase tracking-widest">Active Pipeline</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.25em]">
                                            <th className="px-8 py-6 border-b border-white/5">Client</th>
                                            <th className="px-8 py-6 border-b border-white/5">Project</th>
                                            <th className="px-8 py-6 border-b border-white/5">Pricing</th>
                                            <th className="px-8 py-6 border-b border-white/5">Status</th>
                                            <th className="px-8 py-6 border-b border-white/5 text-right">Showcase</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {projects?.map((project) => (
                                            <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-white/10 group-hover:text-white transition-all border border-white/5">
                                                            <User className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white text-sm">{project.profiles?.full_name || 'Anonymous'}</div>
                                                            <div className="text-zinc-500 text-[10px] font-medium">{project.profiles?.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="font-bold text-white text-sm">{project.title}</div>
                                                    <div className="text-green-500 text-[10px] font-black uppercase tracking-widest mt-1">{project.service_type}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <form action={updateProjectPrice} className="flex items-center gap-2">
                                                        <input type="hidden" name="id" value={project.id} />
                                                        <span className="text-zinc-500 font-bold">$</span>
                                                        <AutoSubmitInput
                                                            name="price"
                                                            defaultValue={project.price}
                                                            className="w-16 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:ring-1 focus:ring-white outline-none"
                                                            action={updateProjectPrice}
                                                        />
                                                    </form>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <form action={updateProjectStatus}>
                                                        <input type="hidden" name="id" value={project.id} />
                                                        <AutoSubmitSelect
                                                            name="status"
                                                            defaultValue={project.status}
                                                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 focus:text-white focus:ring-1 focus:ring-white focus:outline-none hover:bg-zinc-800 transition-all cursor-pointer"
                                                            action={updateProjectStatus}
                                                        >
                                                            <option value="pending_review">PENDING</option>
                                                            <option value="in_progress">IN PROGRESS</option>
                                                            <option value="delivered">DELIVERED</option>
                                                            <option value="revision">REVISION</option>
                                                            <option value="approved">APPROVED</option>
                                                            <option value="completed">COMPLETED</option>
                                                        </AutoSubmitSelect>
                                                    </form>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <Link
                                                            href={`/dashboard/orders/${project.id}`}
                                                            className="h-9 w-9 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all group/btn"
                                                        >
                                                            <ArrowUpRight className="w-4 h-4" />
                                                        </Link>
                                                        <form action={togglePortfolio}>
                                                            <input type="hidden" name="id" value={project.id} />
                                                            <input type="hidden" name="currentState" value={String(project.show_in_portfolio)} />
                                                            <button
                                                                type="submit"
                                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[2px] transition-all
                                                                    ${project.show_in_portfolio
                                                                        ? 'bg-white/10 text-white border border-white/20 shadow-glow-primary'
                                                                        : 'bg-zinc-800 text-zinc-500 border border-white/5 hover:bg-zinc-700 hover:text-white'}`}
                                                            >
                                                                {project.show_in_portfolio ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="intelligence">
                    <Card className="glass-card border-white/5 bg-zinc-900/20 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 flex flex-row items-center justify-between border-b border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-glow-primary">
                                    <Brain className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-black uppercase tracking-tighter">AI Project Intelligence</CardTitle>
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">Screenshot-based neural analytics pipeline.</p>
                                </div>
                            </div>
                            <Link href="/admin/intelligence/active">
                                <Button className="h-12 px-8 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest shadow-glow-primary hover:scale-105 transition-all">
                                    Open Intelligence HQ
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/40 space-y-4">
                                <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                    <ImageIcon className="w-5 h-5 text-zinc-400" />
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-tight">Active Extraction</h4>
                                <p className="text-zinc-500 text-xs font-medium leading-relaxed">System currently monitoring 12 active screenshot feeds for project metadata.</p>
                            </div>
                            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/40 space-y-4">
                                <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                    <Activity className="w-5 h-5 text-zinc-400" />
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-tight">Timeline Engine</h4>
                                <p className="text-zinc-500 text-xs font-medium leading-relaxed">Auto-generating chronological event logs from WhatsApp and Discord chats.</p>
                            </div>
                            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/40 space-y-4">
                                <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                    <DollarSign className="w-5 h-5 text-zinc-400" />
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-tight">Financial Guard</h4>
                                <p className="text-zinc-500 text-xs font-medium leading-relaxed">Tracking $4,200 in pending revenue across extracted payment screenshots.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-8">
                    {/* Add New User Form */}
                    <Card className="glass-card border-white/5 bg-zinc-900/20 overflow-hidden shadow-2xl">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <Plus className="h-5 w-5 text-primary" />
                                Add New User
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <form action={createUser} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                                        placeholder="user@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Full Name</label>
                                    <input
                                        name="full_name"
                                        type="text"
                                        required
                                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Role</label>
                                    <select
                                        name="role"
                                        required
                                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                                    >
                                        <option value="client">CLIENT</option>
                                        <option value="designer">DESIGNER</option>
                                        <option value="manager">MANAGER</option>
                                        <option value="admin">ADMIN</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <Button type="submit" className="w-full h-12 rounded-xl bg-primary text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">
                                        Create User
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Existing Users Table */}
                    <Card className="glass-card border-white/5 bg-zinc-900/20 overflow-hidden shadow-2xl">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-xl font-black uppercase tracking-widest">Team Grid</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.25em]">
                                        <th className="px-8 py-6 border-b border-white/5">User Entity</th>
                                        <th className="px-8 py-6 border-b border-white/5">Authorization Level</th>
                                        <th className="px-8 py-6 border-b border-white/5 text-right">Grid Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {allProfiles?.map((p) => (
                                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all border border-white/5",
                                                        p.role === 'admin' ? "bg-white/10 text-white shadow-glow-primary-small" : "bg-zinc-800 text-zinc-500"
                                                    )}>
                                                        <Users className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-sm">{p.full_name || 'Legacy Profile'}</div>
                                                        <div className="text-zinc-500 text-[10px] font-medium">{p.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <form action={updateProfileRole}>
                                                    <input type="hidden" name="id" value={p.id} />
                                                    <AutoSubmitSelect
                                                        name="role"
                                                        defaultValue={p.role}
                                                        className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 focus:text-white outline-none"
                                                        action={updateProfileRole}
                                                    >
                                                        <option value="client">CLIENT</option>
                                                        <option value="designer">DESIGNER</option>
                                                        <option value="manager">MANAGER</option>
                                                        <option value="admin">ADMIN</option>
                                                    </AutoSubmitSelect>
                                                </form>
                                            </td>
                                            <td className="px-8 py-6 text-right text-zinc-500 text-[10px] font-bold">
                                                {new Date(p.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="portfolio" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="glass-card rounded-[2.5rem] p-10 border border-white/5 bg-zinc-900/40">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20 shadow-glow-primary">
                                <Plus className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Publish to Portfolio</h2>
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Showcase elite creative deliverables.</p>
                            </div>
                        </div>

                        <form action={addPortfolioItem} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Project Identifier</label>
                                <input name="title" required className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-sm text-white focus:ring-1 focus:ring-white outline-none transition-all" placeholder="E.g. MrBeast Thumbnail Style" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Creative Category</label>
                                <CustomSelect
                                    options={[
                                        { value: "thumbnail", label: "THUMBNAIL DESIGN" },
                                        { value: "video", label: "VIDEO PRODUCTION" },
                                        { value: "branding", label: "BRAND IDENTITY" },
                                        { value: "web", label: "WEB INTERFACE" }
                                    ]}
                                    value="thumbnail"
                                    onChange={(val) => {
                                        const input = document.getElementById('portfolio-service-type') as HTMLInputElement;
                                        if (input) input.value = val;
                                    }}
                                />
                                <input type="hidden" name="service_type" value="thumbnail" id="portfolio-service-type" />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Asset Asset URL (Cdn/Image)</label>
                                <input name="image_url" required className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-sm text-white focus:ring-1 focus:ring-white outline-none transition-all" placeholder="https://cdn.aryavrat.studio/assets/..." />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Client Name</label>
                                <input name="client_name" className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-sm text-white focus:ring-1 focus:ring-white outline-none transition-all" placeholder="E.g. MrBeast, CodeWithHarry" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Project URL (Optional)</label>
                                <input name="project_url" className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-sm text-white focus:ring-1 focus:ring-white outline-none transition-all" placeholder="https://..." />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Production Brief</label>
                                <textarea name="description" className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-white focus:ring-1 focus:ring-white outline-none transition-all resize-none" placeholder="Technical details, tools used, or client success metrics..." />
                            </div>
                            <div className="md:col-span-2">
                                <Button type="submit" className="w-full h-16 rounded-2xl bg-white text-black font-black text-lg shadow-glow-primary hover:scale-[1.01] transition-all">
                                    DEPLOY TO GLOBAL PORTFOLIO
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolio?.map((item) => (
                            <div key={item.id} className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 group relative">
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={item.image_url} alt={item.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        <form action={deletePortfolioItem}>
                                            <input type="hidden" name="id" value={item.id} />
                                            <button className="h-12 w-12 rounded-2xl bg-red-500/20 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all backdrop-blur-md">
                                                <AlertCircle size={20} />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[9px] font-black text-green-500 uppercase tracking-[2px] px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">{item.service_type}</span>
                                        {item.client_name && (
                                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[2px] px-3 py-1.5 rounded-full bg-zinc-800/50 border border-white/5">{item.client_name}</span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-zinc-500 text-xs font-medium leading-relaxed line-clamp-2">{item.description}</p>
                                    {item.project_url && (
                                        <a href={item.project_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                                            View Project <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="coupons">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="glass-card border-white/5 bg-zinc-900/40 border-l-white/50 border-l-4">
                            <CardHeader>
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                                    <Tag className="w-4 h-4" /> Issue Coupon
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form action={createCoupon} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Campaign Code</label>
                                        <input name="code" placeholder="SAVE20" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white uppercase tracking-widest" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Discount Percent</label>
                                        <input name="discount" type="number" placeholder="20" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white" required />
                                    </div>
                                    <Button type="submit" className="w-full bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-all shadow-glow-primary">Activate Code</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2 glass-card border-white/5 bg-zinc-900/20 overflow-hidden">
                            <CardHeader className="border-b border-white/5 bg-white/[0.01]">
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-400">Active Economic Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white/5 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                                            <th className="px-6 py-4">Code</th>
                                            <th className="px-6 py-4">Multiplier</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {coupons?.map((c) => (
                                            <tr key={c.id}>
                                                <td className="px-6 py-4 font-mono font-bold text-white tracking-widest">{c.code}</td>
                                                <td className="px-6 py-4 font-bold text-green-500">-{c.discount_percent}%</td>
                                                <td className="px-6 py-4 uppercase text-[10px] font-black text-zinc-500">{c.active ? 'Active' : 'Expired'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
