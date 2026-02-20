"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Search, LayoutGrid, ArrowUpRight, Filter, Share2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Project {
    id: string;
    title: string;
    description: string;
    service_type: string;
    image_url?: string;
    deliverable_url?: string;
    project_url?: string;
    client_name?: string;
}

function ProjectCard({ project }: { project: Project }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative"
        >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-950 shadow-2xl transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-primary/5">
                {/* Spotlight Gradient */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(var(--primary-rgb), 0.1), transparent 40%)`
                        ),
                    }}
                />

                {project.image_url ? (
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center">
                        <LayoutGrid className="w-16 h-16 text-white/5 animate-pulse" />
                    </div>
                )}

                {/* Glassy Overlay */}
                <div className="absolute inset-x-4 bottom-4 z-20">
                    <div className="glass-card rounded-[2rem] p-6 border border-white/10 bg-black/40 backdrop-blur-xl translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-white line-clamp-1">{project.title}</h4>
                                <p className="text-xs font-medium text-primary">{project.service_type}</p>
                                {project.client_name && (
                                    <p className="text-[10px] font-semibold text-green-500 uppercase tracking-wider">{project.client_name}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const url = `${window.location.origin}/work/${project.title.toLowerCase().replace(/ /g, "-")}`;
                                        navigator.clipboard.writeText(url);
                                        // You could add a toast here
                                        alert("Link copied to clipboard!");
                                    }}
                                    className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                                {(project.deliverable_url || project.project_url) && (
                                    <Link
                                        href={project.deliverable_url || project.project_url || "#"}
                                        target="_blank"
                                        className="h-12 w-12 rounded-2xl bg-primary text-black flex items-center justify-center hover:scale-110 transition-all shadow-glow-primary"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-8 left-8 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <span className="px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-[10px] font-semibold text-primary">
                        {project.service_type}
                    </span>
                    {project.client_name && (
                        <span className="ml-2 px-5 py-2 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/20 text-[10px] font-semibold text-green-500">
                            {project.client_name}
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-6 space-y-2 px-1">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {project.title}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

    const categories = useMemo(() => {
        const cats = new Set(projects.map(p => p.service_type.toLowerCase()));
        return [
            { value: "all", label: "All Services" },
            { value: "website", label: "Website" },
            ...Array.from(cats)
                .filter(cat => cat !== "website")
                .map(cat => ({
                    value: cat,
                    label: cat.charAt(0).toUpperCase() + cat.slice(1)
                }))
        ];
    }, [projects]);

    const filteredAndSortedProjects = useMemo(() => {
        const filtered = projects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategory === "all" ||
                project.service_type.toLowerCase() === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        // Sorting logic
        if (sortBy === "recent") {
            // Assuming we have a created_at or just use index for now if not available
            // In a real app, projects would have IDs or secondary timestamps
            return [...filtered].reverse();
        } else if (sortBy === "popular") {
            // Simulating popularity - in real app would use a 'views' or 'likes' count
            return [...filtered].sort((a, b) => b.title.length - a.title.length);
        }

        return filtered;
    }, [projects, searchQuery, selectedCategory, sortBy]);

    return (
        <div className="space-y-16">
            {/* Compact Pill-Shaped Control Center */}
            <div className="sticky top-24 z-[100] px-4 flex justify-center">
                <div className="w-full max-w-4xl glass-card rounded-2xl md:rounded-full p-1.5 border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row items-center gap-1.5">
                    <div className="relative flex-1 group w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 bg-transparent rounded-full pl-12 pr-6 text-xs font-medium focus:outline-none transition-all placeholder:text-zinc-700"
                        />
                    </div>

                    <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

                    <div className="flex flex-wrap items-center gap-1 p-0.5">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all border shrink-0",
                                    selectedCategory === cat.value
                                        ? "bg-primary text-black border-primary shadow-glow-primary"
                                        : "bg-white/5 text-zinc-500 border-white/5 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

                    <div className="flex items-center gap-1 p-0.5">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as "recent" | "popular")}
                            className="bg-white/5 text-zinc-400 text-[11px] font-semibold px-4 py-1.5 rounded-full border border-white/5 focus:outline-none hover:bg-white/10 hover:text-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="recent">Recent</option>
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="popLayout">
                {projects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-32 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-2xl shadow-xl max-w-xl mx-auto"
                    >
                        <LayoutGrid className="w-12 h-12 text-zinc-800 mx-auto mb-6 opacity-50" />
                        <h3 className="text-xl font-bold text-white mb-2">Nothing to display yet</h3>
                        <p className="text-zinc-500 text-sm font-medium">New elite productions are currently clearing QC.</p>
                    </motion.div>
                ) : filteredAndSortedProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="text-center py-32 rounded-[2.5rem] border border-dashed border-white/10 bg-white/[0.02] backdrop-blur-xl max-w-xl mx-auto"
                    >
                        <Search className="w-12 h-12 text-zinc-800 mx-auto mb-6 opacity-30" />
                        <h3 className="text-xl font-bold text-white mb-2">No matching results</h3>
                        <p className="text-zinc-600 text-sm font-medium">Try adjusting your search or filters.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {filteredAndSortedProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
