"use client";

import { useState } from "react";
import { Upload, X, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { processScreenshotAction } from "@/app/(dashboard)/admin/intelligence/actions";
import { MotionWrapper } from "@/components/design-system/motion-wrapper";
import { cn } from "@/lib/utils";

const toast = {
    success: (msg: string) => console.log("SUCCESS:", msg),
    error: (msg: string) => console.error("ERROR:", msg),
};

export function ScreenshotUploader({ projectId }: { projectId: string }) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith("image/")) return;

        // Create local preview
        const url = URL.createObjectURL(file);
        setPreview(url);
        setIsUploading(true);

        try {
            // Ideally upload to storage first, then pass URL. 
            // For this demo/v1, we might pass a base64 or assuming a public URL handling.
            // But the action expects a URL. 
            // We'll mock the upload delay and process.

            // In a real app: const publicUrl = await uploadToSupabase(file);
            const publicUrl = "https://placehold.co/600x400/png";

            await processScreenshotAction(projectId, publicUrl);
            toast.success("Screenshot analyzed & intelligence extracted");
            setPreview(null);
        } catch (error) {
            toast.error("Failed to process screenshot");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <MotionWrapper className="relative group">
            <div
                className={cn(
                    "relative h-48 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden",
                    dragActive ? "border-primary bg-primary/10" : "border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 hover:bg-zinc-900/40",
                    isUploading && "pointer-events-none opacity-50"
                )}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
                }}
            >
                {preview ? (
                    <img src={preview} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                ) : (
                    <>
                        <div className="h-16 w-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                            <Upload className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-1">Drop Brain Scan</p>
                            <p className="text-[10px] text-zinc-500 font-medium">or click to upload screenshot</p>
                        </div>
                    </>
                )}

                <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    disabled={isUploading}
                />

                {isUploading && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-10">
                        <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Neural processing...</p>
                    </div>
                )}
            </div>
        </MotionWrapper>
    );
}
