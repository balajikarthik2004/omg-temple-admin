import { POOJAS } from"@/lib/temple-data";
import { useState } from"react";
import { toast } from"sonner";
import {
 AlertCircle,
 CheckCircle2,
 Megaphone,
 ShieldAlert,
 Users,
 Wrench,
 Activity,
} from"lucide-react";
const announcements = [
 {
 id: 1,
 text:"Evening Deepa Aradhana starting in 15 mins",
 targets: ["Queue Displays","App Push"],
 },
 { id: 2, text:"VIP Darshan slots available for tomorrow", targets: ["App Push"] },
];
const workOrders = [
 {
 id:"WO-1042",
 facility:"North Gate Restrooms",
 issue:"Sanitation required",
 priority:"high",
 status:"open",
 },
 {
 id:"WO-1043",
 facility:"East Wing AC Unit 2",
 issue:"Cooling degraded",
 priority:"medium",
 status:"open",
 },
 {
 id:"WO-1041",
 facility:"Main Sanctum Lights",
 issue:"Bulb replacement",
 priority:"low",
 status:"resolved",
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
 setOrders(orders.map((o) => (o.id === id ? { ...o, status:"resolved" } : o)));
 toast.success(`Work Order ${id} marked as resolved`);
 };
 const dispatchJanitorial = (id: string) => {
 toast(`Janitorial team dispatched for ${id}`);
 };
 return (
 <div className="space-y-5">
 
 {/* 1. Operations Pulse (Top Level KPIs) */}
 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
 
 <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md">
 
 <div className="flex items-start justify-between mb-2">
 
 <div className="text-sm font-extrabold text-muted-foreground">
 Open Work Orders
 </div>
 <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <Wrench size={12} />
 </div>
 </div>
 <div className="text-xl font-semibold tabular-nums text-status-busy">
 
 {orders.filter((o) => o.status ==="open").length}
 </div>
 </div>
 <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md">
 
 <div className="flex items-start justify-between mb-2">
 
 <div className="text-sm font-extrabold text-muted-foreground">
 Facility Health
 </div>
 <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <Activity size={12} />
 </div>
 </div>
 <div className="text-xl font-semibold tabular-nums text-emerald">94%</div>
 </div>
 <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md">
 
 <div className="flex items-start justify-between mb-2">
 
 <div className="text-sm font-extrabold text-muted-foreground">
 Active Rituals
 </div>
 <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <ShieldAlert size={12} />
 </div>
 </div>
 <div className="text-xl font-semibold tabular-nums text-saffron">1</div>
 </div>
 <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md">
 
 <div className="flex items-start justify-between mb-2">
 
 <div className="text-sm font-extrabold text-muted-foreground">
 Active Broadcasts
 </div>
 <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <Megaphone size={12} />
 </div>
 </div>
 <div className="text-xl font-semibold tabular-nums text-info">
 {broadcasts.length}
 </div>
 </div>
 </div>
 <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
 
 {/* 2. Live Ritual & Event Command */}
 <div className="flex flex-col rounded-xl border border-border bg-card">
 
 <div className="border-b border-border bg-surface px-5 py-4">
 
 <div className="font-semibold text-foreground">Live Ritual Command Center</div>
 <div className="text-xs text-muted-foreground mt-0.5">
 Today's Daily Pooja Schedule
 </div>
 </div>
 <div className="flex-1 p-4">
 
 <ol className="relative space-y-5 border-l-2 border-border pl-6">
 
 {POOJAS.map((p, i) => {
 const isLive = p.status ==="live";
 const isDone = p.status ==="done";
 const dotColor = isDone
 ?"bg-emerald"
 : isLive
 ?"bg-saffron"
 :"bg-muted-foreground/40";
 return (
 <li key={i} className="relative">
 
 <span
 className={`absolute -left-[29px] top-1.5 grid h-3 w-3 place-items-center rounded-xl ${dotColor}`}
 >
 
 {isDone && <span className="text-[6px] text-white">✓</span>}
 </span>
 <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
 
 <div className="max-w-md">
 
 <div className="flex items-center gap-3">
 
 <span className="font-mono text-xs text-muted-foreground">
 {p.time}
 </span>
 <span
 className={`text-sm font-normal ${isLive ?"text-saffron" :"text-foreground"}`}
 >
 {p.name}
 </span>
 </div>
 <div className="mt-1 text-xs text-muted-foreground">{p.desc}</div>
 <div
 className={`mt-1.5 text-[10px] font-semibold ${isLive ?"text-saffron" : isDone ?"text-emerald" :"text-muted-foreground"}`}
 >
 
 {isDone ?"Completed" : isLive ?"In Progress" :"Upcoming"}
 </div>
 </div>
 {isLive && (
 <div className="mt-2 flex shrink-0 gap-2 sm:mt-0">
 
 <button
 onClick={() => toast.success("Crowd Control Deployed")}
 className="flex items-center gap-1.5 rounded-xl bg-saffron/10 px-3 py-1.5 text-xs font-semibold text-saffron transition-colors hover:bg-saffron/20"
 >
 
 <Users size={14} /> Deploy Control
 </button>
 <button
 onClick={() => toast.success("Audio Broadcast Started")}
 className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-muted"
 >
 
 <Megaphone size={14} /> Audio
 </button>
 </div>
 )}
 </div>
 </li>
 );
 })}
 </ol>
 </div>
 </div>
 {/* 3. Facility Health & Work Orders */}
 <div className="flex flex-col rounded-xl border border-border bg-card">
 
 <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
 
 <div>
 
 <div className="font-semibold text-foreground">Facility Maintenance Board</div>
 <div className="text-xs text-muted-foreground mt-0.5">
 Active work orders & asset health
 </div>
 </div>
 <button
 onClick={() => toast.success("New ticket drafted")}
 className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-normal text-foreground hover:bg-muted"
 >
 
 + Log Ticket
 </button>
 </div>
 <div className="flex-1 overflow-y-auto max-h-[500px]">
 
 {orders.map((order) => {
 const isOpen = order.status ==="open";
 return (
 <div
 key={order.id}
 className={`flex flex-col gap-2.5 p-4 ${isOpen ?"" :"opacity-50"}`}
 >
 
 <div className="flex items-start justify-between">
 
 <div>
 
 <div className="flex items-center gap-2">
 
 <span className="text-sm font-normal text-foreground">
 {order.facility}
 </span>
 {isOpen && order.priority ==="high" && (
 <span className="rounded bg-danger/10 px-1.5 py-0.5 text-[9px] font-medium text-danger">
 High Priority
 </span>
 )}
 </div>
 <div className="mt-0.5 text-xs text-muted-foreground">{order.issue}</div>
 <div className="mt-1 font-mono text-[10px] text-muted-foreground">
 Ticket: {order.id}
 </div>
 </div>
 {isOpen ? (
 <AlertCircle
 size={18}
 className={order.priority ==="high" ?"text-danger" :"text-status-busy"}
 />
 ) : (
 <CheckCircle2 size={18} className="text-emerald" />
 )}
 </div>
 {isOpen && (
 <div className="mt-2 flex gap-2">
 
 <button
 onClick={() => dispatchJanitorial(order.id)}
 className="rounded border border-border bg-surface px-3 py-1.5 text-[11px] font-normal text-foreground hover:bg-muted"
 >
 
 Dispatch Staff
 </button>
 <button
 onClick={() => resolveOrder(order.id)}
 className="rounded border border-emerald/30 bg-emerald/10 px-3 py-1.5 text-[11px] font-normal text-emerald hover:bg-emerald/20"
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
 <div className="rounded-xl border border-border bg-card overflow-hidden">
 
 <div className="border-b border-border bg-surface px-5 py-4">
 
 <div className="font-semibold text-foreground">Digital Signage Controller</div>
 <div className="text-xs text-muted-foreground mt-0.5">
 Manage live broadcasts across temple displays and mobile app
 </div>
 </div>
 <div className="grid gap-5 p-4 lg:grid-cols-2">
 
 {/* Broadcaster */}
 <div>
 
 <div className="mb-2 text-sm font-bold text-foreground">New Broadcast</div>
 <textarea
 value={newText}
 onChange={(e) => setNewText(e.target.value)}
 placeholder="Type message to display..."
 className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
 rows={3}
 />
 <div className="mt-2 flex items-center justify-between">
 
 <div className="flex gap-2">
 
 <span className="rounded-xl bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron border border-saffron/20 cursor-pointer">
 All Screens
 </span>
 <span className="rounded-xl bg-surface px-3 py-1 text-xs font-bold text-muted-foreground border border-border cursor-pointer hover:text-foreground">
 App Only
 </span>
 </div>
 <button
 onClick={handleBroadcast}
 className="flex items-center gap-2 rounded-xl bg-saffron px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
 >
 
 <Megaphone size={16} /> Broadcast
 </button>
 </div>
 </div>
 {/* Active Broadcasts List */}
 <div>
 
 <div className="mb-2 text-sm font-bold text-foreground">Active Broadcasts</div>
 <div className="space-y-3">
 
 {broadcasts.length === 0 ? (
 <div className="text-sm text-muted-foreground">No active broadcasts.</div>
 ) : (
 broadcasts.map((b) => (
 <div
 key={b.id}
 className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 shadow-sm"
 >
 
 <div>
 
 <div className="text-sm font-bold text-foreground">"{b.text}"</div>
 <div className="mt-1 flex gap-1">
 
 {b.targets.map((t) => (
 <span
 key={t}
 className="rounded bg-background px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground border border-border"
 >
 
 {t}
 </span>
 ))}
 </div>
 </div>
 <button
 onClick={() => setBroadcasts(broadcasts.filter((x) => x.id !== b.id))}
 className="rounded bg-danger/10 px-3 py-1.5 text-xs font-semibold text-danger transition-colors hover:bg-danger/20"
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
