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
  color = "text-slate-900",
  sub,
  trend,
  valueSuffix,
  bgTint,
}: StatCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        border border-slate-200
        bg-white
        p-4
        transition-colors duration-200
        hover:border-red-400
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>

          {trend && (
            <div
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${trend.up
                  ? "bg-red-50 text-red-600"
                  : "bg-blue-50 text-blue-600"
                }`}
            >
              {trend.up ? (
                <TrendingUp size={10} />
              ) : (
                <TrendingDown size={10} />
              )}
              {trend.text}
            </div>
          )}
        </div>

        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${bgTint || 'border-slate-200 bg-slate-50'}`}>
          <Icon size={18} className={bgTint ? "" : "text-slate-700"} />
        </div>
      </div>

      {/* Value */}
      <div className="mt-3">
        <h3
          className={`flex items-end gap-1 text-2xl font-bold tracking-tight ${color}`}
        >
          {value}

          {valueSuffix && (
            <span className="text-xs font-medium text-slate-500">
              {valueSuffix}
            </span>
          )}
        </h3>

        {sub && (
          <p className="mt-1 text-xs text-slate-500">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}