import { useEffect, useState, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { liveMetrics as initialLiveMetrics } from "@/lib/mockData";
import { API_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
  const [metrics, setMetrics] = useState<any>(null);
  const [agentState, setAgentState] = useState<{ running: boolean; paused: boolean }>({ running: false, paused: false });
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [sessionDuration, setSessionDuration] = useState("00:00:00");
  const { toast } = useToast();

  // Timer effect for session duration
  useEffect(() => {
    if (!metrics?.liveMetrics?.sessionStartTime || !agentState.running) {
      setSessionDuration("00:00:00");
      return;
    }

    const startTime = new Date(metrics.liveMetrics.sessionStartTime).getTime();

    const updateDuration = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000); // seconds
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      setSessionDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateDuration();
    const interval = setInterval(updateDuration, 1000);
    return () => clearInterval(interval);
  }, [metrics?.liveMetrics?.sessionStartTime, agentState.running]);

  const runningRef = useRef(false);

  useEffect(() => {
    runningRef.current = agentState.running;
  }, [agentState.running]);

  useEffect(() => {
    const loadMetrics = async () => {
      const data = await fetchMetrics();
      if (data) {
        setMetrics(data);
        // Sync local state if backend says running
        if (data.agentRunning !== undefined && data.agentRunning !== agentState.running) {
          setAgentState(prev => ({ ...prev, running: data.agentRunning }));
        }
      }
    };

    loadMetrics();
    const interval = setInterval(loadMetrics, 1000); // Poll every second

    return () => {
      clearInterval(interval);
      // Auto-stop session when leaving the page to ensure data is saved
      if (runningRef.current) {
        stopSession().then(() => {
          toast({ title: "Session ended & saved", description: "Navigating away automatically saves your session data." });
        });
      }
    };
  }, []);

  const liveData = metrics?.liveMetrics || initialLiveMetrics;

  return (
    <div className="min-h-screen">
      <TopBar
        title="Live Session"
        subtitle="Real-time monitoring"
      />

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">{agentState.running ? (agentState.paused ? "Paused" : "Live") : "Stopped"}</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            Session Duration: {sessionDuration}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Button
              size="sm"
              onClick={async () => {
                const res = await startSession();
                setAgentState({ running: res.agent_running, paused: false });
                // Fetch fresh metrics to get session start time
                const data = await fetchMetrics();
                if (data) setMetrics(data);
                toast({ title: "Session started" });
              }}
              disabled={agentState.running && !agentState.paused}
            >
              Start
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={async () => {
                const res = await pauseSession();
                setAgentState((s) => ({ running: true, paused: res.paused }));
                toast({ title: "Session paused" });
              }}
              disabled={!agentState.running || agentState.paused}
            >
              Pause
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={async () => {
                const res = await resumeSession();
                setAgentState((s) => ({ running: true, paused: res.paused }));
                toast({ title: "Session resumed" });
              }}
              disabled={!agentState.running || !agentState.paused}
            >
              Resume
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                const res = await stopSession();
                setAgentState({ running: res.agent_running, paused: false });
                toast({ title: "Session stopped" });
              }}
              disabled={!agentState.running}
            >
              Stop
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Video Feed */}
          <div className="card-surface overflow-hidden max-w-5xl mx-auto w-full">
            <div className="aspect-video bg-muted/30 flex items-center justify-center relative">
              {agentState.running ? (
                <>
                  {/* Live Video Feed */}
                  <img
                    src={`${API_BASE_URL}/video`}
                    alt="Live Camera Feed"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoad={() => setVideoAvailable(true)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      setVideoAvailable(false);
                    }}
                  />

                  {!videoAvailable && (
                    <div className="text-center z-0">
                      <Radio className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Webcam feed unavailable</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">Check backend connection</p>
                    </div>
                  )}

                  {/* Overlay indicators */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm border border-border z-10">
                    <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                    <span className="text-[10px] font-mono text-foreground">REC</span>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Radio className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-foreground font-medium">Session Not Started</p>
                  <p className="text-xs text-muted-foreground mt-1">Click Start to begin monitoring</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
