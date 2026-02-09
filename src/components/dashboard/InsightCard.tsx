import { AlertTriangle, Info, CheckCircle } from "lucide-react";

interface InsightCardProps {
  type: "warning" | "info" | "success";
  title: string;
  description: string;
  timestamp: string;
}

const icons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const styles = {
  warning: "border-l-warning text-warning",
  info: "border-l-primary text-primary",
  success: "border-l-success text-success",
};

export function InsightCard({ type, title, description, timestamp }: InsightCardProps) {
  const Icon = icons[type];

  return (
    <div className={`card-surface border-l-2 ${styles[type].split(" ")[0]} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${styles[type].split(" ")[1]}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-medium text-foreground">{title}</h4>
            <span className="text-[10px] font-mono text-muted-foreground">{timestamp}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
