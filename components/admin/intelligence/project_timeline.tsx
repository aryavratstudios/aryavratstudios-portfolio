"use client";

import { Activity, Calendar, Clock, CheckCircle2, DollarSign, RefreshCcw, AlertCircle, Box } from "lucide-react";
import { MotionWrapper } from "@/components/design-system/motion-wrapper";
import { cn } from "@/lib/utils";

interface TimelineEvent {
    id: string;
    event_type: string;
    event_date: string;
    summary: string;
}

export function ProjectTimeline({ events }: { events: TimelineEvent[] }) {
    if (!events || events.length === 0) {
        return (
            <div className="py-20 text-center space-y-4">
                <Box className="w-12 h-12 text-zinc-800 mx-auto" />
                <p className="text-sm text-zinc-500 font-medium uppercase tracking-widest">No Intelligence Events Logged</p>
            </div>
        );
    }

    const getEventIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'payment_proof': return <DollarSign className="w-4 h-4" />;
            case 'revision_request': return <RefreshCcw className="w-4 h-4" />;
            case 'final_delivery': return <CheckCircle2 className="w-4 h-4" />;
            case 'deadline_discussion': return <Calendar className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getEventColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'payment_proof': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'revision_request': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'final_delivery': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'deadline_discussion': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
        }
    };

    const sortedEvents = [...events].sort((a, b) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );

    return (
        <div className="relative border-l border-white/20 ml-6 space-y-8">
            {sortedEvents.map((event, index) => (
                <MotionWrapper
                    key={event.id}
                    delay={index * 0.1}
                    direction="left"
                    className="relative pl-8"
                >
                    <div className={cn(
                        "absolute -left-[2.15rem] top-0 h-6 w-6 rounded-full flex items-center justify-center border backdrop-blur-md z-10",
                        getEventColor(event.event_type)
                    )}>
                        {getEventIcon(event.event_type)}
                    </div>

                    <div className="absolute -left-[30px] top-1 h-3 w-3 rounded-full border-2 border-white bg-black ring-4 ring-black opacity-0" />

                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            {getEventIcon(event.event_type)}
                            {new Date(event.event_date).toLocaleDateString(undefined, {
                                month: 'short', day: 'numeric', year: 'numeric'
                            })}
                        </span>
                        <h4 className="text-sm font-bold text-white capitalize">
                            {event.event_type.replace(/_/g, ' ')}
                        </h4>
                        <div className="glass-card p-4 rounded-xl border border-white/5 bg-zinc-900/20 mt-1">
                            <p className="text-xs text-zinc-400 leading-relaxed max-w-lg">
                                {event.summary}
                            </p>
                        </div>
                    </div>
                </MotionWrapper>
            ))}
        </div>
    );
}
