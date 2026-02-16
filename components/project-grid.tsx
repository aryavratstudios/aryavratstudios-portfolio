"use client";

import { motion } from "framer-motion";
import { ExternalLink, Monitor, Smartphone, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Project {
    id: string;
    title: string;
    description: string;
    service_type: string;
    deliverable_url?: string;
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {projects.map((project, i) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="group relative"
                >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl">
                        {/* Placeholder for project image with overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black group-hover:scale-105 transition-transform duration-700"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
                            <Layout className="w-32 h-32 text-white" />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 backdrop-blur-sm">
                            {project.deliverable_url && (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button asChild size="lg" className="rounded-full bg-primary text-black font-bold h-14 px-8 shadow-glow">
                                        <Link href={project.deliverable_url} target="_blank">
                                            View Project <ExternalLink className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </motion.div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="absolute top-6 left-6 z-10">
                            <span className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold text-primary uppercase tracking-widest shadow-lg">
                                {project.service_type}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3 px-2">
                        <h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p className="text-zinc-400 text-lg line-clamp-2 leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
