import { useState } from"react";
import { Ticket, Clock, IndianRupee, TrendingUp, TrendingDown, Users } from"lucide-react";
import {
 AreaChart,
 Area,
 BarChart,
 Bar,
 ResponsiveContainer,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
} from"recharts";
import { toast } from"sonner"; // Mock Data
const darshanCategories = [
 {
 id:"gen",
 name:"General Darshan",
 price:"Free",
 wait:"180 min",
 sold: 12450,
 cap:"High",
 color:"text-muted-foreground",
 bg:"bg-muted-foreground",
 },
 {
 id:"100",
 name:"₹100 Special",
 price:"₹100",
 wait:"45 min",
 sold: 3200,
 cap:"Medium",
 color:"text-info",
 bg:"bg-info",
 },
 {
 id:"200",
 name:"₹200 Quick",
 price:"₹200",
 wait:"20 min",
 sold: 1850,
 cap:"Medium",
 color:"text-saffron",
 bg:"bg-saffron",
 },
 {
 id:"300",
 name:"₹300 VIP",
 price:"₹300",
 wait:"5 min",
 sold: 420,
 cap:"Low",
 color:"text-emerald",
 bg:"bg-emerald",
 },
];
const hourlyFlow = Array.from({ length: 12 }).map((_, i) => ({
 time: `${6 + i}:00`,
 general: Math.floor(800 + Math.random() * 500),
 t100: Math.floor(200 + Math.random() * 100),
 t200: Math.floor(100 + Math.random() * 50),
 t300: Math.floor(20 + Math.random() * 10),
}));
export function DarshanSection() {
 const [lanes, setLanes] = useState({ gen: true, t100: true, t200: true, t300: true });
 const toggleLane = (id: string, name: string) => {
 setLanes((prev) => {
 const next = !prev[id as keyof typeof prev];
 if (next) toast.success(`${name} Counter Opened`);
 else toast.error(`${name} Counter Closed`);
 return { ...prev, [id]: next };
 });
 };
 return (
 <div className="space-y-4">
 
 {/* KPI Cards */}
 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
 
 {darshanCategories.map((c) => (
 <div
 key={c.id}
 className="group flex flex-col justify-between rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md"
 >
 
 <div>
 
 <div className="mb-2 flex items-start justify-between">
 
 <div className="text-xs font-extrabold text-muted-foreground">
 {c.name}
 </div>
 <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <Ticket size={10} />
 </div>
 </div>
 </div>
 <div className="mb-2 flex items-baseline gap-2">
 
 <div className={`text-2xl font-medium tracking-tight ${c.color}`}>{c.wait}</div>
 <div className="text-xs font-semibold text-muted-foreground">wait time</div>
 </div>
 <div className="mt-auto flex items-center justify-between border-t border-border pt-2">
 
 <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
 
 <Users size={10} /> {c.sold.toLocaleString()} sold
 </div>
 <div className="text-[10px] font-bold text-foreground">{c.price}</div>
 </div>
 </div>
 ))}
 </div>
 <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
 
 {/* Hourly Flow Chart */}
 <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
 
 <div className="mb-3 flex items-center justify-between">
 
 <div>
 
 <div className="text-sm font-bold text-foreground">Hourly Entry Flow</div>
 <div className="mt-0.5 text-xs text-muted-foreground">
 Devotees processed by ticket tier
 </div>
 </div>
 </div>
 <div className="h-[280px] w-full">
 
 <ResponsiveContainer width="100%" height="100%">
 
 <AreaChart data={hourlyFlow}>
 
 <defs>
 
 <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
 <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.3} />
 <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0} />
 </linearGradient>
 <linearGradient id="color100" x1="0" y1="0" x2="0" y2="1">
 <stop offset="5%" stopColor="var(--info)" stopOpacity={0.3} />
 <stop offset="95%" stopColor="var(--info)" stopOpacity={0} />
 </linearGradient>
 </defs>
 <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
 <XAxis
 dataKey="time"
 stroke="var(--muted-foreground)"
 fontSize={10}
 tickLine={false}
 axisLine={false}
 />
 <YAxis
 stroke="var(--muted-foreground)"
 fontSize={10}
 tickLine={false}
 axisLine={false}
 />
 <Tooltip
 contentStyle={{
 background:"var(--card)",
 border:"1px solid var(--border)",
 borderRadius: 8,
 fontSize: 11,
 }}
 />
 <Area
 type="monotone"
 dataKey="general"
 stackId="1"
 stroke="var(--muted-foreground)"
 fill="url(#colorGen)"
 name="General"
 />
 <Area
 type="monotone"
 dataKey="t100"
 stackId="1"
 stroke="var(--info)"
 fill="url(#color100)"
 name="₹100 Special"
 />
 <Area
 type="monotone"
 dataKey="t200"
 stackId="1"
 stroke="var(--saffron)"
 fill="var(--saffron)"
 fillOpacity={0.2}
 name="₹200 Quick"
 />
 <Area
 type="monotone"
 dataKey="t300"
 stackId="1"
 stroke="var(--emerald)"
 fill="var(--emerald)"
 fillOpacity={0.2}
 name="₹300 VIP"
 />
 </AreaChart>
 </ResponsiveContainer>
 </div>
 </div>
 {/* Counter & Lane Control */}
 <div className="flex flex-col rounded-lg border border-border bg-card shadow-sm">
 
 <div className="border-b border-border bg-surface px-4 py-3">
 
 <div className="text-sm font-bold text-foreground">
 Ticket Counter Controls
 </div>
 <div className="mt-0.5 text-xs text-muted-foreground">
 Manage active lanes and bookings
 </div>
 </div>
 <div className="flex-1 p-2">
 
 {darshanCategories.map((c, i) => {
 const keys = ["gen","t100","t200","t300"];
 const key = keys[i] as keyof typeof lanes;
 const isOpen = lanes[key];
 return (
 <div key={c.id} className="flex items-center justify-between p-3">
 
 <div className="flex items-center gap-3">
 
 <div
 className={`h-2 w-2 rounded-lg ${isOpen ? c.bg :"bg-muted"} ring-2 ring-background`}
 />
 <div>
 
 <div className="text-xs font-bold text-foreground">{c.name}</div>
 <div className="text-[10px] text-muted-foreground">
 Counters: {isOpen ?"Active" :"Closed"}
 </div>
 </div>
 </div>
 <button
 onClick={() => toggleLane(key, c.name)}
 className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-colors ${isOpen ?"bg-danger/10 text-danger hover:bg-danger/20" :"bg-emerald/10 text-emerald hover:bg-emerald/20"}`}
 >
 
 {isOpen ?"Close" :"Open"}
 </button>
 </div>
 );
 })}
 </div>
 </div>
 </div>
 </div>
 );
}
