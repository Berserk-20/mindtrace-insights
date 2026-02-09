import { TopBar } from "@/components/layout/TopBar";
import { KPICard } from "@/components/dashboard/KPICard";
import { EmotionTimeline } from "@/components/dashboard/EmotionTimeline";
import { EngagementChart } from "@/components/dashboard/EngagementChart";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { kpiData, insights, sessions } from "@/lib/mockData";
import { Clock, Users } from "lucide-react";

const Dashboard = () => {
  const kpis = [
    kpiData.engagementScore,
    kpiData.focusStability,
    kpiData.emotionVariance,
    kpiData.distractionIndex,
  ];

  return (
    <div className="min-h-screen">
      <TopBar title="Dashboard" subtitle="Real-time behavioral intelligence" />

      <div className="p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <KPICard key={kpi.label} {...kpi} index={i} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-4">
          <EmotionTimeline />
          <EngagementChart />
        </div>

        {/* Bottom Row: Insights + Recent Sessions */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 space-y-3">
            <h3 className="data-label">AI Insights</h3>
            {insights.map((insight) => (
              <InsightCard key={insight.id} {...insight} />
            ))}
          </div>

          <div className="col-span-2 card-surface p-4">
            <h3 className="data-label mb-3">Recent Sessions</h3>
            <div className="space-y-2">
              {sessions.slice(0, 5).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">{session.id}</span>
                    <div>
                      <p className="text-xs text-foreground">{session.dominantEmotion}</p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {session.duration}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono text-foreground">{session.engagement}%</span>
                    <div
                      className={`text-[10px] font-mono ${
                        session.status === "flagged" ? "text-warning" : "text-success"
                      }`}
                    >
                      {session.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
