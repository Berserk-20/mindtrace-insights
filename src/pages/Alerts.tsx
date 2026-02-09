import { TopBar } from "@/components/layout/TopBar";
import { AlertTriangle, Info, CheckCircle, Zap, Eye, Clock } from "lucide-react";

const alerts = [
  { id: 1, type: "warning", title: "Extended distraction detected", description: "User showed >15s of continuous distraction during S-1021 at 14:22.", time: "3 min ago", session: "S-1021" },
  { id: 2, type: "error", title: "Frustration spike", description: "Emotion variance exceeded threshold (>0.6) during engagement dip.", time: "12 min ago", session: "S-1021" },
  { id: 3, type: "info", title: "New focus pattern", description: "Recurring peak focus detected between 09:00–11:00 across 5 sessions.", time: "1 hr ago", session: "Multiple" },
  { id: 4, type: "success", title: "Engagement milestone", description: "User maintained >85% engagement for 3 consecutive sessions.", time: "2 hr ago", session: "S-1022" },
  { id: 5, type: "warning", title: "Attention fatigue signal", description: "Gradual attention decline observed after 1h 30m mark in recent sessions.", time: "4 hr ago", session: "S-1020" },
  { id: 6, type: "info", title: "Emotion calibration update", description: "Model recalibrated based on latest 10 sessions. Accuracy improved 2.3%.", time: "6 hr ago", session: "System" },
];

const iconMap = {
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const colorMap = {
  warning: "text-warning border-l-warning",
  error: "text-destructive border-l-destructive",
  info: "text-primary border-l-primary",
  success: "text-success border-l-success",
};

const Alerts = () => {
  return (
    <div className="min-h-screen">
      <TopBar title="Alerts & Events" subtitle="System notifications and behavioral alerts" />

      <div className="p-6 space-y-3">
        {alerts.map((alert) => {
          const Icon = iconMap[alert.type as keyof typeof iconMap];
          const colors = colorMap[alert.type as keyof typeof colorMap];
          return (
            <div key={alert.id} className={`card-surface border-l-2 ${colors.split(" ")[1]} p-4`}>
              <div className="flex items-start gap-3">
                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${colors.split(" ")[0]}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-muted-foreground">{alert.session}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{alert.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
