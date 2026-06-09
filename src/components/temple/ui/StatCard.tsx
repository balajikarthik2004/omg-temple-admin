import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  color?: string;
  sub?: string;
  trend?: { up: boolean; text: string };
  valueSuffix?: React.ReactNode;
  bgTint?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-foreground",
  sub,
  trend,
  valueSuffix,
  bgTint,
}: StatCardProps) {
  
  // Safely map text colors to background and gradient colors for Tailwind JIT
  let glowClass = "from-primary/20 to-primary/0";
  let lineClass = "bg-primary";
  
  if (color.includes("emerald")) {
    glowClass = "from-emerald-500/20 to-emerald-500/0";
    lineClass = "bg-emerald-500";
  } else if (color.includes("amber")) {
    glowClass = "from-amber-500/20 to-amber-500/0";
    lineClass = "bg-amber-500";
  } else if (color.includes("indigo")) {
    glowClass = "from-indigo-500/20 to-indigo-500/0";
    lineClass = "bg-indigo-500";
  } else if (color.includes("red")) {
    glowClass = "from-red-500/20 to-red-500/0";
    lineClass = "bg-red-500";
  } else if (color.includes("blue")) {
    glowClass = "from-blue-500/20 to-blue-500/0";
    lineClass = "bg-blue-500";
  }

  return (
    <div className="relative group overflow-hidden rounded-3xl border border-border/50 bg-white/60 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Decorative Glow Blob */}
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${glowClass} opacity-50 blur-[40px] transition-all duration-500 group-hover:scale-150 group-hover:opacity-100`} />

      {/* Header (Icon + Trend) */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${bgTint || 'bg-white border border-border/50 text-muted-foreground'}`}>
          <Icon size={22} className={bgTint ? "" : "text-slate-700"} />
        </div>

        {trend && (
          <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm ${trend.up ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.text}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
          {label}
        </div>
        
        <h3 className={`flex items-baseline gap-1 text-2xl font-black tracking-tight ${color} tabular-nums drop-shadow-sm`}>
          {value}
          {valueSuffix && (
            <span className="text-xs font-bold text-muted-foreground tracking-normal">
              {valueSuffix}
            </span>
          )}
        </h3>

        {sub && (
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">
            {sub}
          </p>
        )}
      </div>

      {/* Animated Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 h-1 w-0 ${lineClass} transition-all duration-500 group-hover:w-full opacity-80`} />
    </div>
  );
}