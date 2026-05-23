import { useState, useEffect } from "react";
import { CCTV_CAMERAS, statusColor } from "@/lib/temple-data";
import { useLiveClock } from "@/lib/use-live";
import { Maximize2, Camera, Bell, ZoomIn, Search, Image as ImageIcon, ScanFace, UploadCloud, UserSearch, Target, Activity } from "lucide-react";
import { toast } from "sonner";

const alerts = [
  { cam: "CAM-P02", color: "danger", time: "14:28", msg: "Queue Lane A overcrowding detected. Density exceeds safe limit." },
  { cam: "CAM-P01", color: "status-busy", time: "14:15", msg: "Rapid crowd inflow surge at Main Gopuram. +42 people in last 3 minutes." },
];

const matchResults = [
  { cam: "CAM-P04", name: "Inner Sanctum Approach", time: "14:32:15", conf: 98, status: "High Match" },
  { cam: "CAM-P02", name: "Queue Lane A", time: "14:15:02", conf: 84, status: "Possible Match" },
  { cam: "CAM-P12", name: "Footwear Counter", time: "13:58:44", conf: 76, status: "Low Confidence" },
];

function FakeFeed({ idx, status, scanOverlay = false }: { idx: number; status: string, scanOverlay?: boolean }) {
  const boxes = Array.from({ length: status === "CROWDED" ? 8 : status === "BUSY" ? 5 : 3 }).map((_, i) => ({
    x: 10 + ((idx * 17 + i * 23) % 75),
    y: 15 + ((idx * 11 + i * 19) % 60),
    w: 8 + ((i * 3) % 6),
    h: 14 + ((i * 5) % 8),
  }));

  const aiLabels = ["Adult · 98%", "Person · 94%", "Youth · 88%", "Person · 99%", "Elderly · 76%", "Adult · 82%"];

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black ring-1 ring-border shadow-inner">
      <video 
        src={idx % 2 === 0 ? "https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-crossing-a-street-in-the-city-4361-small.mp4" : "https://assets.mixkit.co/videos/preview/mixkit-commuters-walking-in-a-subway-station-4180-small.mp4"}
        autoPlay loop muted playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale brightness-75"
      />
      <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0, transparent 60%)" }} />
      
      {boxes.map((b, i) => {
        return (
          <div key={i} className="animate-track absolute border border-saffron/70" style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${5 + (i % 4)}s` }}>
            <div className="absolute -top-3 left-0 bg-saffron/90 px-1 py-[1px] text-[6px] font-bold text-white whitespace-nowrap">ID:{idx}{i}</div>
          </div>
        );
      })}

      {scanOverlay && (
        <div className="absolute inset-0 z-10 bg-info/10">
          <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,191,255,0.1)_50%)] bg-[length:100%_4px] mix-blend-screen opacity-50" />
          <div className="absolute left-0 right-0 h-0.5 bg-info/60 shadow-[0_0_10px_rgba(0,191,255,0.8)] animate-scan" />
        </div>
      )}

      <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded-sm bg-black/60 px-2 py-0.5 text-[9px] font-semibold tracking-widest text-white backdrop-blur-md">
        <span className="blink-rec h-1.5 w-1.5 rounded-full bg-danger shadow-[0_0_5px_rgba(255,0,0,0.8)]" /> REC
      </div>
      {/* <div className="absolute right-2 top-2 rounded-sm bg-emerald/90 px-1.5 py-0.5 text-[8px] font-bold tracking-widest text-white shadow-sm">
        AI TRACKING
      </div> */}
    </div>
  );
}

export function CCTVSection() {
  const now = useLiveClock();
  const timeStr = now.toLocaleTimeString("en-IN", { hour12: false });
  const [tab, setTab] = useState<"live" | "search">("live");
  const [searchState, setSearchState] = useState<"idle" | "scanning" | "results">("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [targetImage, setTargetImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTargetImage(reader.result as string);
        setSearchState("scanning");
        setScanProgress(0);
        toast.success("Subject image acquired. Deep scanning 12 active feeds...");
      };
      reader.readAsDataURL(file);
    }
  };

  const resetSearch = () => {
    setSearchState("idle");
    setScanProgress(0);
    setTargetImage(null);
  };

  useEffect(() => {
    if (searchState === "scanning") {
      const interval = setInterval(() => {
        setScanProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setSearchState("results");
            toast.success("Scan complete. 3 potential matches found.");
            return 100;
          }
          return Math.min(100, p + Math.floor(Math.random() * 12) + 4);
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [searchState]);

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-bold tracking-tight text-foreground">Command Center</div>
          <div className="mt-1 flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5 text-emerald"><span className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_5px_rgba(16,185,129,0.6)]" /> 12 Active</span>
            <span>0 Offline</span>
            <span className="flex items-center gap-1.5"><span className="blink-rec h-1.5 w-1.5 rounded-full bg-danger shadow-[0_0_5px_rgba(255,0,0,0.6)]" /> Recording All</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface p-1">
          <button onClick={() => setTab("live")} className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-bold transition-all ${tab === "live" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            <Activity size={14} /> Live Grid
          </button>
          <button onClick={() => setTab("search")} className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-bold transition-all ${tab === "search" ? "bg-card text-foreground shadow-sm ring-1 ring-info/50 text-info" : "text-muted-foreground hover:text-foreground"}`}>
            <ScanFace size={14} /> AI Person Search
          </button>
        </div>
      </div>

      {tab === "live" ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          {/* Camera Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CCTV_CAMERAS.map((c, i) => (
              <div key={c.id} className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:border-border/80 hover:shadow-md">
                <FakeFeed idx={i} status={c.status} />
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-bold tracking-wider text-muted-foreground">{c.id}</div>
                    <div className="mt-0.5 text-[13px] font-semibold text-foreground leading-tight">{c.name}</div>
                  </div>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${statusColor(c.status)}`}>{c.status}</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2.5 text-[11px] font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5"><UserSearch size={12}/> {c.type === "people" ? `${c.count} detected` : `${c.count} vehicles`}</span>
                  <span className="font-mono">{timeStr}</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  {[ZoomIn, Camera, Bell, Maximize2].map((Icon, j) => (
                    <button key={j} className="flex h-7 items-center justify-center rounded-md bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground border border-border/50">
                      <Icon size={12} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Total Detected", v: "1,739", c: "text-saffron" },
                { l: "In Queues", v: "398", c: "text-info" },
                { l: "Anomalies", v: "2", c: "text-danger" },
                { l: "Avg Density", v: "63%", c: "text-status-busy" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <div className={`mt-1.5 text-xl font-bold tracking-tight ${s.c} tabular-nums`}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm flex-1">
              <div className="mb-4 text-sm font-bold text-foreground">Critical Alerts</div>
              <div className="space-y-3">
                {alerts.map((a, i) => (
                  <div key={i} className={`rounded-lg border border-${a.color}/30 bg-${a.color}/10 p-3 text-xs`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold tracking-wider text-${a.color}`}>{a.cam}</span>
                      <span className="font-mono text-muted-foreground">{a.time}</span>
                    </div>
                    <div className="mt-1.5 font-medium leading-relaxed text-foreground/90">{a.msg}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* AI Person Search Tab */
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          
          {/* Upload & Controls */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground">AI Facial Search</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">Upload a clear photo of a person. The AI will scan the last 24 hours of footage across all 12 cameras.</p>
            </div>

            {searchState === "idle" ? (
              <label className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-surface/50 px-6 py-10 transition-all hover:border-info/50 hover:bg-info/5 cursor-pointer relative overflow-hidden">
                <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                <div className="rounded-full bg-surface p-4 shadow-sm transition-transform group-hover:scale-110">
                  <UploadCloud size={32} className="text-muted-foreground group-hover:text-info" />
                </div>
                <div className="mt-4 text-sm font-bold text-foreground">Click to upload target photo</div>
                <div className="mt-1 text-[11px] text-muted-foreground">Select a JPG, PNG, or WEBP file</div>
              </label>
            ) : (
              <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-6">
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-info shadow-[0_0_20px_rgba(0,191,255,0.3)] bg-card">
                  {targetImage ? (
                    <img src={targetImage} alt="Target Subject" className="h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <UserSearch size={48} className="text-muted-foreground opacity-50" />
                    </div>
                  )}
                  {searchState === "scanning" && (
                     <div className="absolute left-0 right-0 h-1 bg-info shadow-[0_0_15px_#00bfff] animate-scan mix-blend-screen opacity-80" />
                  )}
                </div>
                <div className="mt-6 w-full text-center">
                  <div className="text-sm font-bold text-foreground">Target Subject Acquired</div>
                  <div className="mt-1 text-xs text-info font-medium">Tracking ID: SUB-8942-A</div>
                </div>
                {searchState === "results" && (
                  <button onClick={resetSearch} className="mt-6 w-full rounded-md border border-border bg-card px-4 py-2 text-xs font-bold transition-colors hover:bg-muted">New Search</button>
                )}
              </div>
            )}
          </div>

          {/* Scanning & Results View */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm min-h-[500px] flex flex-col">
            {searchState === "idle" && (
              <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                <Target size={48} className="mb-4 text-border" />
                <div className="text-sm font-bold text-muted-foreground">Awaiting Target Image</div>
                <div className="mt-1 text-xs text-muted-foreground/70">Upload a photo to begin deep scanning network</div>
              </div>
            )}

            {searchState === "scanning" && (
              <div className="flex h-full flex-col justify-center">
                <div className="mb-8 flex items-center justify-between text-sm font-bold text-info">
                  <span className="flex items-center gap-2"><ScanFace size={16} className="animate-pulse" /> Deep Scanning All Feeds...</span>
                  <span className="tabular-nums">{scanProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface overflow-hidden">
                  <div className="h-full bg-info rounded-full shadow-[0_0_10px_rgba(0,191,255,0.6)] transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                </div>
                
                <div className="mt-12 grid grid-cols-4 gap-4 opacity-50">
                   {CCTV_CAMERAS.slice(0, 4).map((c, i) => (
                     <div key={i} className="opacity-70 grayscale">
                        <FakeFeed idx={i} status="NORMAL" scanOverlay={true} />
                        <div className="mt-2 text-center text-[9px] font-mono text-muted-foreground">SCANNING {c.id}...</div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {searchState === "results" && (
              <div className="flex h-full flex-col">
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                  <div className="text-lg font-bold text-foreground">Match Results</div>
                  <div className="rounded-full bg-info/10 px-3 py-1 text-xs font-bold text-info border border-info/30">3 Matches Found</div>
                </div>

                <div className="space-y-4">
                  {matchResults.map((m, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:shadow-md hover:border-info/30 group">
                      <div className="w-full sm:w-48 shrink-0">
                         <FakeFeed idx={i+5} status="NORMAL" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                         <div className="flex items-start justify-between">
                            <div>
                               <div className="font-bold text-foreground text-sm">{m.name}</div>
                               <div className="mt-1 text-xs font-mono text-muted-foreground">{m.cam} • {m.time}</div>
                            </div>
                            <div className="flex flex-col items-end">
                               <div className={`text-lg font-bold tabular-nums ${m.conf > 90 ? "text-emerald" : m.conf > 80 ? "text-saffron" : "text-status-busy"}`}>{m.conf}%</div>
                               <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Confidence</div>
                            </div>
                         </div>
                         <div className="mt-3 flex gap-2">
                           <button className="flex items-center gap-1.5 rounded bg-info px-3 py-1.5 text-[10px] font-bold text-white shadow-sm transition-opacity hover:opacity-90"><ZoomIn size={12}/> View Frame</button>
                           <button className="flex items-center gap-1.5 rounded border border-border bg-card px-3 py-1.5 text-[10px] font-bold text-foreground transition-colors hover:bg-muted">Track Route</button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
