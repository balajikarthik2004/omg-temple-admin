import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useJitter } from "@/lib/use-live";
import { toast } from "sonner";
import { Car, Bike, AlertCircle, ArrowRight, TrendingUp, IndianRupee } from "lucide-react";
import { StatCard } from "../ui/StatCard";
const flowData = Array.from({ length: 16 }).map((_, i) => ({
  t: `${i * 5}m`,
  entry: 10 + Math.round(Math.sin(i / 2) * 5 + 8),
  exit: 6 + Math.round(Math.cos(i / 2) * 3 + 4),
}));
export function ParkingSection() {
  const lotA2W = useJitter(850, 15);
  const lotA4W = useJitter(210, 5);
  const lotB2W = useJitter(120, 10);
  const lotB4W = useJitter(340, 8);
  const lots = [
    {
      name: "Main Lot A (Gopuram)",
      capacity2W: 1000,
      filled2W: lotA2W,
      capacity4W: 250,
      filled4W: lotA4W,
      status: (lotA2W + lotA4W) / 1250 > 0.85 ? "BUSY" : "MODERATE",
    },
    {
      name: "Lot B (South Gate)",
      capacity2W: 200,
      filled2W: lotB2W,
      capacity4W: 500,
      filled4W: lotB4W,
      status: (lotB2W + lotB4W) / 700 > 0.85 ? "BUSY" : "MODERATE",
    },
    {
      name: "Overflow Grounds",
      capacity2W: 800,
      filled2W: 0,
      capacity4W: 400,
      filled4W: 0,
      status: "INACTIVE",
    },
  ];
  const getStatusColor = (status: string) => {
    if (status === "BUSY" || status === "CROWDED")
      return "bg-status-crowded/15 text-status-crowded border border-status-crowded/30";
    if (status === "MODERATE")
      return "bg-status-busy/15 text-status-busy border border-status-busy/30";
    if (status === "INACTIVE") return "bg-surface text-muted-foreground border border-border";
    return "bg-status-normal/15 text-status-normal border border-status-normal/30";
  };
  const getProgressColor = (pct: number) => {
    if (pct >= 85) return "var(--status-critical)";
    if (pct >= 60) return "var(--status-crowded)";
    if (pct >= 40) return "var(--status-busy)";
    return "var(--status-normal)";
  };
  return (
    <div className="space-y-8">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        <StatCard
          icon={Bike}
          label="Total Two-Wheelers"
          value={(lotA2W + lotB2W).toLocaleString()}
          valueSuffix="/ 1,200"
          bgTint="bg-saffron/10"
        />
        <StatCard
          icon={Car}
          label="Total Four-Wheelers"
          value={(lotA4W + lotB4W).toLocaleString()}
          valueSuffix="/ 750"
          bgTint="bg-info/10"
        />
        <StatCard
          icon={TrendingUp}
          label="Parking Fill Speed"
          value="+18"
          color="text-primary"
          sub="more arriving/min"
          bgTint="bg-primary/10"
        />
        <StatCard
          icon={IndianRupee}
          label="Daily Revenue (Est)"
          value="₹42.5K"
          color="text-emerald"
          bgTint="bg-emerald/10"
        />
      </div>
      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* Left Column: Lots & Flow */}
        <div className="flex flex-col gap-8">
          {/* Detailed Lot Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {lots.slice(0, 2).map((l) => {
              const pct2W = Math.round((l.filled2W / l.capacity2W) * 100) || 0;
              const pct4W = Math.round((l.filled4W / l.capacity4W) * 100) || 0;
              return (
                <div key={l.name} className="kpi-card p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-semibold text-foreground">{l.name}</div>
                    <span
                      className={`inline-flex items-center rounded-xl px-2.5 py-0.5 text-[10px] font-bold ${getStatusColor(l.status)}`}
                    >
                      {l.status}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-normal text-muted-foreground">
                          <Bike size={12} /> Two-Wheelers
                        </span>
                        <span className="tabular-nums font-semibold text-foreground">
                          {l.filled2W} / {l.capacity2W}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-normal text-muted-foreground">
                          <Car size={12} /> Four-Wheelers
                        </span>
                        <span className="tabular-nums font-semibold text-foreground">
                          {l.filled4W} / {l.capacity4W}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Vehicle Flow Chart */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm flex-1">
            <div className="mb-2 font-semibold text-foreground">Traffic Flow (Last 90 Mins)</div>
            <div className="h-56">
              <ResponsiveContainer>
                <AreaChart data={flowData}>
                  <defs>
                    <linearGradient id="ent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--saffron)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--saffron)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ext" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--info)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--info)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                    cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "3 3" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="entry"
                    stroke="var(--saffron)"
                    strokeWidth={2}
                    fill="url(#ent)"
                    name="Entry/min"
                  />
                  <Area
                    type="monotone"
                    dataKey="exit"
                    stroke="var(--info)"
                    strokeWidth={2}
                    fill="url(#ext)"
                    name="Exit/min"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Right Column: Alerts & Mini Map */}
        <div className="flex flex-col gap-8">
          {/* AI Alert Card */}
          <div className="rounded-xl border border-status-crowded/30 bg-status-crowded/5 p-8 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-status-crowded">
              <AlertCircle size={16} /> Action Required
            </div>
            <div className="mt-2 text-[13px] leading-relaxed text-foreground">
              Main Lot A (Two-Wheelers) is approaching critical capacity (85%). At the current net
              flow rate, it will be completely full in <strong>14 minutes</strong>.
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => toast.success("Overflow Grounds activated. LED signages updated.")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-status-crowded px-4 py-2 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Activate Overflow Grounds
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted">
                Dismiss Alert
              </button>
            </div>
          </div>
          {/* Realistic Aisle Map */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm flex-1">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-foreground">
              Live Map: Main Lot A
            </div>
            <div className="relative rounded-xl bg-surface p-8">
              <svg viewBox="0 0 400 250" className="w-full drop-shadow-sm h-[220px]">
                {/* Base background */}
                <rect
                  width="400"
                  height="250"
                  rx="12"
                  fill="var(--card)"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                />
                {/* Driveway */}
                <path
                  d="M 200 0 L 200 250"
                  stroke="var(--border)"
                  strokeWidth="36"
                  fill="none"
                  opacity="0.3"
                  strokeDasharray="8 8"
                />
                <text
                  x="200"
                  y="125"
                  textAnchor="middle"
                  transform="rotate(-90 200 125)"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="0.1em"
                  fill="var(--muted-foreground)"
                >
                  MAIN DRIVEWAY
                </text>
                {/* Entry Indicator */}
                <g transform="translate(200, 16)">
                  <circle r="10" fill="var(--saffron)" />
                  <path d="M -3,-2 L 0,2 L 3,-2" stroke="white" strokeWidth="2" fill="none" />
                </g>
                <text
                  x="200"
                  y="38"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill="var(--saffron)"
                >
                  ENTRY
                </text>
                {/* Two-Wheeler Zone (Left) */}
                <g className="transition-all duration-500">
                  <rect
                    x="20"
                    y="20"
                    width="150"
                    height="210"
                    rx="8"
                    fill={getProgressColor(Math.round((lotA2W / 1000) * 100))}
                    fillOpacity="0.15"
                    stroke={getProgressColor(Math.round((lotA2W / 1000) * 100))}
                    strokeWidth="1.5"
                  />
                  <text
                    x="95"
                    y="100"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="bold"
                    fill="var(--foreground)"
                  >
                    Two-Wheelers
                  </text>
                  <text
                    x="95"
                    y="120"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="800"
                    fill={getProgressColor(Math.round((lotA2W / 1000) * 100))}
                  >
                    {Math.round((lotA2W / 1000) * 100)}% Full
                  </text>
                  <text
                    x="95"
                    y="140"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="var(--muted-foreground)"
                  >
                    {lotA2W} / 1000 Slots
                  </text>
                </g>
                {/* Four-Wheeler Zone (Right) */}
                <g className="transition-all duration-500">
                  <rect
                    x="230"
                    y="20"
                    width="150"
                    height="210"
                    rx="8"
                    fill={getProgressColor(Math.round((lotA4W / 250) * 100))}
                    fillOpacity="0.15"
                    stroke={getProgressColor(Math.round((lotA4W / 250) * 100))}
                    strokeWidth="1.5"
                  />
                  <text
                    x="305"
                    y="100"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="bold"
                    fill="var(--foreground)"
                  >
                    Four-Wheelers
                  </text>
                  <text
                    x="305"
                    y="120"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="800"
                    fill={getProgressColor(Math.round((lotA4W / 250) * 100))}
                  >
                    {Math.round((lotA4W / 250) * 100)}% Full
                  </text>
                  <text
                    x="305"
                    y="140"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="var(--muted-foreground)"
                  >
                    {lotA4W} / 250 Slots
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
