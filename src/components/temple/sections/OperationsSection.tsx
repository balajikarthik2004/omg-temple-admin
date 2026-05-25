import { POOJAS } from "@/lib/temple-data";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  Megaphone,
  ShieldAlert,
  Users,
  Wrench,
  Activity,
  MonitorPlay,
} from "lucide-react";
import { StatCard } from "../ui/StatCard";
const announcements = [
  {
    id: 1,
    text: "Evening Deepa Aradhana starting in 15 mins",
    targets: ["Queue Displays", "App Push"],
  },
  { id: 2, text: "VIP Darshan slots available for tomorrow", targets: ["App Push"] },
];
const workOrders = [
  {
    id: "WO-1042",
    facility: "North Gate Restrooms",
    issue: "Sanitation required",
    priority: "high",
    status: "open",
  },
  {
    id: "WO-1043",
    facility: "East Wing AC Unit 2",
    issue: "Cooling degraded",
    priority: "medium",
    status: "open",
  },
  {
    id: "WO-1041",
    facility: "Main Sanctum Lights",
    issue: "Bulb replacement",
    priority: "low",
    status: "resolved",
  },
];

export function OperationsSection() {
  const [broadcasts, setBroadcasts] = useState(announcements);
  const [newText, setNewText] = useState("");
  const [orders, setOrders] = useState(workOrders);

  const handleBroadcast = () => {
    if (!newText.trim()) return;
    setBroadcasts([...broadcasts, { id: Date.now(), text: newText, targets: ["All Screens"] }]);
    setNewText("");
    toast.success("Broadcast deployed to all screens");
  };

  const resolveOrder = (id: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: "resolved" } : o)));
    toast.success(`Work Order ${id} marked as resolved`);
  };

  const dispatchJanitorial = (id: string) => {
    toast(`Janitorial team dispatched for ${id}`);
  };

  return (
    <div className="space-y-8">
      {/* 1. Operations Pulse (Top Level KPIs) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wrench}
          label="Maintenance Work"
          value={orders.filter((o) => o.status === "open").length}
          color="text-status-busy"
          bgTint="bg-status-busy/10"
          sub={orders.some(o => o.status === "open" && o.priority === "high") ? "High Priority issues active" : "Routine maintenance"}
        />
        <StatCard
          icon={Activity}
          label="Facility Health"
          value="94%"
          color="text-emerald"
          bgTint="bg-emerald/10"
          trend={{ up: false, text: "+2% today" }} 
          sub="All systems operating optimally"
        />
        <StatCard
          icon={ShieldAlert}
          label="Active Rituals"
          value={1}
          color="text-saffron"
          bgTint="bg-saffron/10"
          sub="Crowd control deployed"
        />
        <StatCard
          icon={Megaphone}
          label="Active Broadcasts"
          value={broadcasts.length}
          color="text-info"
          bgTint="bg-info/10"
          sub="Information active on all displays"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* 2. Live Ritual & Event Command */}
        <div className="flex flex-col glass-card">
          <div className="flex items-center justify-between border-b border-white/40 bg-white/40 px-6 py-4">
            <div>
              <h3 className="font-bold text-foreground">Live Ritual Command Center</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Today's Daily Pooja Schedule</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-saffron/10 px-3 py-1 border border-saffron/20">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron animate-pulse" />
              <span className="text-[10px] font-bold text-saffron">LIVE TRACKING</span>
            </div>
          </div>
          <div className="flex-1 p-8">
            <ol className="relative space-y-6 border-l-2 border-border/50 pl-8 ml-2">
              {POOJAS.map((p, i) => {
                const isLive = p.status === "live";
                const isDone = p.status === "done";
                const dotColor = isDone
                  ? "bg-emerald border-emerald"
                  : isLive
                    ? "bg-saffron border-saffron shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    : "bg-surface border-border";

                return (
                  <li key={i} className="relative group">
                    <span
                      className={`absolute -left-[39px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 ${dotColor} transition-all`}
                    >
                      {isDone && <CheckCircle2 size={10} className="text-white" />}
                    </span>

                    <div
                      className={`rounded-xl border p-4 transition-all ${isLive ? "border-saffron/30 bg-saffron/5 shadow-sm" : "border-transparent hover:border-border hover:bg-surface/50"}`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-md">
                          <div className="flex items-center gap-3">
                            <span className="rounded bg-background px-2 py-1 font-mono text-[10px] font-bold text-muted-foreground border border-border shadow-sm">
                              {p.time}
                            </span>
                            <span
                              className={`text-sm font-bold ${isLive ? "text-saffron" : "text-foreground"}`}
                            >
                              {p.name}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                            {p.desc}
                          </p>
                          <div
                            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold ${isLive ? "bg-saffron/20 text-saffron" : isDone ? "bg-emerald/10 text-emerald" : "bg-muted text-muted-foreground"}`}
                          >
                            {isDone ? "Completed" : isLive ? "In Progress" : "Upcoming"}
                          </div>
                        </div>

                        {isLive && (
                          <div className="flex shrink-0 flex-col gap-2">
                            <button
                              onClick={() => toast.success("Crowd Control Deployed")}
                              className="flex items-center gap-2 rounded-lg bg-saffron px-3 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-saffron/90 hover:-translate-y-0.5 transition-all"
                            >
                              <Users size={14} /> Deploy Staff
                            </button>
                            <button
                              onClick={() => toast.success("Audio Broadcast Started")}
                              className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-[11px] font-bold text-foreground hover:bg-muted transition-colors"
                            >
                              <Megaphone size={14} /> Announce
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* 3. Facility Health & Work Orders */}
        <div className="flex flex-col glass-card">
          <div className="flex items-center justify-between border-b border-white/40 bg-white/40 px-6 py-4">
            <div>
              <h3 className="font-bold text-foreground">Facility Maintenance Board</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Active work orders & asset health
              </p>
            </div>
            <button
              onClick={() => toast.success("New ticket drafted")}
              className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              + Log Ticket
            </button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[500px] p-6 space-y-4">
            {orders.map((order) => {
              const isOpen = order.status === "open";
              return (
                <div
                  key={order.id}
                  className={`flex flex-col gap-3 rounded-xl border p-5 transition-all ${isOpen ? "border-border bg-surface shadow-sm hover:border-primary/30 hover:shadow-md" : "border-border/50 bg-background/50 opacity-70"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-foreground">{order.facility}</span>
                        {isOpen && order.priority === "high" && (
                          <span className="rounded-md bg-danger/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-danger border border-danger/20">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{order.issue}</p>
                      <div className="mt-2 inline-block rounded bg-background px-2 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground border border-border">
                        {order.id}
                      </div>
                    </div>
                    {isOpen ? (
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${order.priority === "high" ? "bg-danger/10 text-danger" : "bg-status-busy/10 text-status-busy"}`}
                      >
                        <AlertCircle size={16} />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </div>

                  {isOpen && (
                    <div className="mt-3 flex gap-2 border-t border-border pt-3">
                      <button
                        onClick={() => dispatchJanitorial(order.id)}
                        className="flex-1 rounded-lg border border-border bg-card py-2 text-[11px] font-bold text-foreground hover:bg-muted transition-colors"
                      >
                        Dispatch Staff
                      </button>
                      <button
                        onClick={() => resolveOrder(order.id)}
                        className="flex-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 py-2 text-[11px] font-bold hover:bg-emerald/20 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Digital Signage & Announcements */}
      <div className="glass-card overflow-hidden">
        <div className="border-b border-white/40 bg-white/40 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-foreground">Digital Signage Controller</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage live broadcasts across temple displays
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald bg-emerald/10 px-3 py-1.5 rounded-full border border-emerald/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" /> 24 Screens Online
          </div>
        </div>

        <div className="grid gap-8 p-8 lg:grid-cols-2">
          {/* Broadcaster */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-foreground">New Broadcast</h4>
            <div className="relative">
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Type message to display..."
                className="w-full resize-none rounded-xl border border-border bg-surface p-4 pb-12 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                rows={4}
              />
              <div className="absolute bottom-3 left-4 text-[10px] font-semibold text-muted-foreground">
                {newText.length}/120 chars
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-2">
                <button className="rounded-lg bg-saffron/10 px-3 py-1.5 text-[11px] font-bold text-saffron border border-saffron/30 hover:bg-saffron/20 transition-colors">
                  All Screens
                </button>
                <button className="rounded-lg bg-surface px-3 py-1.5 text-[11px] font-bold text-muted-foreground border border-border hover:text-foreground transition-colors">
                  App Push Only
                </button>
              </div>
              <button
                onClick={handleBroadcast}
                disabled={!newText.trim()}
                className={`flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-[11px] font-bold text-white transition-all ${newText.trim() ? "bg-primary hover:bg-primary/90 shadow-sm hover:-translate-y-0.5" : "bg-muted-foreground cursor-not-allowed"}`}
              >
                <Megaphone size={14} /> Broadcast Now
              </button>
            </div>
          </div>

          {/* Active Broadcasts */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-foreground">Active Broadcasts</h4>
            <div className="space-y-3">
              {broadcasts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center text-xs text-muted-foreground">
                  No active broadcasts.
                </div>
              ) : (
                broadcasts.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-xl border border-saffron/30 bg-saffron/5 p-4 shadow-sm"
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground leading-snug">
                        "{b.text}"
                      </div>
                      <div className="mt-2 flex gap-1.5">
                        {b.targets.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-background px-2 py-0.5 text-[9px] font-bold text-muted-foreground border border-border shadow-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setBroadcasts(broadcasts.filter((x) => x.id !== b.id))}
                      className="shrink-0 rounded-lg bg-danger/10 px-3 py-1.5 text-[10px] font-bold text-danger border border-danger/20 hover:bg-danger/20 transition-colors"
                    >
                      Revoke
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
