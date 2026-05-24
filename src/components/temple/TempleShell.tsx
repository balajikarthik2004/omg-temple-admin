import { useState, useEffect } from "react";
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
 Sparkles,
} from "lucide-react";
import { Toaster } from "sonner";
import { NAV_ITEMS, TEMPLES, type SectionId } from "@/lib/temple-data";
import { useLiveClock } from "@/lib/use-live";
import { DashboardSection } from "./sections/DashboardSection";
import { HeatmapSection } from "./sections/HeatmapSection";
import { CCTVSection } from "./sections/CCTVSection";
import { DarshanSection } from "./sections/DarshanSection";
import { QueueSection } from "./sections/QueueSection";
import { StaffSection } from "./sections/StaffSection";
import { OperationsSection } from "./sections/OperationsSection";
import { ParkingSection } from "./sections/ParkingSection";
import { AnnouncementsSection } from "./sections/AnnouncementsSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { EmergencySection } from "./sections/EmergencySection";
import omgLogo from "@/assets/logo.png";

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
  if (typeof window !== "undefined") {
   const hash = window.location.hash.replace("#", "");
   return (NAV_ITEMS.find((n) => n.id === hash)?.id as SectionId) || "dashboard";
  }
  return "dashboard";
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
 const sectionTitle = NAV_ITEMS.find((n) => n.id === section)?.label ?? "";

 return (
  <div className="min-h-screen relative overflow-hidden selection:bg-primary/30" style={{ background: "linear-gradient(160deg, #F0F8FF 0%, #E6F2FF 40%, #F0F8FF 100%)" }}>

   {/* ── Animated background orbs ── */}
   <div className="orb-1 absolute top-[-15%] left-[-10%] h-[55vw] w-[55vw] rounded-full pointer-events-none z-0"
     style={{ background: "radial-gradient(circle, rgba(245,130,10,0.13) 0%, transparent 70%)", filter: "blur(60px)" }} />
   <div className="orb-2 absolute bottom-[-20%] right-[-10%] h-[50vw] w-[50vw] rounded-full pointer-events-none z-0"
     style={{ background: "radial-gradient(circle, rgba(226,46,38,0.10) 0%, transparent 70%)", filter: "blur(70px)" }} />
   <div className="orb-3 absolute top-[30%] right-[20%] h-[30vw] w-[30vw] rounded-full pointer-events-none z-0"
     style={{ background: "radial-gradient(circle, rgba(41,48,136,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />

   {/* Subtle grid overlay */}
   <div className="absolute inset-0 pointer-events-none z-0" style={{
    backgroundImage: "linear-gradient(to right, rgba(226,46,38,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,46,38,0.03) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
   }} />

   <div className="relative z-10 flex min-h-screen">
    <Toaster position="top-right" richColors theme="light" />

    {/* ══════════════════════════════════
        SIDEBAR
        ══════════════════════════════════ */}
    <aside
     className={`bg-surface border-r border-border fixed left-0 top-0 z-30 flex h-screen flex-col text-sidebar-foreground transition-all duration-300 ${sidebarExpanded ? "w-[260px]" : "w-[72px]"}`}
    >

     {/* Logo row */}
     <div className="relative flex flex-col px-4 py-5">
      <div className="flex items-center gap-3">
       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-0.5"
        style={{ background: "rgba(226,46,38,0.08)", border: "1px solid rgba(226,46,38,0.2)" }}>
        <img src={omgLogo} alt="OMG Logo" className="h-7 w-auto object-contain" />
       </div>
       {sidebarExpanded && (
        <div>
         <div className="text-base font-montserrat font-bold tracking-tight text-sidebar-foreground">OMG</div>
         <div className="text-[10px] font-medium text-sidebar-muted">Admin Portal</div>
        </div>
       )}
      </div>

      {/* Collapse toggle */}
      <button
       onClick={() => setSidebarExpanded(!sidebarExpanded)}
       className="absolute -right-3 top-7 flex h-6 w-6 items-center justify-center rounded-full z-40 transition-all hover:scale-110 bg-white"
       style={{ border: "1px solid rgba(226,46,38,0.3)", boxShadow: "0 2px 8px rgba(226,46,38,0.15)", color: "#E22E26" }}
      >
       {sidebarExpanded ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
      </button>
     </div>

     {/* Divider */}
     <div className="mx-4 h-px" style={{ background: "rgba(242,200,168,0.5)" }} />

     {/* Nav items */}
     <nav className="relative flex-1 overflow-y-auto px-3 py-3 space-y-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {NAV_ITEMS.map((item) => {
       const Icon = ICONS[item.icon];
       const active = item.id === section;
       return (
        <button
         key={item.id}
         onClick={() => setSection(item.id)}
         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${active ? "nav-active" : "hover:-translate-y-0.5 hover:bg-black/5 text-sidebar-muted"}`}
        >
         <Icon
          size={18}
          className={`shrink-0 transition-all duration-300 ${active ? "" : "group-hover:scale-110 group-hover:text-sidebar-foreground text-sidebar-muted"}`}
         />
         {sidebarExpanded && <span className={`truncate font-medium ${active ? "" : "group-hover:text-sidebar-foreground text-sidebar-muted"}`}>{item.label}</span>}
        </button>
       );
      })}
     </nav>

     {/* Divider */}
     <div className="mx-4 h-px" style={{ background: "rgba(242,200,168,0.5)" }} />

     {/* User row */}
     <div className="relative p-3">
      <div
       className="flex items-center gap-3 rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 group hover:bg-black/5"
       style={{ border: "1px solid rgba(226,46,38,0.2)" }}
      >
       <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold"
        style={{ background: "linear-gradient(135deg, #E22E26, #293088)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(226,46,38,0.2)" }}>
        RK
       </div>
       {sidebarExpanded && (
        <>
         <div className="min-w-0 flex-1 text-left">
          <div className="truncate text-sm font-semibold text-sidebar-foreground">Rajesh Kumar</div>
          <div className="truncate text-[10px] text-sidebar-muted">Executive Officer</div>
         </div>
         <LogOut size={15} className="transition-colors text-sidebar-muted group-hover:text-primary" />
        </>
       )}
      </div>
     </div>
    </aside>

    {/* ══════════════════════════════════
        TOPBAR
        ══════════════════════════════════ */}
    <header
     className={`topbar-glass fixed right-0 top-0 z-20 flex h-16 items-center justify-between px-6 transition-all duration-300 ${sidebarExpanded ? "left-[260px]" : "left-[72px]"}`}
    >
     <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
       <Sparkles size={14} className="text-primary" />
       <h1 className="text-sm font-bold tracking-tight text-foreground">{sectionTitle}</h1>
      </div>
      {/* Live pill */}
      <div className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
       style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#059669" }}>
       <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
       LIVE
      </div>
     </div>

     <div className="flex items-center gap-3">
      {/* Temple switcher */}
      <div className="relative">
       <button
        onClick={() => setTempleOpen((o) => !o)}
        className="group flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(226,46,38,0.2)", boxShadow: "0 2px 8px rgba(226,46,38,0.08)", color: "#1A0800" }}
       >
        <Landmark size={13} className="text-primary" />
        <span className="hidden sm:block">{temple.name}</span>
        <ChevronDown size={13} className="text-muted-foreground transition-transform group-hover:translate-y-0.5" />
       </button>
       {templeOpen && (
        <div className="absolute left-1/2 top-full z-50 mt-1 w-72 -translate-x-1/2 overflow-hidden rounded-xl shadow-xl"
         style={{ background: "#FFFFFF", border: "1px solid rgba(226,46,38,0.2)", boxShadow: "0 12px 32px rgba(226,46,38,0.10)" }}>
         {TEMPLES.map((t) => (
          <button
           key={t.id}
           onClick={() => switchTemple(t.id)}
           className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted ${t.id === templeId ? "bg-muted font-semibold text-foreground" : "text-foreground"}`}
          >
           <span>{t.name}</span>
           <span className="text-xs text-muted-foreground">{t.short}</span>
          </button>
         ))}
        </div>
       )}
      </div>

      {/* Clock + weather */}
      <div className="hidden md:flex items-center gap-1.5 text-sm">
       <span className="font-mono font-semibold text-foreground">
        {now.toLocaleTimeString("en-IN", { hour12: false, hour: "2-digit", minute: "2-digit" })}
       </span>
       <span className="text-xs text-muted-foreground">
        · {now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
       </span>
      </div>

      {/* Weather */}
      <div className="hidden sm:flex items-center gap-1.5 rounded-xl px-3 py-1.5"
       style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(242,200,168,0.6)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
       <span className="text-[10px] font-semibold text-muted-foreground">{temple.short}</span>
       <span className="text-xs font-medium text-foreground">{temple.weather}</span>
      </div>

      {/* Bell */}
      <div className="relative">
       <button
        onClick={() => setBellOpen((o) => !o)}
        className="relative rounded-xl p-2 transition-colors hover:bg-muted"
       >
        <Bell size={18} className="text-muted-foreground" />
        <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold text-white"
         style={{ background: "#E22E26", boxShadow: "0 2px 8px rgba(226,46,38,0.5)" }}>
         3
        </span>
       </button>
       {bellOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl shadow-xl"
         style={{ background: "#FFFFFF", border: "1px solid rgba(242,200,168,0.7)", boxShadow: "0 12px 32px rgba(226,46,38,0.10)" }}>
         <div className="px-4 py-2.5 text-xs font-bold" style={{ background: "linear-gradient(135deg, #FFF7F0, #FFF3E8)", borderBottom: "1px solid rgba(242,200,168,0.5)" }}>
          Notifications
         </div>
         {[
          { t: "Peak alert", b: "Inner sanctum approaching capacity", c: "#E22E26", dot: "#E22E26" },
          { t: "Queue update", b: "Lane B wait time +6 min", c: "#B45309", dot: "#F59E0B" },
          { t: "Staff", b: "8 volunteers deployed to Lane C", c: "#4F58CA", dot: "#4F58CA" },
         ].map((n, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3 text-xs hover:bg-muted/50 transition-colors">
           <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: n.dot }} />
           <div>
            <div className="font-semibold" style={{ color: n.c }}>{n.t}</div>
            <div className="text-muted-foreground mt-0.5">{n.b}</div>
           </div>
          </div>
         ))}
        </div>
       )}
      </div>

      {/* Avatar */}
      <div className="grid h-8 w-8 place-items-center rounded-xl text-xs font-bold text-white cursor-pointer transition-transform hover:scale-105"
       style={{ background: "linear-gradient(135deg, #E22E26, #293088)", boxShadow: "0 4px 14px rgba(226,46,38,0.3)" }}>
       RK
      </div>
     </div>
    </header>

    {/* ══════════════════════════════════
        MAIN CONTENT
        ══════════════════════════════════ */}
    <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarExpanded ? "ml-[260px]" : "ml-[72px]"}`}>
     <div className="relative p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
      {/* Temple switch shimmer */}
      {shimmer && (
       <div className={`fixed top-16 right-0 bottom-0 z-50 ${sidebarExpanded ? "left-[260px]" : "left-[72px]"} flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in duration-300`}
        style={{ background: "rgba(255,247,240,0.70)" }}>
        <div className="flex flex-col items-center gap-6">
         <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,247,240,0.9)", border: "1px solid rgba(242,200,168,0.5)", boxShadow: "0 8px 32px rgba(245,130,10,0.2)" }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(245,200,168,0.2)" }}>
           <span className="text-3xl font-montserrat" style={{ color: "rgba(245,130,10,0.2)" }}>ॐ</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center animate-fill-up" style={{ background: "linear-gradient(135deg,#F5820A,#E22E26)" }}>
           <span className="text-3xl font-montserrat text-white">ॐ</span>
          </div>
         </div>
         <div className="text-center">
          <div className="text-base font-bold text-foreground">Switching to {temple.name}</div>
          <div className="text-sm text-muted-foreground mt-1">Connecting to live telemetry...</div>
         </div>
        </div>
       </div>
      )}

      <div className={`transition-all duration-500 ${shimmer ? "opacity-30 blur-[2px] pointer-events-none translate-y-2" : "opacity-100 translate-y-0 blur-none"}`}>
       {section === "dashboard" && <DashboardSection temple={temple} />}
       {section === "darshan" && <DarshanSection />}
       {section === "heatmap" && <HeatmapSection temple={temple} />}
       {section === "cctv" && <CCTVSection />}
       {section === "queue" && <QueueSection />}
       {section === "staff" && <StaffSection />}
       {section === "operations" && <OperationsSection />}
       {section === "parking" && <ParkingSection />}
       {/* {section === "announcements" && <AnnouncementsSection />} */}
       {/* {section === "analytics" && <AnalyticsSection />} */}
       {/* {section === "emergency" && <EmergencySection />} */}
      </div>
     </div>
    </main>
   </div>
  </div>
 );
}
