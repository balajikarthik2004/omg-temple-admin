export const TEMPLES = [
  {
    id: "palani",
    name: "Palani Murugan Temple",
    short: "Palani",
    weather: "34°C ☀",
    district: "Dindigul",
  },
  {
    id: "meenakshi",
    name: "Meenakshi Amman Temple",
    short: "Madurai",
    weather: "33°C ☀",
    district: "Madurai",
  },
  {
    id: "srirangam",
    name: "Ranganathaswamy Temple",
    short: "Srirangam",
    weather: "32°C ⛅",
    district: "Tiruchirappalli",
  },
  {
    id: "tiruvannamalai",
    name: "Annamalaiyar Temple",
    short: "Tiruvannamalai",
    weather: "31°C ☀",
    district: "Tiruvannamalai",
  },
  {
    id: "rameswaram",
    name: "Ramanathaswamy Temple",
    short: "Rameswaram",
    weather: "30°C ☀",
    district: "Ramanathapuram",
  },
  {
    id: "chidambaram",
    name: "Nataraja Temple",
    short: "Chidambaram",
    weather: "32°C ⛅",
    district: "Cuddalore",
  },
  {
    id: "tiruchendur",
    name: "Tiruchendur Murugan Temple",
    short: "Tiruchendur",
    weather: "31°C ☀",
    district: "Thoothukudi",
  },
  {
    id: "samayapuram",
    name: "Samayapuram Mariamman",
    short: "Samayapuram",
    weather: "33°C ☀",
    district: "Tiruchirappalli",
  },
  {
    id: "kapaleeshwarar",
    name: "Kapaleeshwarar Temple",
    short: "Chennai",
    weather: "34°C ☀",
    district: "Chennai",
  },
  {
    id: "brihadeeswarar",
    name: "Brihadeeswarar Temple",
    short: "Thanjavur",
    weather: "33°C ☀",
    district: "Thanjavur",
  },
];

export type Temple = (typeof TEMPLES)[number];

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "Home" },
  // { id: "darshan", label: "Special Darshan", icon: "Ticket" },
  { id: "heatmap", label: "AI Heatmap", icon: "Flame" },
  { id: "cctv", label: "CCTV Monitor", icon: "Video" },
  // { id: "queue", label: "Queue Management", icon: "Timer" },
  { id: "staff", label: "Volunteer Staff", icon: "UsersRound" },
  { id: "operations", label: "Temple Operations", icon: "Landmark" },
  { id: "parking", label: "Parking", icon: "Car" },
  { id: "donations", label: "Donations & Funds", icon: "IndianRupee" },
  // { id: "announcements", label: "Announcements", icon: "Megaphone" },
  // { id: "analytics", label: "Analytics", icon: "BarChart3" },
  // { id: "emergency", label: "Emergency", icon: "Siren" },
] as const;

export type SectionId = (typeof NAV_ITEMS)[number]["id"];

export const STAFF = [
  {
    id: "S-001",
    name: "Murugan K.",
    role: "Queue Marshal",
    zone: "Lane A",
    status: "duty",
    since: "10:00 AM",
  },
  {
    id: "S-002",
    name: "Selvi R.",
    role: "Volunteer",
    zone: "Lane B",
    status: "duty",
    since: "10:00 AM",
  },
  {
    id: "S-003",
    name: "Arun P.",
    role: "Senior Marshal",
    zone: "Gopuram",
    status: "duty",
    since: "06:00 AM",
  },
  {
    id: "S-004",
    name: "Priya S.",
    role: "Volunteer",
    zone: "Break Room",
    status: "break",
    since: "13:45",
  },
  {
    id: "S-005",
    name: "Karthik V.",
    role: "Queue Marshal",
    zone: "Lane C",
    status: "duty",
    since: "08:00 AM",
  },
  {
    id: "S-006",
    name: "Lakshmi N.",
    role: "Volunteer",
    zone: "Prasad Counter",
    status: "duty",
    since: "09:00 AM",
  },
  {
    id: "S-007",
    name: "Raja M.",
    role: "Security",
    zone: "North Gate",
    status: "duty",
    since: "06:00 AM",
  },
  {
    id: "S-008",
    name: "Devi A.",
    role: "Volunteer",
    zone: "Footwear",
    status: "duty",
    since: "07:00 AM",
  },
  {
    id: "S-009",
    name: "Senthil B.",
    role: "Parking Marshal",
    zone: "Lot A",
    status: "duty",
    since: "06:00 AM",
  },
  {
    id: "S-010",
    name: "Kavitha R.",
    role: "Volunteer",
    zone: "Lane A",
    status: "duty",
    since: "10:00 AM",
  },
  {
    id: "S-011",
    name: "Ganesh T.",
    role: "Senior Marshal",
    zone: "Sanctum",
    status: "duty",
    since: "06:00 AM",
  },
  {
    id: "S-012",
    name: "Anitha P.",
    role: "Volunteer",
    zone: "Break Room",
    status: "break",
    since: "14:00",
  },
  {
    id: "S-013",
    name: "Vimal K.",
    role: "Security",
    zone: "South Gate",
    status: "duty",
    since: "08:00 AM",
  },
  {
    id: "S-014",
    name: "Meena S.",
    role: "Volunteer",
    zone: "VIP Lane",
    status: "duty",
    since: "10:00 AM",
  },
  {
    id: "S-015",
    name: "Suresh R.",
    role: "Queue Marshal",
    zone: "Lane B",
    status: "duty",
    since: "10:00 AM",
  },
  {
    id: "S-016",
    name: "Radha M.",
    role: "Volunteer",
    zone: "Prasad Counter",
    status: "off",
    since: "—",
  },
  {
    id: "S-017",
    name: "Mani P.",
    role: "Parking Marshal",
    zone: "Lot B",
    status: "duty",
    since: "08:00 AM",
  },
  {
    id: "S-018",
    name: "Jaya L.",
    role: "Volunteer",
    zone: "Information",
    status: "duty",
    since: "09:00 AM",
  },
  {
    id: "S-019",
    name: "Bala K.",
    role: "Security",
    zone: "East Gate",
    status: "break",
    since: "13:50",
  },
  {
    id: "S-020",
    name: "Uma D.",
    role: "Senior Marshal",
    zone: "Lane A",
    status: "duty",
    since: "06:00 AM",
  },
];

