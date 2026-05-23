import { useState, useEffect } from "react";
import {
  Home, Users, Flame, Video, Timer, UsersRound, Landmark, Car,
  Megaphone, BarChart3, Siren, Bell, LogOut, ChevronDown,
} from "lucide-react";
import { Toaster } from "sonner";
import { NAV_ITEMS, TEMPLES, type SectionId } from "@/lib/temple-data";
import { useLiveClock } from "@/lib/use-live";
import { DashboardSection } from "./sections/DashboardSection";
import { HeatmapSection } from "./sections/HeatmapSection";
import { CCTVSection } from "./sections/CCTVSection";
import { QueueSection } from "./sections/QueueSection";
import { StaffSection } from "./sections/StaffSection";
import { OperationsSection } from "./sections/OperationsSection";
import { ParkingSection } from "./sections/ParkingSection";
import { AnnouncementsSection } from "./sections/AnnouncementsSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { EmergencySection } from "./sections/EmergencySection";
import omgLogo from "@/assets/logo.png";

const ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Home, Users, Flame, Video, Timer, UsersRound, Landmark, Car, Megaphone, BarChart3, Siren,
};

export function TempleShell() {
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
    setTimeout(() => setShimmer(false), 600);
  };

  const sectionTitle = NAV_ITEMS.find((n) => n.id === section)?.label ?? "";

  return (
    <div className="min-h-screen bg-surface">
      <Toaster position="top-right" richColors />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 flex h-screen w-[260px] flex-col border-r border-white/10 bg-sidebar text-sidebar-foreground">
        <div className="flex flex-col px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <img src={omgLogo} alt="OMG Logo" className="h-7 w-auto object-contain" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white">OMG</div>
              <div className="text-[10px] uppercase tracking-widest text-sidebar-muted">
                Admin Portal
              </div>
            </div>
          </div>
          {/* <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-sidebar-muted">Current Location</div>
            <div className="mt-1 text-sm font-semibold text-white">{temple.name}</div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald"></span>
              </span>
              Operational
            </div>
          </div> */}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            const active = item.id === section;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-sidebar-active text-white shadow-md"
                    : "text-sidebar-muted hover:bg-white/10 hover:text-white hover:translate-x-1 hover:shadow-sm"
                }`}
              >
                <Icon size={18} className={`transition-all duration-300 ${active ? "text-white" : "text-sidebar-muted group-hover:text-white group-hover:scale-110"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-bold text-white group-hover:bg-sidebar-active transition-colors">
              RK
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-sm font-semibold text-white">Rajesh Kumar</div>
              <div className="truncate text-[10px] uppercase tracking-wider text-sidebar-muted">Executive Officer</div>
            </div>
            <LogOut size={16} className="text-sidebar-muted group-hover:text-white transition-colors" />
          </div>
        </div>
      </aside>

      {/* Top bar */}
      <header className="fixed left-[260px] right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-md">
        <h1 className="text-lg font-bold tracking-tight text-foreground">{sectionTitle}</h1>

        <div className="relative">
          <button
            onClick={() => setTempleOpen((o) => !o)}
            className="group flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-sidebar-muted hover:shadow-md"
          >
            <Landmark size={14} className="text-sidebar-active transition-transform group-hover:scale-110" />
            {temple.name}
            <ChevronDown size={14} className="text-muted-foreground transition-transform group-hover:translate-y-0.5" />
          </button>
          {templeOpen && (
            <div className="absolute left-1/2 top-full z-50 mt-1 w-72 -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-popover">
              {TEMPLES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => switchTemple(t.id)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted ${t.id === templeId ? "bg-muted font-semibold text-saffron" : ""
                    }`}
                >
                  <span>{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.short}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-medium text-foreground">
              {now.toLocaleTimeString("en-IN", { hour12: false, hour: "2-digit", minute: "2-digit" })}
            </span>
            <span className="text-xs">
              · {now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sidebar-muted">{temple.short}</span>
            <span className="text-xs font-semibold text-foreground">{temple.weather}</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setBellOpen((o) => !o)}
              className="relative rounded-full p-2 transition-colors hover:bg-surface"
            >
              <Bell size={18} className="text-muted-foreground transition-colors hover:text-foreground" />
              <span className="absolute right-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-danger text-[8px] font-bold text-white">
                3
              </span>
            </button>
            {bellOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-lg border border-border bg-popover">
                <div className="border-b border-border bg-muted px-3 py-2 text-xs font-semibold">
                  Notifications
                </div>
                <div className="divide-y divide-border">
                  {[
                    { t: "Peak alert", b: "Inner sanctum approaching capacity", c: "text-danger" },
                    { t: "Queue update", b: "Lane B wait time +6 min", c: "text-status-busy" },
                    { t: "Staff", b: "8 volunteers deployed to Lane C", c: "text-info" },
                  ].map((n, i) => (
                    <div key={i} className="px-3 py-2 text-xs">
                      <div className={`font-semibold ${n.c}`}>{n.t}</div>
                      <div className="text-muted-foreground">{n.b}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-deep text-xs font-semibold text-white">
            RK
          </div>
        </div>
      </header>

      <main className="ml-[260px] pt-16">
        <div className="relative p-6">
          {section === "dashboard" && <DashboardSection temple={temple} />}
          {section === "heatmap" && <HeatmapSection />}
          {section === "cctv" && <CCTVSection />}
          {section === "queue" && <QueueSection />}
          {section === "staff" && <StaffSection />}
          {section === "operations" && <OperationsSection />}
          {section === "parking" && <ParkingSection />}
          {/* {section === "announcements" && <AnnouncementsSection />}
          {section === "analytics" && <AnalyticsSection />}
          {section === "emergency" && <EmergencySection />} */}
        </div>
      </main>
    </div>
  );
}
