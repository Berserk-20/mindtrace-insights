import { TopBar } from "@/components/layout/TopBar";
import { emotionDistribution, emotionTransitions, emotionTimelineData } from "@/lib/mockData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ArrowRight } from "lucide-react";

const emotionDescriptions: Record<string, string> = {
  Joy: "Associated with positive engagement and intrinsic motivation. Correlates with higher retention rates.",
  Focus: "Deep concentration state. Optimal for learning and complex task completion.",
  Neutral: "Baseline emotional state. May indicate passive engagement or habitual behavior.",
  Surprise: "Heightened alertness. Often precedes curiosity or confusion depending on context.",
  Frustration: "Cognitive friction state. May signal difficulty or poor UX. Monitor for disengagement.",
};

const EmotionAnalytics = () => {
  // Per-session dominant emotion bar data
  const sessionEmotions = [
    { session: "S-1024", Focus: 45, Joy: 25, Neutral: 15, Frustration: 10, Surprise: 5 },
    { session: "S-1023", Focus: 30, Joy: 15, Neutral: 35, Frustration: 12, Surprise: 8 },
    { session: "S-1022", Focus: 20, Joy: 50, Neutral: 18, Frustration: 5, Surprise: 7 },
    { session: "S-1021", Focus: 15, Joy: 10, Neutral: 20, Frustration: 42, Surprise: 13 },
    { session: "S-1020", Focus: 40, Joy: 22, Neutral: 20, Frustration: 10, Surprise: 8 },
  ];

  return (
    <div className="min-h-screen">
      <TopBar title="Emotion Analytics" subtitle="Emotion patterns and psychological insights" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Distribution Pie */}
          <div className="card-surface p-4">
            <h3 className="data-label mb-4">Emotion Distribution</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {emotionDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(225, 22%, 9%)",
                      border: "1px solid hsl(225, 15%, 15%)",
                      borderRadius: "6px",
                      fontSize: "11px",
                    }}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {emotionDistribution.map((e) => (
                <div key={e.emotion} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: e.color }} />
                    <span className="text-xs text-foreground">{e.emotion}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{e.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Per-Session Stacked Bar */}
          <div className="col-span-2 card-surface p-4">
            <h3 className="data-label mb-4">Dominant Emotion Per Session</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionEmotions} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 15%)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="session"
                    tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(225, 22%, 9%)",
                      border: "1px solid hsl(225, 15%, 15%)",
                      borderRadius: "6px",
                      fontSize: "11px",
                    }}
                  />
                  <Bar dataKey="Focus" stackId="a" fill="hsl(187, 80%, 48%)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Joy" stackId="a" fill="hsl(152, 60%, 45%)" />
                  <Bar dataKey="Neutral" stackId="a" fill="hsl(215, 15%, 50%)" />
                  <Bar dataKey="Frustration" stackId="a" fill="hsl(0, 72%, 51%)" />
                  <Bar dataKey="Surprise" stackId="a" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Transitions + Tooltips */}
        <div className="grid grid-cols-2 gap-4">
          {/* Transitions */}
          <div className="card-surface p-4">
            <h3 className="data-label mb-4">Emotion Transitions</h3>
            <div className="space-y-2">
              {emotionTransitions.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-foreground font-medium">{t.from}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="text-foreground font-medium">{t.to}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{ width: `${(t.count / 42) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-6 text-right">{t.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Psychological Meanings */}
          <div className="card-surface p-4">
            <h3 className="data-label mb-4">Emotion Glossary</h3>
            <div className="space-y-3">
              {Object.entries(emotionDescriptions).map(([emotion, desc]) => {
                const dist = emotionDistribution.find((e) => e.emotion === emotion);
                return (
                  <div key={emotion} className="p-3 rounded-md bg-muted/30">
                    <div className="flex items-center gap-2 mb-1">
                      {dist && (
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: dist.color }} />
                      )}
                      <span className="text-sm font-medium text-foreground">{emotion}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionAnalytics;
