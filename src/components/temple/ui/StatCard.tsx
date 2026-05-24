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
    <div className={`kpi-card group flex flex-col justify-between p-6 ${bgTint || 'bg-white/80'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-xs font-bold text-muted-foreground">{label}</div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border text-muted-foreground transition-colors group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20">
          <Icon size={14} />
        </div>
      </div>
      <div>
        <div className={`text-2xl font-montserrat font-bold tracking-tight ${color} tabular-nums`}>
          {value}
          {valueSuffix && <span className="ml-1 text-sm font-normal text-muted-foreground">{valueSuffix}</span>}
        </div>
      </div>
      {(trend || sub) && (
        <div className="mt-4 flex items-center gap-2">
          {trend && (
            <span
              className={`flex items-center gap-0.5 text-[11px] font-bold ${trend.up ? "text-danger" : "text-emerald"}`}
            >
              {trend.up ? (
                <TrendingUp size={12} strokeWidth={2.5} />
              ) : (
                <TrendingDown size={12} strokeWidth={2.5} />
              )}
              {trend.text}
            </span>
          )}
          {sub && <span className="text-[11px] font-medium text-muted-foreground truncate">{sub}</span>}
        </div>
      )}
    </div>
  );
}
