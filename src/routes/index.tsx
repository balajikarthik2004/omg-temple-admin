import { createFileRoute } from "@tanstack/react-router";
import { TempleShell } from "@/components/temple/TempleShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OMG Smart Temple — Admin Dashboard" },
      { name: "description", content: "Temple admin operations dashboard: live crowd, AI heatmap, CCTV, queues, staff and emergencies." },
    ],
  }),
  component: TempleShell,
});
