import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  color?: string; // e.g. text-primary
  bgTint?: string; // e.g. bg-saffron/10
  sub?: string;
  trend?: { up: boolean; text: string };
  valueSuffix?: React.ReactNode;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-foreground",
  bgTint,
  sub,
  trend,
  valueSuffix,
}: StatCardProps) {
  return (
    <div className={`kpi-card group flex flex-col justify-between p-6 relative overflow-hidden bg-card rounded-[24px] border border-border/50 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-400 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5`}>
      {/* Decorative gradient background based on tint */}
      {bgTint && (
        <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl pointer-events-none opacity-40 ${bgTint.replace('/10', '')}`} />
      )}
      
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex flex-col gap-2 items-start">
          <div className="text-[13px] font-bold text-foreground/90 tracking-tight">{label}</div>
          {trend && (
            <span
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide w-fit ${
                trend.up 
                  ? "bg-danger/10 text-danger border border-danger/20" 
                  : "bg-emerald/10 text-emerald border border-emerald/20"
              }`}
            >
              {trend.up ? (
                <TrendingUp size={12} strokeWidth={3} />
              ) : (
                <TrendingDown size={12} strokeWidth={3} />
              )}
              {trend.text}
            </span>
          )}
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-surface border border-border/60 text-muted-foreground shadow-sm transition-all duration-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:shadow-md group-hover:scale-105">
          <Icon size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div className="relative z-10 mt-2">
        <div className={`text-[28px] font-montserrat font-black tracking-tight drop-shadow-sm ${color} tabular-nums leading-none`}>
          {value}
          {valueSuffix && (
            <span className="ml-1.5 text-sm font-bold text-muted-foreground">{valueSuffix}</span>
          )}
        </div>
      </div>

      {sub && (
        <div className="relative z-10 mt-4 flex items-center gap-3">
          <span className="text-[11px] font-bold text-muted-foreground/80 truncate tracking-wide">
            {sub}
          </span>
        </div>
      )}
    </div>
  );
}
