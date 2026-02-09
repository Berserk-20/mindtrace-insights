import { TopBar } from "@/components/layout/TopBar";
import { liveMetrics } from "@/lib/mockData";
import { Radio, Eye, Activity, AlertTriangle, Zap, Clock } from "lucide-react";

const emotionColors: Record<string, string> = {
  Focus: "text-primary",
  Joy: "text-success",
  Neutral: "text-muted-foreground",
  Frustration: "text-destructive",
  Surprise: "text-warning",
};

const eventIcons: Record<string, typeof Activity> = {
  engagement_start: Activity,
  peak_focus: Zap,
  distraction: AlertTriangle,
  emotion_shift: Eye,
};

const LiveSession = () => {
  return (
    <div className="min-h-screen">
      <TopBar
        title="Live Session"
        subtitle="Real-time monitoring active"
      />

      <div className="p-6 space-y-6">
        {/* Status bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">Live</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            Session Duration: {liveMetrics.sessionDuration}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Video Feed */}
          <div className="col-span-2 card-surface overflow-hidden">
            <div className="aspect-video bg-muted/30 flex items-center justify-center relative">
              <div className="text-center">
                <Radio className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Webcam feed</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">Connect camera to begin analysis</p>
              </div>

              {/* Overlay indicators */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm border border-border">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                <span className="text-[10px] font-mono text-foreground">REC</span>
              </div>

              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-background/80 backdrop-blur-sm border border-border">
                <span className={`text-xs font-mono font-semibold ${emotionColors[liveMetrics.currentEmotion]}`}>
                  {liveMetrics.currentEmotion}
                </span>
                <span className="text-[10px] text-muted-foreground ml-1.5">
                  {(liveMetrics.emotionConfidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="space-y-4">
            {/* Engagement Meter */}
            <div className="card-surface p-4">
              <p className="data-label mb-3">Engagement Level</p>
              <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${liveMetrics.engagementLevel}%` }}
                />
              </div>
              <div className="flex items-end justify-between mt-2">
                <span className="metric-value text-foreground">{liveMetrics.engagementLevel}%</span>
                <span className="text-[10px] text-success font-mono">HIGH</span>
              </div>
            </div>

            {/* Attention */}
            <div className="card-surface p-4">
              <p className="data-label mb-3">Attention Score</p>
              <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-warning transition-all duration-1000"
                  style={{ width: `${liveMetrics.attentionScore}%` }}
                />
              </div>
              <div className="flex items-end justify-between mt-2">
                <span className="metric-value text-foreground">{liveMetrics.attentionScore}%</span>
                <span className="text-[10px] text-success font-mono">STABLE</span>
              </div>
            </div>

            {/* Current Emotion */}
            <div className="card-surface p-4">
              <p className="data-label mb-2">Detected Emotion</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className={`text-lg font-semibold ${emotionColors[liveMetrics.currentEmotion]}`}>
                    {liveMetrics.currentEmotion}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Confidence: {(liveMetrics.emotionConfidence * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Timeline */}
        <div className="card-surface p-4">
          <h3 className="data-label mb-4">Session Events</h3>
          <div className="space-y-1">
            {liveMetrics.events.map((event, i) => {
              const Icon = eventIcons[event.type] || Activity;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted/30 transition-colors"
                >
                  <span className="text-[10px] font-mono text-muted-foreground w-16">{event.time}</span>
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${
                    event.type === "distraction" ? "text-warning" :
                    event.type === "peak_focus" ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <span className="text-xs text-foreground">{event.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
