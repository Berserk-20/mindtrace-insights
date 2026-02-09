import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  label: string;
  value: number | string;
  change: number;
  index?: number;
}

export function KPICard({ label, value, change, index = 0 }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div
      className={`card-surface p-4 animate-fade-up stagger-${index + 1}`}
    >
      <p className="data-label mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <span className="metric-value text-foreground">{value}</span>
        <div
          className={`flex items-center gap-1 text-xs font-mono ${
            isPositive ? "text-success" : "text-destructive"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{isPositive ? "+" : ""}{change}</span>
        </div>
      </div>
    </div>
  );
}
