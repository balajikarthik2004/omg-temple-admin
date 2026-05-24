import { useEffect, useState } from"react";
import {
 AreaChart,
 Area,
 LineChart,
 Line,
 ResponsiveContainer,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 Legend,
} from"recharts";
import { toast } from"sonner";
import { Activity, Clock, Users, Car, Gauge, TrendingUp, TrendingDown } from"lucide-react";
import { useJitter, useLiveClock } from"@/lib/use-live";
import type { Temple } from"@/lib/temple-data";
const footfall = [
 { t:"6 AM", v: 800 },
 { t:"7 AM", v: 2400 },
 { t:"8 AM", v: 6800 },
 { t:"9 AM", v: 11200 },
 { t:"10 AM", v: 14800 },
 { t:"11 AM", v: 13900 },
 { t:"12 PM", v: 11200 },
 { t:"1 PM", v: 9400 },
 { t:"2 PM", v: 12450 },
 { t:"3 PM", v: 11800, forecast: true },
 { t:"4 PM", v: 12600, forecast: true },
 { t:"5 PM", v: 14900, forecast: true },
 { t:"6 PM", v: 16400, forecast: true },
 { t:"7 PM", v: 13200, forecast: true },
 { t:"8 PM", v: 9400, forecast: true },
 { t:"9 PM", v: 4200, forecast: true },
];
const queueTrend = Array.from({ length: 12 }).map((_, i) => ({
 t: `${i * 30}m`,
 A: 30 + Math.round(Math.sin(i / 2) * 12 + i * 1.5),
 B: 25 + Math.round(Math.cos(i / 2) * 10 + i * 1.2),
 C: 18 + Math.round(Math.sin(i / 3) * 6 + i * 0.8),
}));
const activityFeed = [
 { t:"14:32", c:"emerald", msg:"Crowd normalized at South Entrance. Gate 2 queue reducing." },
 { t:"14:28", c:"status-busy", msg:"Queue Lane B wait time increased to 52 minutes." },
 { t:"14:21", c:"danger", msg:"Peak crowd alert: Inner sanctum approaching capacity limit." },
 { t:"14:15", c:"info", msg:"8 volunteers deployed to Queue Lane C per AI recommendation." },
 { t:"14:08", c:"emerald", msg:"Parking Lot A returned to 70% after overflow activation." },
 { t:"14:02", c:"status-busy", msg:"Kovil Nandi entrance crowd density: 78%." },
 { t:"13:55", c:"info", msg:"AI forecast: Evening rush expected at 17:30–19:00." },
 { t:"13:48", c:"emerald", msg:"Morning peak crowd dissipated. Wait time reduced to 28 min." },
];
const suggestions = [
 {
 kind:"URGENT",
 border:"border-danger",
 title:"Open Gate 3 — North Entrance",
 body:"Current north queue: 580 people. Estimated overflow in 8 min.",
 action:"Open Gate 3",
 },
 {
 kind:"WARNING",
 border:"border-status-busy",
 title:"Deploy 6 More Volunteers",
 body:"Queue Lane A & B understaffed. 1 volunteer per 180 devotees (optimal: 1:120).",
 action:"Notify Staff",
 },
 {
 kind:"INFO",
 border:"border-info",
 title:"Evening Rush Preparation",
 body:"Predicted surge at 17:30 (est. +3,200 devotees). Pre-position staff by 17:00.",
 action:"Set Reminder",
 },
 {
 kind:"SUCCESS",
 border:"border-emerald",
 title:"Parking Overflow Not Needed",
 body:"Current inflow rate slowing. Lot A will stabilize at ~80% capacity.",
 action:"Dismiss",
 },
];
function KpiCard({
 icon: Icon,
 label,
 value,
 sub,
 accent,
 trend,
}: {
 icon: any;
 label: string;
 value: string;
 sub: string;
 accent: string;
 trend?: { up: boolean; text: string };
}) {
 return (
 <div className="group flex flex-col justify-between rounded-xl border border-border bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-primary/20">
 
 <div className="flex items-start justify-between mb-2">
 
 <span className="text-sm font-semibold text-muted-foreground">{label}</span>
 <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10">
 
 <Icon size={16} />
 </div>
 </div>
 <div className="mb-2">
 
 <div className={`text-2xl font-medium tracking-tight ${accent}`}>{value}</div>
 </div>
 <div className="mt-auto flex items-center gap-2">
 
 {trend && (
 <span
 className={`flex items-center gap-0.5 text-[11px] font-medium ${trend.up ?"text-danger" :"text-emerald"}`}
 >
 
 {trend.up ? (
 <TrendingUp size={12} strokeWidth={2.5} />
 ) : (
 <TrendingDown size={12} strokeWidth={2.5} />
 )}
 {trend.text}
 </span>
 )}
 <span className="text-[11px] font-normal text-muted-foreground truncate">{sub}</span>
 </div>
 </div>
 );
}
export function DashboardSection({ temple }: { temple: Temple }) {
 const inside = useJitter(12450, 80);
 const wait = useJitter(45, 3);
 const parking = useJitter(78, 2);
 const now = useLiveClock();
 const pct = Math.round((inside / 20000) * 100);
 const [feed, setFeed] = useState(activityFeed);
 useEffect(() => {
 const i = setInterval(() => {
 setFeed((f) => {
 const next = [...f];
 const pick = next[Math.floor(Math.random() * next.length)];
 const time = new Date().toLocaleTimeString("en-IN", { hour12: false }).slice(0, 5);
 return [{ ...pick, t: time }, ...next.slice(0, 7)];
 });
 }, 12000);
 return () => clearInterval(i);
 }, []);
 return (
 <div className="space-y-5">
 
 {/* Hero Banner */}
 <div className="relative overflow-hidden rounded-xl border border-border bg-sidebar p-5 text-sidebar-foreground">
 
 <div className="grid gap-5 md:grid-cols-3 md:items-center">
 
 <div>
 
 <div className="text-lg font-semibold">{temple.name}</div>
 <div className="text-sm text-muted-foreground">Crowd Intelligence Dashboard</div>
 <div className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-muted px-2.5 py-1 text-xs">
 
 <span className="h-1.5 w-1.5 rounded-xl bg-emerald" /> LIVE · Updated
 {now.toLocaleTimeString("en-IN", { hour12: false })}
 </div>
 </div>
 <div className="flex items-center justify-center gap-4">
 
 <div>
 
 <div className="text-3xl font-semibold tabular-nums text-primary">
 {inside.toLocaleString("en-IN")}
 </div>
 <div className="text-xs text-muted-foreground mt-1">
 Devotees currently inside
 <span className="font-bold text-foreground">({pct}% Capacity)</span>
 </div>
 </div>
 </div>
 <div className="space-y-1.5 text-sm">
 
 <div className="flex justify-between">
 <span className="text-muted-foreground">Today's total</span>
 <span className="font-medium tabular-nums">38,240</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Peak (10:30 AM)</span>
 <span className="font-medium tabular-nums">15,820</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Darshan Flow Rate</span>
 <span className="font-medium">1,250 / hr</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Next Peak Est.</span>
 <span className="font-medium">5:30 PM</span>
 </div>
 </div>
 </div>
 </div>
 {/* KPI Row */}
 <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
 
 <KpiCard
 icon={Clock}
 label="Current Queue Wait"
 value={`${wait} min`}
 sub="Lane A & B active"
 accent="text-foreground"
 trend={{ up: true, text:"+8m" }}
 />
 <KpiCard
 icon={Users}
 label="Crowd Capacity"
 value={`${pct}%`}
 sub={`${inside.toLocaleString("en-IN")} inside`}
 accent="text-status-busy"
 />
 <KpiCard
 icon={Activity}
 label="Volunteers On Duty"
 value="48 / 60"
 sub="12 on break"
 accent="text-info"
 />
 <KpiCard
 icon={Car}
 label="Parking Occupancy"
 value={`${parking}%`}
 sub={`${Math.round(parking * 15)} slots used`}
 accent="text-status-busy"
 />
 <KpiCard
 icon={Gauge}
 label="Congestion Level"
 value="BUSY"
 sub="Since 9:15 AM"
 accent="text-status-crowded"
 />
 </div>
 {/* AI Smart Suggestions - Card View */}
 <div>
 
 <div className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
 
 🤖 AI Smart Suggestions
 <span className="ml-2 text-sm font-semibold text-muted-foreground">
 Based on current crowd patterns
 </span>
 </div>
 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
 
 {suggestions.map((s) => (
 <div
 key={s.title}
 className={`flex flex-col justify-between rounded-xl bg-card p-3 shadow-sm transition-shadow hover:shadow-md`}
 >
 
 <div>
 
 <div className="mb-2 text-xs font-extrabold text-muted-foreground">
 {s.kind}
 </div>
 <div className="text-sm font-bold text-foreground">{s.title}</div>
 <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
 {s.body}
 </div>
 </div>
 <div className="mt-3 flex gap-2">
 
 <button
 onClick={() => toast.success(`${s.action} · action queued`)}
 className="flex-1 rounded-xl bg-primary py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
 >
 
 {s.action}
 </button>
 <button className="flex-1 rounded-xl bg-surface border border-border py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted">
 
 Dismiss
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>
 {/* Live Activity Feed - Full Width Timeline View */}
 <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
 
 <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
 
 <div className="flex items-center gap-2 font-bold text-foreground">
 
 <Activity size={16} className="text-saffron" /> Live Activity — {temple.name}
 </div>
 <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald">
 
 <span className="h-1.5 w-1.5 rounded-xl bg-emerald animate-pulse" /> Live Feed
 </span>
 </div>
 <div className="max-h-[320px] overflow-y-auto">
 
 {feed.map((f, i) => (
 <div
 key={i}
 className="flex items-start sm:items-center gap-3 bg-card px-5 py-3.5 transition-colors hover:bg-surface/50"
 >
 
 <div className="font-mono text-sm font-semibold text-muted-foreground w-12 shrink-0 pt-0.5 sm:pt-0">
 {f.t}
 </div>
 <div className={`mt-1.5 sm:mt-0 h-2 w-2 shrink-0 rounded-xl bg-${f.c}`} />
 <div className="text-sm font-normal text-foreground">{f.msg}</div>
 </div>
 ))}
 </div>
 </div>
 {/* Charts */}
 <div className="grid gap-5 lg:grid-cols-2">
 
 <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
 
 <div className="mb-3 flex items-center justify-between">
 
 <div className="font-bold text-foreground">Today's Hourly Footfall</div>
 <div className="flex items-center gap-3">
 
 <span className="text-xs font-extrabold text-muted-foreground">
 Actual vs Forecast
 </span>
 <span className="rounded bg-emerald/10 px-2 py-0.5 text-xs font-semibold text-emerald">
 Peak: 16.4k
 </span>
 </div>
 </div>
 <div className="h-[280px]">
 
 <ResponsiveContainer width="100%" height="100%">
 
 <AreaChart data={footfall} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
 
 <defs>
 
 <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
 
 <stop offset="0%" stopColor="var(--saffron)" stopOpacity={0.4} />
 <stop offset="100%" stopColor="var(--saffron)" stopOpacity={0.0} />
 </linearGradient>
 </defs>
 <CartesianGrid
 strokeDasharray="4 4"
 stroke="var(--border)"
 opacity={0.5}
 vertical={false}
 />
 <XAxis
 dataKey="t"
 stroke="var(--muted-foreground)"
 fontSize={10}
 tickLine={false}
 axisLine={false}
 dy={10}
 />
 <YAxis
 stroke="var(--muted-foreground)"
 fontSize={10}
 tickLine={false}
 axisLine={false}
 dx={-10}
 tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
 />
 <Tooltip
 contentStyle={{
 background:"var(--card)",
 border:"1px solid var(--border)",
 borderRadius:"8px",
 fontSize:"12px",
 boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1)",
 }}
 itemStyle={{ fontWeight: 600, color:"var(--saffron)" }}
 labelStyle={{
 fontWeight:"bold",
 color:"var(--foreground)",
 marginBottom:"4px",
 }}
 formatter={(value: any) => [value.toLocaleString(),"Devotees"]}
 />
 <Area
 type="monotone"
 dataKey="v"
 name="Footfall"
 stroke="var(--saffron)"
 fill="url(#sg)"
 strokeWidth={3}
 activeDot={{ r: 6, fill:"var(--saffron)", strokeWidth: 0 }}
 />
 </AreaChart>
 </ResponsiveContainer>
 </div>
 </div>
 <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
 
 <div className="mb-3 flex items-center justify-between">
 
 <div className="font-bold text-foreground">Queue Wait Time Trend</div>
 <div className="flex items-center gap-3">
 
 <span className="text-xs font-extrabold text-muted-foreground">
 Last 6 Hours
 </span>
 <span className="rounded bg-info/10 px-2 py-0.5 text-xs font-semibold text-info">
 Avg: 32 min
 </span>
 </div>
 </div>
 <div className="h-[280px]">
 
 <ResponsiveContainer width="100%" height="100%">
 
 <LineChart data={queueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
 
 <CartesianGrid
 strokeDasharray="4 4"
 stroke="var(--border)"
 opacity={0.5}
 vertical={false}
 />
 <XAxis
 dataKey="t"
 stroke="var(--muted-foreground)"
 fontSize={10}
 tickLine={false}
 axisLine={false}
 dy={10}
 />
 <YAxis
 stroke="var(--muted-foreground)"
 fontSize={10}
 tickLine={false}
 axisLine={false}
 dx={-10}
 tickFormatter={(v) => `${v}m`}
 />
 <Tooltip
 contentStyle={{
 background:"var(--card)",
 border:"1px solid var(--border)",
 borderRadius:"8px",
 fontSize:"12px",
 boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1)",
 }}
 itemStyle={{ fontWeight: 600 }}
 labelStyle={{
 fontWeight:"bold",
 color:"var(--foreground)",
 marginBottom:"4px",
 }}
 />
 <Legend
 iconType="circle"
 wrapperStyle={{ fontSize: 11, paddingTop:"20px", fontWeight: 600 }}
 />
 <Line
 type="monotone"
 dataKey="A"
 name="Lane A"
 stroke="var(--saffron)"
 strokeWidth={3}
 dot={false}
 activeDot={{ r: 5, strokeWidth: 0 }}
 />
 <Line
 type="monotone"
 dataKey="B"
 name="Lane B"
 stroke="var(--info)"
 strokeWidth={3}
 dot={false}
 activeDot={{ r: 5, strokeWidth: 0 }}
 />
 <Line
 type="monotone"
 dataKey="C"
 name="Lane C"
 stroke="var(--emerald)"
 strokeWidth={3}
 dot={false}
 activeDot={{ r: 5, strokeWidth: 0 }}
 />
 </LineChart>
 </ResponsiveContainer>
 </div>
 </div>
 </div>
 </div>
 );
} // Suppress unused void Users; void Clock; void Car; void Gauge;
