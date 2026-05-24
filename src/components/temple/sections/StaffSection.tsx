import { STAFF } from"@/lib/temple-data";
import { toast } from"sonner";
import { useState } from"react";
import {
 Megaphone,
 UserPlus,
 Calendar,
 Siren,
 Navigation,
 UserCheck,
 Coffee,
 UserMinus,
 Users,
} from"lucide-react";
const statusBadge = (s: string) => {
 if (s ==="duty")
 return { label:"● On Duty", cls:"text-emerald bg-emerald/10 border-emerald/20" };
 if (s ==="break")
 return { label:"⏸ On Break", cls:"text-status-busy bg-status-busy/10 border-status-busy/20" };
 return { label:"Off Duty", cls:"text-muted-foreground bg-muted border-border" };
};
const staffPositions = [
 { x: 100, y: 100 },
 { x: 200, y: 80 },
 { x: 300, y: 90 },
 { x: 400, y: 100 },
 { x: 120, y: 180 },
 { x: 220, y: 200 },
 { x: 320, y: 190 },
 { x: 420, y: 180 },
 { x: 80, y: 260 },
 { x: 180, y: 270 },
 { x: 280, y: 260 },
 { x: 380, y: 270 },
 { x: 460, y: 270 },
 { x: 130, y: 320 },
 { x: 230, y: 320 },
 { x: 330, y: 320 },
 { x: 80, y: 220 },
 { x: 480, y: 130 },
 { x: 50, y: 130 },
 { x: 510, y: 220 },
];
export function StaffSection() {
 const onDuty = STAFF.filter((s) => s.status ==="duty").length;
 const onBreak = STAFF.filter((s) => s.status ==="break").length;
 const off = STAFF.filter((s) => s.status ==="off").length;
 const [selected, setSelected] = useState<number | null>(null);
 return (
 <div className="space-y-5">
 
 {/* KPI Cards */}
 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
 
 <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md">
 
 <div className="flex items-start justify-between mb-2">
 
 <div className="text-sm font-extrabold text-muted-foreground">
 On Duty
 </div>
 <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <UserCheck size={12} />
 </div>
 </div>
 <div className="text-xl font-semibold tabular-nums text-emerald">{onDuty}</div>
 </div>
 <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md">
 
 <div className="flex items-start justify-between mb-2">
 
 <div className="text-sm font-extrabold text-muted-foreground">
 On Break
 </div>
 <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <Coffee size={12} />
 </div>
 </div>
 <div className="text-xl font-semibold tabular-nums text-status-busy">{onBreak}</div>
 </div>
 <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md">
 
 <div className="flex items-start justify-between mb-2">
 
 <div className="text-sm font-extrabold text-muted-foreground">
 Off Duty
 </div>
 <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <UserMinus size={12} />
 </div>
 </div>
 <div className="text-xl font-semibold tabular-nums text-muted-foreground">{off}</div>
 </div>
 <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md">
 
 <div className="flex items-start justify-between mb-2">
 
 <div className="text-sm font-extrabold text-muted-foreground">
 Total Assigned
 </div>
 <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary">
 
 <Users size={12} />
 </div>
 </div>
 <div className="text-xl font-bold tabular-nums text-foreground">60</div>
 </div>
 </div>
 <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
 
 {/* Floor Map */}
 <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
 
 <div className="mb-3 flex items-center justify-between">
 
 <div className="font-semibold text-foreground">Staff Positions — Temple Floor</div>
 <div className="flex gap-3 text-xs text-muted-foreground">
 
 <span className="flex items-center gap-1.5">
 <div className="h-2 w-2 rounded-xl bg-emerald" /> On Duty
 </span>
 <span className="flex items-center gap-1.5">
 <div className="h-2 w-2 rounded-xl bg-status-busy" /> Break
 </span>
 </div>
 </div>
 <div className="rounded-xl bg-surface p-2">
 
 <svg viewBox="0 0 560 360" className="h-[340px] w-full">
 
 <rect
 x="20"
 y="10"
 width="520"
 height="340"
 rx="14"
 fill="none"
 stroke="var(--border)"
 strokeDasharray="4 4"
 strokeWidth="1"
 />
 <rect
 x="220"
 y="120"
 width="120"
 height="100"
 rx="8"
 fill="var(--saffron)"
 fillOpacity={0.05}
 stroke="var(--saffron)"
 strokeOpacity={0.3}
 strokeWidth="1"
 />
 <text
 x="280"
 y="172"
 textAnchor="middle"
 fontSize="11"
 fontWeight="600"
 fill="var(--saffron)"
 >
 Sanctum
 </text>
 {staffPositions.map((p, i) => {
 const s = STAFF[i];
 if (!s) return null;
 const color =
 s.status ==="duty"
 ?"var(--emerald)"
 : s.status ==="break"
 ?"var(--status-busy)"
 :"var(--muted-foreground)";
 const isSelected = selected === i;
 return (
 <g
 key={s.id}
 onClick={() => setSelected(i)}
 className="cursor-pointer transition-opacity hover:opacity-70"
 >
 
 <circle
 cx={p.x}
 cy={p.y}
 r={isSelected ?"11" :"9"}
 fill={color}
 fillOpacity={0.2}
 stroke={color}
 strokeWidth={isSelected ?"2" :"1"}
 />
 <text
 x={p.x}
 y={p.y + 3}
 textAnchor="middle"
 fontSize={isSelected ?"10" :"8"}
 fontWeight="600"
 fill={color}
 >
 {s.id.slice(-2)}
 </text>
 </g>
 );
 })}
 </svg>
 </div>
 {selected !== null && STAFF[selected] && (
 <div className="mt-3 flex items-center justify-between rounded-xl border border-info/30 bg-info/5 p-3 shadow-sm">
 
 <div>
 
 <div className="font-bold text-foreground text-sm">
 {STAFF[selected].name}
 <span className="ml-2 text-xs font-extrabold text-muted-foreground">
 ID: {STAFF[selected].id}
 </span>
 </div>
 <div className="mt-1 text-sm font-semibold text-muted-foreground">
 {STAFF[selected].role} · Assigned to {STAFF[selected].zone}
 </div>
 </div>
 <button
 onClick={() => toast(`Message sent to ${STAFF[selected].name}`)}
 className="rounded-xl bg-info px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-info/90"
 >
 
 Direct Message
 </button>
 </div>
 )}
 </div>
 {/* Quick Actions */}
 <div className="rounded-xl border border-border bg-card p-4">
 
 <div className="mb-3 font-semibold text-foreground">Quick Actions</div>
 <div className="space-y-2">
 
 {[
 { i: Megaphone, l:"Broadcast Message to All Staff" },
 { i: UserPlus, l:"Add Volunteer" },
 { i: Calendar, l:"View Full Schedule" },
 { i: Siren, l:"Emergency Muster", critical: true },
 ].map(({ i: Icon, l, critical }) => (
 <button
 key={l}
 onClick={() => toast.success(`${l} triggered`)}
 className={`flex w-full items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm font-normal transition-colors hover:bg-muted ${critical ?"text-danger" :"text-foreground"}`}
 >
 
 <Icon
 size={14}
 className={critical ?"text-danger" :"text-muted-foreground"}
 />
 {l}
 </button>
 ))}
 </div>
 </div>
 </div>
 {/* Roster Table */}
 <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
 
 <div className="border-b border-border bg-surface px-6 py-4 font-bold text-foreground">
 Volunteer Roster
 </div>
 <div className="overflow-x-auto">
 
 <table className="w-full text-sm">
 
 <thead className="bg-surface/50 text-xs font-extrabold text-muted-foreground">
 
 <tr>
 
 {["ID","Name","Role","Zone","Status","Since","Action"].map((h) => (
 <th key={h} className="px-6 py-3 text-left">
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="">
 
 {STAFF.map((s) => {
 const b = statusBadge(s.status);
 return (
 <tr key={s.id} className="transition-colors hover:bg-surface/50">
 
 <td className="px-6 py-3 font-mono text-xs text-muted-foreground">
 {s.id}
 </td>
 <td className="px-6 py-3 font-bold text-foreground">{s.name}</td>
 <td className="px-6 py-3 font-normal text-muted-foreground">{s.role}</td>
 <td className="px-6 py-3 font-normal text-muted-foreground">{s.zone}</td>
 <td className="px-6 py-3">
 
 <span
 className={`inline-flex items-center rounded-xl border px-2.5 py-0.5 text-[10px] font-bold ${b.cls}`}
 >
 
 {b.label}
 </span>
 </td>
 <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{s.since}</td>
 <td className="px-6 py-3">
 
 <div className="flex gap-2">
 
 {s.status ==="break" ? (
 <button
 onClick={() => toast(`${s.name} called back`)}
 className="rounded-xl bg-status-busy/10 border border-status-busy/20 px-3 py-1.5 text-xs font-semibold text-status-busy transition-colors hover:bg-status-busy/20"
 >
 Call Back
 </button>
 ) : (
 <>
 
 <button
 onClick={() => toast(`Message sent to ${s.name}`)}
 className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-muted"
 >
 Message
 </button>
 <button
 onClick={() => toast(`Reassign ${s.name}`)}
 className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-muted"
 >
 Reassign
 </button>
 </>
 )}
 </div>
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
