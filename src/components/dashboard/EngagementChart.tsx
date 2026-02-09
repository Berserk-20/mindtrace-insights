import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { engagementData } from "@/lib/mockData";

export function EngagementChart() {
  return (
    <div className="card-surface p-4">
      <h3 className="data-label mb-4">Engagement vs Attention</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 15%)" />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }}
              axisLine={{ stroke: "hsl(225, 15%, 15%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(225, 22%, 9%)",
                border: "1px solid hsl(225, 15%, 15%)",
                borderRadius: "6px",
                fontSize: "11px",
              }}
            />
            <Line type="monotone" dataKey="engagement" stroke="hsl(187, 80%, 48%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="attention" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-[10px] text-muted-foreground">Engagement</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-warning" />
          <span className="text-[10px] text-muted-foreground">Attention</span>
        </div>
      </div>
    </div>
  );
}
