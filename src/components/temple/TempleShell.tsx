import { useState, useEffect } from"react";
import {
 Home,
 Users,
 Flame,
 Video,
 Timer,
 UsersRound,
 Landmark,
 Car,
 Megaphone,
 BarChart3,
 Siren,
 Bell,
 LogOut,
 ChevronDown,
 Ticket,
 ChevronLeft,
 ChevronRight,
} from"lucide-react";
import { Toaster } from"sonner";
import { NAV_ITEMS, TEMPLES, type SectionId } from"@/lib/temple-data";
import { useLiveClock } from"@/lib/use-live";
import { DashboardSection } from"./sections/DashboardSection";
import { HeatmapSection } from"./sections/HeatmapSection";
import { CCTVSection } from"./sections/CCTVSection";
import { DarshanSection } from"./sections/DarshanSection";
import { QueueSection } from"./sections/QueueSection";
import { StaffSection } from"./sections/StaffSection";
import { OperationsSection } from"./sections/OperationsSection";
import { ParkingSection } from"./sections/ParkingSection";
import { AnnouncementsSection } from"./sections/AnnouncementsSection";
import { AnalyticsSection } from"./sections/AnalyticsSection";
import { EmergencySection } from"./sections/EmergencySection";
import omgLogo from"@/assets/logo.png";
const ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
 Home,
 Users,
 Flame,
 Video,
 Timer,
 UsersRound,
 Landmark,
 Car,
 Megaphone,
 BarChart3,
 Siren,
 Ticket,
};
export function TempleShell() {
 const [sidebarExpanded, setSidebarExpanded] = useState(true);
 const [section, setSection] = useState<SectionId>(() => {
 if (typeof window !=="undefined") {
 const hash = window.location.hash.replace("#","");
 return (NAV_ITEMS.find((n) => n.id === hash)?.id as SectionId) ||"dashboard";
 }
 return"dashboard";
 });
 useEffect(() => {
 window.location.hash = section;
 }, [section]);
 const [templeId, setTempleId] = useState(TEMPLES[0].id);
 const [templeOpen, setTempleOpen] = useState(false);
 const [shimmer, setShimmer] = useState(false);
 const [bellOpen, setBellOpen] = useState(false);
 const temple = TEMPLES.find((t) => t.id === templeId)!;
 const now = useLiveClock();
 const switchTemple = (id: string) => {
 setShimmer(true);
 setTempleId(id);
 setTempleOpen(false);
 setTimeout(() => setShimmer(false), 1200);
 };
 const sectionTitle = NAV_ITEMS.find((n) => n.id === section)?.label ??"";
 return (
 <div className="min-h-screen bg-background relative overflow-hidden selection:bg-saffron/30">
 
 {/* Very clean corporate background like GWC */}
 <div
 className="absolute inset-0 pointer-events-none"
 style={{
 backgroundImage:
"linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
 backgroundSize:"40px 40px",
 }}
 ></div>
 <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background"></div>
 <div className="relative z-10 flex min-h-screen">
 
 <Toaster position="top-right" richColors theme="light" /> {/* Sidebar */}
 <aside className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-white text-sidebar-foreground shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 ${sidebarExpanded ?"w-[260px]" :"w-[72px]"}`}>
 
 <div className="flex flex-col px-6 py-6">
 
 <div className="flex items-center gap-3">
 
 <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-border transition-all duration-300 hover:-translate-y-0.5">
 
 <img src={omgLogo} alt="OMG Logo" className="h-7 w-auto object-contain" />
 </div>
 {sidebarExpanded && (<div><div className="text-lg font-semibold tracking-tight text-sidebar-foreground">OMG</div>
 <div className="text-[10px] text-sidebar-muted font-medium">Admin Portal</div></div>)}</div>
 <button onClick={() => setSidebarExpanded(!sidebarExpanded)} className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-surface text-muted-foreground hover:text-foreground z-40 transition-transform hover:scale-110">{sidebarExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}</button>
 {/* <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-3"> <div className="text-[10px] font-normal text-sidebar-muted">Current Location</div> <div className="mt-1 text-sm font-medium text-white">{temple.name}</div> <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald"> <span className="relative flex h-2 w-2"> <span className="absolute inline-flex h-full w-full animate-ping rounded-xl bg-emerald opacity-75"></span> <span className="relative inline-flex h-2 w-2 rounded-xl bg-emerald"></span> </span> Operational </div> </div> */}
 </div>
 <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
 
 {NAV_ITEMS.map((item) => {
 const Icon = ICONS[item.icon];
 const active = item.id === section;
 return (
 <button
 key={item.id}
 onClick={() => setSection(item.id)}
 className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-normal transition-all duration-200 ${active ?"bg-primary/5 text-primary font-medium shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-primary/10 rounded-xl" :"text-sidebar-muted hover:bg-black/5 hover:text-sidebar-foreground rounded-xl hover:-translate-y-0.5"}`}
 >
 
 <Icon
 size={18}
 className={`transition-transform duration-300 ${active ?"text-primary" :"text-sidebar-muted group-hover:text-sidebar-foreground"}`}
 />
 {sidebarExpanded && <span>{item.label}</span>}</button>
 );
 })}
 </nav>
 <div className="mt-auto border-t border-black/5 p-3">
 
 <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-black/5 transition-all duration-300 cursor-pointer group border border-transparent hover:border-border hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
 
 <div className="grid h-9 w-9 place-items-center rounded-xl bg-white border border-border text-xs font-semibold text-foreground shadow-sm">
 
 RK
 </div>
 {sidebarExpanded && <div className="min-w-0 flex-1 text-left"><div className="truncate text-sm font-medium text-sidebar-foreground">Rajesh Kumar</div><div className="truncate text-[10px] text-sidebar-muted">Executive Officer</div></div>}
 {sidebarExpanded && <LogOut size={16} className="text-sidebar-muted group-hover:text-sidebar-foreground transition-colors" />}
 </div>
 </div>
 </aside>
 {/* Top bar */}
 <header className={`fixed right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-white/90 px-8 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.015)] transition-all duration-300 ${sidebarExpanded ?"left-[260px]" :"left-[72px]"}`}>
 
 <h1 className="text-base font-semibold tracking-tight text-foreground">
 {sectionTitle}
 </h1>
 <div className="relative">
 
 <button
 onClick={() => setTempleOpen((o) => !o)}
 className="group flex items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-2 text-sm font-normal shadow-[0_2px_15px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-gray-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
 >
 
 <Landmark
 size={14}
 className="text-muted-foreground transition-transform group-hover:scale-110"
 />
 {temple.name}
 <ChevronDown
 size={14}
 className="text-muted-foreground transition-transform group-hover:translate-y-0.5"
 />
 </button>
 {templeOpen && (
 <div className="absolute left-1/2 top-full z-50 mt-1 w-72 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-popover">
 
 {TEMPLES.map((t) => (
 <button
 key={t.id}
 onClick={() => switchTemple(t.id)}
 className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted ${t.id === templeId ?"bg-muted font-medium text-foreground" :""}`}
 >
 
 <span>{t.name}</span>
 <span className="text-xs text-muted-foreground">{t.short}</span>
 </button>
 ))}
 </div>
 )}
 </div>
 <div className="flex items-center gap-4 text-sm text-muted-foreground">
 
 <div className="flex items-center gap-1.5">
 
 <span className="font-mono font-normal text-foreground">
 
 {now.toLocaleTimeString("en-IN", {
 hour12: false,
 hour:"2-digit",
 minute:"2-digit",
 })}
 </span>
 <span className="text-xs">
 
 ·
 {now.toLocaleDateString("en-IN", {
 weekday:"short",
 day:"numeric",
 month:"short",
 })}
 </span>
 </div>
 <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all hover:shadow-md">
 
 <span className="text-[10px] font-semibold text-muted-foreground">
 {temple.short}
 </span>
 <span className="text-xs font-medium text-foreground">{temple.weather}</span>
 </div>
 <div className="relative">
 
 <button
 onClick={() => setBellOpen((o) => !o)}
 className="relative rounded-xl p-2 transition-colors hover:bg-surface"
 >
 
 <Bell
 size={18}
 className="text-muted-foreground transition-colors hover:text-foreground"
 />
 <span className="absolute right-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-xl bg-danger text-[8px] font-semibold text-white">
 
 3
 </span>
 </button>
 {bellOpen && (
 <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-border bg-popover">
 
 <div className="border-b border-border bg-muted px-3 py-2 text-xs font-medium">
 
 Notifications
 </div>
 <div className="">
 
 {[
 {
 t:"Peak alert",
 b:"Inner sanctum approaching capacity",
 c:"text-danger",
 },
 { t:"Queue update", b:"Lane B wait time +6 min", c:"text-status-busy" },
 { t:"Staff", b:"8 volunteers deployed to Lane C", c:"text-info" },
 ].map((n, i) => (
 <div key={i} className="px-3 py-2 text-xs">
 
 <div className={`font-medium ${n.c}`}>{n.t}</div>
 <div className="text-muted-foreground">{n.b}</div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-xs font-medium text-white shadow-sm transition-transform hover:scale-105 cursor-pointer">
 
 RK
 </div>
 </div>
 </header>
 <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarExpanded ?"ml-[260px]" :"ml-[72px]"}`}>
 
 <div className="relative p-5 min-h-[calc(100vh-4rem)]">
 
 {shimmer && (
 <div className={`fixed top-16 right-0 bottom-0 z-50 ${sidebarExpanded ?"left-[260px]" :"left-[72px]"} flex flex-col items-center justify-center bg-surface/60 backdrop-blur-sm animate-in fade-in duration-300`}>
 
 <div className="flex flex-col items-center gap-3">
 
 <div className="relative flex h-20 w-20 items-center justify-center rounded-xl bg-surface shadow-sm overflow-hidden border border-border">
 
 {/* Empty state */}
 <div className="absolute inset-0 flex items-center justify-center bg-muted">
 
 <span className="text-3xl text-muted-foreground/30">ॐ</span>
 </div>
 {/* Filling state */}
 <div className="absolute inset-0 flex items-center justify-center bg-saffron animate-fill-up">
 
 <span className="text-3xl text-white">ॐ</span>
 </div>
 </div>
 <div className="text-center">
 
 <div className="text-base font-semibold text-foreground">
 Switching to {temple.name}
 </div>
 <div className="text-sm font-normal text-muted-foreground mt-1">
 Connecting to live telemetry...
 </div>
 </div>
 </div>
 </div>
 )}
 <div
 className={`transition-all duration-500 ${shimmer ?"opacity-30 blur-[2px] pointer-events-none translate-y-2" :"opacity-100 translate-y-0 blur-none"}`}
 >
 
 {section ==="dashboard" && <DashboardSection temple={temple} />}
 {section ==="darshan" && <DarshanSection />}
 {section ==="heatmap" && <HeatmapSection />} {section ==="cctv" && <CCTVSection />}
 {section ==="queue" && <QueueSection />} {section ==="staff" && <StaffSection />}
 {section ==="operations" && <OperationsSection />}
 {section ==="parking" && <ParkingSection />}
 {/* {section ==="announcements" && <AnnouncementsSection />} {section ==="analytics" && <AnalyticsSection />} {section ==="emergency" && <EmergencySection />} */}
 </div>
 </div>
 </main>
 </div>
 </div>
 );
}
