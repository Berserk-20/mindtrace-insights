import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { emotionTimelineData } from "@/lib/mockData";

export function EmotionTimeline() {
  return (
    <div className="card-surface p-4">
      <h3 className="data-label mb-4">Emotion Timeline</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={emotionTimelineData}>
            <defs>
              <linearGradient id="gradFocus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradJoy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradFrustration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 15%)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }}
              axisLine={{ stroke: "hsl(225, 15%, 15%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(225, 22%, 9%)",
                border: "1px solid hsl(225, 15%, 15%)",
                borderRadius: "6px",
                fontSize: "11px",
              }}
            />
            <Area type="monotone" dataKey="focus" stroke="hsl(187, 80%, 48%)" fill="url(#gradFocus)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="joy" stroke="hsl(152, 60%, 45%)" fill="url(#gradJoy)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="frustration" stroke="hsl(0, 72%, 51%)" fill="url(#gradFrustration)" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3">
        {[
          { label: "Focus", color: "bg-primary" },
          { label: "Joy", color: "bg-success" },
          { label: "Frustration", color: "bg-destructive" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${l.color}`} />
            <span className="text-[10px] text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
