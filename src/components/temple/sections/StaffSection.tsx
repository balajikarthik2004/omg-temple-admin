import { STAFF } from "@/lib/temple-data";
import { toast } from "sonner";
import { useState } from "react";
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
} from "lucide-react";
import { StatCard } from "../ui/StatCard";
const statusBadge = (s: string) => {
  if (s === "duty")
    return { label: "● On Duty", cls: "text-emerald bg-emerald/10 border-emerald/20" };
  if (s === "break")
    return { label: "⏸ On Break", cls: "text-status-busy bg-status-busy/10 border-status-busy/20" };
  return { label: "Off Duty", cls: "text-muted-foreground bg-muted border-border" };
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
  const onDuty = STAFF.filter((s) => s.status === "duty").length;
  const onBreak = STAFF.filter((s) => s.status === "break").length;
  const off = STAFF.filter((s) => s.status === "off").length;
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={UserCheck}
          label="On Duty"
          value={onDuty}
          color="text-emerald-600"
          bgTint="bg-emerald-50 text-emerald-600 border border-emerald-100"
        />
        <StatCard
          icon={Coffee}
          label="On Break"
          value={onBreak}
          color="text-amber-600"
          bgTint="bg-amber-50 text-amber-600 border border-amber-100"
        />
        <StatCard
          icon={UserMinus}
          label="Off Duty"
          value={off}
          color="text-muted-foreground"
          bgTint="bg-muted/30 text-muted-foreground border border-border/50"
        />
        <StatCard
          icon={Users}
          label="Total Assigned"
          value={60}
          color="text-indigo-600"
          bgTint="bg-indigo-50 text-indigo-600 border border-indigo-100"
        />
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-border/40 bg-white p-6 lg:p-8 shadow-sm transition-shadow hover:shadow-md relative flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-bold text-lg text-foreground tracking-tight">Staff Positions — Temple Floor</div>
            <div className="flex gap-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald"></span>
                </span>
                Active Patrol
              </span>
              <span className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-status-busy" /> Break/Stationary
              </span>
            </div>
          </div>
          <div className="relative rounded-2xl bg-white border border-border/60 overflow-hidden shadow-sm">
            {/* Generated Temple Blueprint Image */}
            <img 
              src="/temple_blueprint.png" 
              alt="Temple Layout Blueprint" 
              className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-multiply pointer-events-none" 
            />
            
            <svg viewBox="0 0 560 360" className="h-[340px] w-full relative z-10">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {staffPositions.map((p, i) => {
                const s = STAFF[i];
                if (!s) return null;
                const isSelected = selected === i;
                const isDuty = s.status === "duty";
                const color = isDuty ? "#10B981" : s.status === "break" ? "#F59E0B" : "#94A3B8";
                
                return (
                  <g
                    key={s.id}
                    onClick={() => setSelected(i)}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    style={{ transformOrigin: `${p.x}px ${p.y}px`, transition: 'transform 0.2s', transform: isSelected ? 'scale(1.25)' : 'scale(1)' }}
                  >
                    {isDuty && (
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r={isSelected ? "14" : "10"} 
                        fill={color} 
                        fillOpacity={0.2} 
                        filter="url(#glow)" 
                        className={isSelected ? "" : "animate-pulse"} 
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isSelected ? "6" : "4.5"}
                      fill={color}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <text
                      x={p.x}
                      y={p.y - 12}
                      textAnchor="middle"
                      fontSize={isSelected ? "10" : "8"}
                      fontWeight="700"
                      fill={isSelected ? "#000" : color}
                    >
                      {s.id.slice(-2)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          {selected !== null && STAFF[selected] && (
            <div className="mt-3 flex items-center justify-between rounded-xl border border-info/30 bg-info/5 p-8 shadow-sm">
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
        <div className="rounded-3xl border border-border/40 bg-white p-6 lg:p-8 shadow-sm transition-shadow hover:shadow-md flex flex-col">
          <div className="mb-2 font-semibold text-foreground">Quick Actions</div>
          <div className="space-y-2">
            {[
              { i: Megaphone, l: "Broadcast Message to All Staff" },
              { i: UserPlus, l: "Add Volunteer" },
              { i: Calendar, l: "View Full Schedule" },
              { i: Siren, l: "Emergency Muster", critical: true },
            ].map(({ i: Icon, l, critical }) => (
              <button
                key={l}
                onClick={() => toast.success(`${l} triggered`)}
                className={`flex w-full items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm font-normal transition-colors hover:bg-muted ${critical ? "text-danger" : "text-foreground"}`}
              >
                <Icon size={14} className={critical ? "text-danger" : "text-muted-foreground"} />
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Roster Table */}
      <div className="rounded-3xl border border-border/40 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
        <div className="border-b border-border/40 bg-muted/10 px-6 py-5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
          Volunteer Roster
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
              <tr>
                {["ID", "Name", "Role", "Zone", "Status", "Since", "Action"].map((h) => (
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
                    <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                    <td className="px-6 py-3 font-semibold text-xs text-foreground">{s.name}</td>
                    <td className="px-6 py-3 font-medium text-xs text-muted-foreground">{s.role}</td>
                    <td className="px-6 py-3 font-normal text-muted-foreground">{s.zone}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center rounded-xl border px-2.5 py-0.5 text-[9px] font-semibold ${b.cls}`}
                      >
                        {b.label}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{s.since}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        {s.status === "break" ? (
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
