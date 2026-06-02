import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  HeartHandshake,
  Landmark,
  PiggyBank,
  History,
  QrCode,
  ArrowRightLeft,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { StatCard } from "../ui/StatCard";

const donationTrend = [
  { time: "Mon", amount: 45000 },
  { time: "Tue", amount: 52000 },
  { time: "Wed", amount: 48000 },
  { time: "Thu", amount: 61000 },
  { time: "Fri", amount: 85000 },
  { time: "Sat", amount: 145000 },
  { time: "Sun", amount: 168000 },
];

const fundsBreakdown = [
  { name: "Annadhanam", amount: 420000 },
  { name: "Hundi Collection", amount: 280000 },
  { name: "Building Fund", amount: 150000 },
  { name: "General Donation", amount: 95000 },
];

const recentTransactions = [
  {
    id: "TRX-8923",
    donor: "Ramesh K.",
    fund: "Annadhanam",
    amount: 5000,
    type: "UPI",
    time: "10 mins ago",
    status: "Completed",
  },
  {
    id: "TRX-8924",
    donor: "Anonymous",
    fund: "Hundi",
    amount: 500,
    type: "Cash",
    time: "25 mins ago",
    status: "Completed",
  },
  {
    id: "TRX-8925",
    donor: "Lakshmi S.",
    fund: "Building Fund",
    amount: 25000,
    type: "Bank Transfer",
    time: "1 hour ago",
    status: "Completed",
  },
  {
    id: "TRX-8926",
    donor: "Karthik M.",
    fund: "General Donation",
    amount: 1001,
    type: "Credit Card",
    time: "2 hours ago",
    status: "Completed",
  },
  {
    id: "TRX-8927",
    donor: "Anonymous",
    fund: "Hundi",
    amount: 100,
    type: "UPI",
    time: "3 hours ago",
    status: "Completed",
  },
];

export function DonationSection() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard
          icon={IndianRupee}
          label="Total Collections (Today)"
          value="₹1,24,500"
          sub="+12% vs yesterday"
          color="text-emerald-600"
          bgTint="bg-emerald-50 text-emerald-600 border border-emerald-100"
          trend={{ up: true, text: "+12%" }}
        />
        <StatCard
          icon={HeartHandshake}
          label="Annadhanam Fund"
          value="₹45,200"
          sub="320 donors today"
          color="text-amber-600"
          bgTint="bg-amber-50 text-amber-600 border border-amber-100"
        />
        <StatCard
          icon={QrCode}
          label="Digital Payments"
          value="₹82,400"
          sub="UPI & Cards"
          color="text-indigo-600"
          bgTint="bg-indigo-50 text-indigo-600 border border-indigo-100"
          trend={{ up: true, text: "+5%" }}
        />
        <StatCard
          icon={PiggyBank}
          label="Offline Hundi"
          value="₹42,100"
          sub="Estimated cash drop"
          color="text-emerald-600"
          bgTint="bg-emerald-50 text-emerald-600 border border-emerald-100"
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        {/* Main Charts */}
        <div className="space-y-8">
          <div className="rounded-3xl border border-border/40 bg-white p-6 lg:p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-extrabold text-foreground">Donation Trends</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                  Collection volume over the last 7 days
                </p>
              </div>
              <div className="flex rounded-lg border border-border bg-surface p-1">
                {(["daily", "weekly", "monthly"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-all ${period === p ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={donationTrend}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="var(--muted-foreground)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                    tickFormatter={(v) => `₹${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    itemStyle={{ fontWeight: 600, color: "var(--emerald)" }}
                    formatter={(value: any) => [`₹${value.toLocaleString()}`, "Collection"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--emerald)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-border/40 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/10 px-6 py-5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <History size={16} className="text-primary" /> Recent Transactions
              </h3>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                <Download size={14} /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3 text-left">Transaction ID</th>
                    <th className="px-6 py-3 text-left">Donor</th>
                    <th className="px-6 py-3 text-left">Fund Category</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                    <th className="px-6 py-3 text-center">Method</th>
                    <th className="px-6 py-3 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentTransactions.map((trx) => (
                    <tr key={trx.id} className="transition-colors hover:bg-muted/50">
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                        {trx.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-foreground">{trx.donor}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="inline-flex items-center rounded-md bg-surface border border-border px-2 py-1 text-[10px] font-semibold">
                          {trx.fund}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold tabular-nums text-foreground">
                        ₹{trx.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${trx.type === "UPI" ? "bg-info/10 text-info" : trx.type === "Cash" ? "bg-saffron/10 text-saffron" : "bg-emerald/10 text-emerald"}`}
                        >
                          {trx.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-xs text-muted-foreground">
                        {trx.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-8">
          <div className="rounded-3xl border border-border/40 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fund Distribution</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fundsBreakdown}
                  layout="vertical"
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                    stroke="var(--border)"
                    opacity={0.5}
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={120}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--foreground)", fontSize: 11, fontWeight: 600 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    cursor={{ fill: "var(--muted)" }}
                    formatter={(value: any) => [`₹${value.toLocaleString()}`, "Amount"]}
                  />
                  <Bar dataKey="amount" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={24}>
                    {fundsBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? "var(--saffron)"
                            : index === 1
                              ? "var(--emerald)"
                              : index === 2
                                ? "var(--info)"
                                : "var(--primary)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-border/40 bg-white p-6 lg:p-8 shadow-sm transition-shadow hover:shadow-md flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                <ArrowRightLeft size={20} />
              </div>
              <div>
                <h3 className="text-[13px] font-extrabold text-foreground">Quick Transfer</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Move funds between accounts</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">From Account</label>
                <select className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>General Collection A/C (...8923)</option>
                  <option>Hundi Collection A/C (...4421)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">To Fund</label>
                <select className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Annadhanam Trust</option>
                  <option>Temple Maintenance</option>
                  <option>Building Expansion</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md mt-2">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
