"use client";

import { useState } from "react";
import { addPortfolioItem } from "./portfolio-actions";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";

export default function PortfolioForm() {
    const [serviceType, setServiceType] = useState("thumbnail");

    return (
        <form action={async (formData) => {
            await addPortfolioItem(formData);
        }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    value={serviceType}
                    onChange={(val) => {
                        setServiceType(val);
                        const input = document.getElementById('portfolio-service-type') as HTMLInputElement;
                        if (input) input.value = val;
                    }}
                />
                <input type="hidden" name="service_type" value={serviceType} id="portfolio-service-type" />
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
    );
}