export const CCTV_CAMERAS = [
  { id: "CAM-P01", name: "Main Gopuram Entrance", count: 187, type: "people", status: "BUSY" },
  { id: "CAM-P02", name: "Queue Lane A", count: 220, type: "people", status: "CROWDED" },
  { id: "CAM-P03", name: "Queue Lane B", count: 178, type: "people", status: "BUSY" },
  { id: "CAM-P04", name: "Inner Sanctum Approach", count: 145, type: "people", status: "NORMAL" },
  { id: "CAM-P05", name: "Prasad Counter", count: 62, type: "people", status: "NORMAL" },
  { id: "CAM-P06", name: "Parking Lot A", count: 640, type: "vehicles", status: "BUSY" },
  { id: "CAM-P07", name: "North Gate", count: 94, type: "people", status: "NORMAL" },
  { id: "CAM-P08", name: "South Gate", count: 78, type: "people", status: "NORMAL" },
  { id: "CAM-P09", name: "VIP Darshan Lane", count: 34, type: "people", status: "NORMAL" },
  { id: "CAM-P10", name: "Emergency Exit (North)", count: 0, type: "people", status: "CLEAR" },
  { id: "CAM-P11", name: "Temple Office Area", count: 12, type: "people", status: "NORMAL" },
  { id: "CAM-P12", name: "Footwear Counter", count: 89, type: "people", status: "NORMAL" },
];

export const ZONES = [
  { name: "Main Gopuram Entry", capacity: 500, current: 380, status: "BUSY", action: "Open Lane" },
  { name: "Queue Lane A", capacity: 800, current: 620, status: "BUSY", action: "Extend Lane" },
  { name: "Queue Lane B", capacity: 800, current: 540, status: "MODERATE", action: "Monitor" },
  { name: "Inner Sanctum", capacity: 200, current: 145, status: "MODERATE", action: "Monitor" },
  { name: "Prasad Counter", capacity: 150, current: 90, status: "NORMAL", action: "—" },
  { name: "Parking Lot A", capacity: 800, current: 640, status: "BUSY", action: "Overflow Alert" },
  { name: "Parking Lot B", capacity: 500, current: 340, status: "MODERATE", action: "Monitor" },
  { name: "Emergency Exit", capacity: 0, current: 0, status: "CLEAR", action: "—" },
];

export const POOJAS = [
  {
    time: "5:30 AM",
    name: "Ushathkala Pooja (Dawn)",
    status: "done",
    desc: "Early morning worship with Gomotha Pooja to start the day.",
  },
  {
    time: "8:00 AM",
    name: "Kalasandhi Pooja",
    status: "done",
    desc: "Elaborate morning rituals; main vibhuti (sacred ash) is distributed.",
  },
  {
    time: "12:00 PM",
    name: "Uchikala Pooja",
    status: "done",
    desc: "Midday worship with vibrant Vedic chants and offerings.",
  },
  {
    time: "5:30 PM",
    name: "Sayaratchai Pooja (Evening)",
    status: "live",
    desc: "Sunset pooja; a tranquil time for reflection.",
  },
  {
    time: "7:30 PM",
    name: "Irandam Kala Pooja (Second)",
    status: "upcoming",
    desc: "Evening rituals and second-phase night prayers.",
  },
  {
    time: "9:00 PM",
    name: "Arthajama Pooja (Night)",
    status: "upcoming",
    desc: "The final pooja before the temple doors are closed for the night.",
  },
];

export const statusColor = (s: string) => {
  const map: Record<string, string> = {
    NORMAL: "bg-status-normal/15 text-status-normal border-status-normal/30",
    MODERATE: "bg-status-busy/15 text-status-busy border-status-busy/30",
    BUSY: "bg-status-crowded/15 text-status-crowded border-status-crowded/30",
    CROWDED: "bg-status-crowded/15 text-status-crowded border-status-crowded/30",
    CRITICAL: "bg-status-critical/15 text-status-critical border-status-critical/30",
    CLEAR: "bg-status-normal/15 text-status-normal border-status-normal/30",
  };
  return map[s] ?? map.NORMAL;
};

export const densityColor = (pct: number) => {
  if (pct >= 80) return "var(--status-critical)";
  if (pct >= 60) return "var(--status-crowded)";
  if (pct >= 40) return "var(--status-busy)";
  return "var(--status-normal)";
};
