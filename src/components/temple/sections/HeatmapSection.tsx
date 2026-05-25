import { useState, useEffect } from "react";
import { densityColor, statusColor, ZONES } from "@/lib/temple-data";
import { useJitter } from "@/lib/use-live";
import {
  Play,
  Pause,
  Users,
  UsersRound,
  Car,
  Activity,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { StatCard } from "../ui/StatCard";

import palaniImg from "@/assets/palani.png";
import maduraiImg from "@/assets/Madurai.png";
import srirangamImg from "@/assets/Srirangam.png";
import arunachaleswararImg from "@/assets/Arunachaleswarar.png";
import rameswaramImg from "@/assets/Rameswaram.png";

const imgMap: Record<string, string> = {
  palani: palaniImg,
  meenakshi: maduraiImg,
  srirangam: srirangamImg,
  tiruvannamalai: arunachaleswararImg,
  rameswaram: rameswaramImg,
};

const zones = [
  { id: "Main Gopuram", x: 220, y: 30, w: 160, h: 50 },
  { id: "North Gate", x: 40, y: 30, w: 80, h: 40 },
  { id: "South Gate", x: 480, y: 30, w: 80, h: 40 },
  { id: "Queue 1", x: 40, y: 110, w: 80, h: 30 },
  { id: "Queue 2", x: 40, y: 150, w: 80, h: 30 },
  { id: "Queue 3", x: 40, y: 190, w: 80, h: 30 },
  { id: "Queue 4", x: 480, y: 110, w: 80, h: 30 },
  { id: "Queue 5", x: 480, y: 150, w: 80, h: 30 },
  { id: "Queue 6", x: 480, y: 190, w: 80, h: 30 },
  { id: "Sanctum", x: 240, y: 120, w: 120, h: 100 },
  { id: "Prasad", x: 240, y: 240, w: 120, h: 30 },
  { id: "East Gate", x: 270, y: 290, w: 60, h: 30 },
  { id: "Parking Bay", x: 40, y: 290, w: 200, h: 50 },
  { id: "Parking VIP", x: 360, y: 290, w: 120, h: 50 },
];

const forecast = [
  { t: "Now", v: 12450 },
  { t: "+30m", v: 13200 },
  { t: "+60m", v: 14800 },
  { t: "+90m", v: 13500 },
  { t: "+120m", v: 11200 },
];

export function HeatmapSection({ temple }: { temple?: any }) {
  const [realtime, setRealtime] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const inside = useJitter(12450, 80);
  const queues = useJitter(4320, 40);
  const parking = useJitter(3800, 30);

  const [zoneData, setZoneData] = useState(() =>
    zones.map((z) => ({
      id: z.id,
      pct: 40 + Math.floor(Math.random() * 40),
      data: ZONES[Math.floor(Math.random() * ZONES.length)],
    })),
  );

  useEffect(() => {
    if (!realtime || !playing) return;
    const t = setInterval(() => {
      setZoneData((prev) =>
        prev.map((z) => {
          // Drift the percentage smoothly up or down by a small amount
          const jitter = Math.random() * 6 - 3;
          return { ...z, pct: Math.min(95, Math.max(20, z.pct + jitter)) };
        }),
      );
    }, 2000);
    return () => clearInterval(t);
  }, [realtime, playing]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard
          icon={Users}
          label="Inside Now"
          value={inside.toLocaleString("en-IN")}
          color="text-saffron"
          bgTint="bg-saffron/10"
          trend={{ up: true, text: "+12%" }}
          sub="vs. last hour"
        />
        <StatCard
          icon={UsersRound}
          label="In Queues"
          value={queues.toLocaleString("en-IN")}
          color="text-info"
          bgTint="bg-info/10"
          trend={{ up: false, text: "-5%" }}
          sub="vs. last hour"
        />
        <StatCard
          icon={Car}
          label="In Parking"
          value={parking.toLocaleString("en-IN")}
          color="text-status-busy"
          bgTint="bg-gold/10"
          trend={{ up: true, text: "+8%" }}
          sub="vs. last hour"
        />
        <StatCard
          icon={Activity}
          label="Total on premises"
          value={(inside + queues + parking).toLocaleString("en-IN")}
          color="text-emerald"
          bgTint="bg-emerald/10"
          trend={{ up: true, text: "+15%" }}
          sub="Peak expected in 1 hr"
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* Heatmap Map Area */}
        <div className="flex flex-col gap-8 rounded-2xl bg-card p-8 border border-border shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border border-border/50">
              <button
                onClick={() => setRealtime(true)}
                className={`rounded-md px-5 py-1.5 text-xs font-bold transition-all ${realtime ? "bg-[#1A1F60] text-white shadow-[0_2px_8px_rgba(26,31,96,0.25)]" : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"}`}
              >
                Real-time
              </button>
              <button
                onClick={() => setRealtime(false)}
                className={`rounded-md px-5 py-1.5 text-xs font-bold transition-all ${!realtime ? "bg-[#1A1F60] text-white shadow-[0_2px_8px_rgba(26,31,96,0.25)]" : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"}`}
              >
                Historical
              </button>
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              {realtime ? "Live: OMG Temple Complex" : "Replaying: Last 6 Hours"}
            </div>
          </div>

          <div className="relative flex-1 rounded-xl bg-surface p-0 overflow-hidden min-h-[460px]">
            <button
              onClick={() => setFullScreen(true)}
              className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all border border-black/5 hover:-translate-y-0.5"
            >
              <Maximize2 size={14} className="text-primary" /> Full View
            </button>
            {temple && imgMap[temple.id] ? (
              <img
                src={imgMap[temple.id]}
                alt={`${temple.name} Map`}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
            ) : (
              <svg viewBox="0 0 600 360" className="absolute inset-0 w-full h-full">
                <rect
                  x="20"
                  y="10"
                  width="560"
                  height="340"
                  rx="16"
                  fill="var(--card)"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                />
                {Array.from({ length: 6 }).map((_, i) => (
                  <circle
                    key={i}
                    r="3"
                    fill="var(--saffron)"
                    style={
                      {
                        offsetPath: "path('M80 150 Q 200 130 300 170 Q 400 200 520 150')",
                        animation: `flow ${3 + (i % 3)}s linear ${i * 0.4}s infinite`,
                      } as React.CSSProperties
                    }
                    className="opacity-80"
                  />
                ))}
              </svg>
            )}

            {(!temple || !imgMap[temple.id]) && (
              <svg
                viewBox="0 0 600 360"
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
              >
                <defs>
                  <marker
                    id="arrh"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--saffron)" />
                  </marker>
                </defs>

                {zones.map((z) => {
                  const zd = zoneData.find((d) => d.id === z.id) || { pct: 50, data: ZONES[0] };
                  const pct = Math.round(zd.pct);
                  const color = densityColor(pct);

                  const hasImage = temple && imgMap[temple.id];
                  const fillOp = hasImage ? 0.75 : 0.25;
                  const textCol = hasImage ? "#ffffff" : "var(--foreground)";
                  const textCol2 = hasImage ? "#ffffff" : color;

                  return (
                    <g key={z.id} className="transition-all duration-1000">
                      <rect
                        x={z.x}
                        y={z.y}
                        width={z.w}
                        height={z.h}
                        rx="8"
                        fill={color}
                        fillOpacity={fillOp}
                        stroke={color}
                        strokeWidth={hasImage ? "0" : "1.5"}
                        className="transition-colors duration-1000 backdrop-blur-[1px]"
                      />
                      <text
                        x={z.x + z.w / 2}
                        y={z.y + z.h / 2 - 2}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill={textCol}
                        style={hasImage ? { textShadow: "0 1px 3px rgba(0,0,0,0.9)" } : {}}
                      >
                        {z.id}
                      </text>
                      <text
                        x={z.x + z.w / 2}
                        y={z.y + z.h / 2 + 12}
                        textAnchor="middle"
                        fontSize="10"
                        fill={textCol2}
                        fontWeight="700"
                        className="transition-colors duration-1000"
                        style={hasImage ? { textShadow: "0 1px 3px rgba(0,0,0,0.9)" } : {}}
                      >
                        {zd.data.current || 0} · {pct}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="flex flex-col gap-8">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-2 text-sm font-semibold text-foreground">
              AI Crowd Forecast (Next 2 Hours)
            </div>
            <div className="mb-6 text-[11px] font-normal text-muted-foreground">
              Peak warning at +60m based on historical trends
            </div>
            <div className="h-44">
              <ResponsiveContainer>
                <BarChart data={forecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="t"
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
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    cursor={{ fill: "var(--muted)" }}
                  />
                  <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                    {forecast.map((f, i) => (
                      <Cell
                        key={i}
                        fill={
                          f.v > 14000
                            ? "var(--status-critical)"
                            : f.v > 13000
                              ? "var(--status-crowded)"
                              : "var(--status-normal)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-sm flex-1">
            <div className="mb-2 text-sm font-semibold text-foreground">Status Legend</div>
            <div className="space-y-3 text-xs font-normal text-foreground">
              {[
                ["Clear / Normal", "var(--status-normal)"],
                ["Moderate", "var(--status-busy)"],
                ["Crowded", "var(--status-crowded)"],
                ["Critical", "var(--status-critical)"],
              ].map(([l, c]) => (
                <div
                  key={l}
                  className="flex items-center gap-8 rounded-lg bg-surface p-2 border border-border"
                >
                  <span className="h-3 w-3 rounded-full shadow-inner" style={{ background: c }} />
                  <span>{l}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-status-busy/30 bg-status-busy/10 p-8 text-xs leading-relaxed text-foreground">
              <span className="font-semibold text-status-busy">AI Insight:</span> Recommend
              activating full queue management protocols by 15:00.
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4 font-semibold text-lg text-foreground ">
          Zone Breakdown
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface text-[11px] font-black uppercase tracking-widest text-foreground/80">
              <tr>
                {["Zone", "Capacity", "Current", "% Full", "Status", "Recommended Action"].map(
                  (h) => (
                    <th key={h} className="px-6 py-3 text-left">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="">
              {ZONES.map((z) => {
                const pct = z.capacity ? Math.round((z.current / z.capacity) * 100) : 0;
                return (
                  <tr key={z.name} className="transition-colors hover:bg-surface/50 border-b border-border/40 last:border-0">
                    <td className="px-6 py-4 font-black text-[13px] text-foreground">{z.name}</td>
                    <td className="px-6 py-4 tabular-nums font-bold text-muted-foreground">
                      {z.capacity || "—"}
                    </td>
                    <td className="px-6 py-4 tabular-nums font-black text-[15px] text-foreground">
                      {z.current || "Clear"}
                    </td>
                    <td className="px-6 py-4 tabular-nums">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-surface overflow-hidden border border-border/50">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${pct}%`, background: densityColor(pct) }}
                          />
                        </div>
                        <span className="text-[11px] font-extrabold text-muted-foreground">
                          {z.capacity ? `${pct}%` : "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black tracking-wider uppercase ${statusColor(z.status)}`}
                      >
                        {z.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-bold text-muted-foreground/90">
                      {z.action}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {fullScreen && temple && imgMap[temple.id] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in zoom-in duration-200">
          <button
            onClick={() => setFullScreen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={32} />
          </button>
          <img
            src={imgMap[temple.id]}
            alt={`${temple.name} Map Full View`}
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
