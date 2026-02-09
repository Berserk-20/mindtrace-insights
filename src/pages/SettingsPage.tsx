import { TopBar } from "@/components/layout/TopBar";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <div className="min-h-screen">
      <TopBar title="Settings" subtitle="Configure MindTrace preferences" />

      <div className="p-6 max-w-2xl space-y-6">
        {/* General */}
        <div className="card-surface p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">General</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Enable notifications</p>
              <p className="text-xs text-muted-foreground">Receive alerts for engagement drops and emotion spikes</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Auto-start session</p>
              <p className="text-xs text-muted-foreground">Begin tracking when webcam is detected</p>
            </div>
            <Switch />
          </div>
        </div>

        {/* Privacy */}
        <div className="card-surface p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Privacy & Data</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Store raw video</p>
              <p className="text-xs text-muted-foreground">Save webcam recordings alongside session data</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Anonymize emotion data</p>
              <p className="text-xs text-muted-foreground">Remove personally identifiable markers from exports</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        {/* Thresholds */}
        <div className="card-surface p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Alert Thresholds</h3>
          <div className="space-y-3">
            {[
              { label: "Distraction alert", desc: "Trigger after N seconds of distraction", value: "8s" },
              { label: "Engagement drop", desc: "Alert when engagement falls below", value: "45%" },
              { label: "Frustration spike", desc: "Alert on variance exceeding", value: "0.6" },
            ].map((t) => (
              <div key={t.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <span className="text-sm font-mono text-primary">{t.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* API */}
        <div className="card-surface p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">API Configuration</h3>
          <div>
            <p className="data-label mb-1">Backend Endpoint</p>
            <div className="h-9 px-3 flex items-center rounded-md border border-border bg-muted/30 text-xs font-mono text-muted-foreground">
              https://api.mindtrace.ai/v1
            </div>
          </div>
          <div>
            <p className="data-label mb-1">WebSocket URL</p>
            <div className="h-9 px-3 flex items-center rounded-md border border-border bg-muted/30 text-xs font-mono text-muted-foreground">
              wss://ws.mindtrace.ai/live
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
