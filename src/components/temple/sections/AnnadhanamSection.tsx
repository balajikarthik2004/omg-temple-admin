import { type Temple } from "@/lib/temple-data";
import { StatCard } from "../ui/StatCard";
import {
  Utensils,
  Users,
  Clock,
  TrendingUp,
  Package,
  Salad,
  Flame,
  HeartHandshake,
  ChefHat,
  Leaf,
  IndianRupee,
  Star
} from "lucide-react";

export function AnnadhanamSection({ temple }: { temple: Temple }) {
  // Mock data scaled by temple capacity/tier
  const capacityMultiplier = temple.name.includes("Meenakshi") || temple.name.includes("Tirupati") || temple.name.includes("Palani") ? 3 : 1;
  const mealsServed = 3250 * capacityMultiplier;
  const waitingCrowd = 145 * capacityMultiplier;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* HEADER RIBBON (MINIMAL) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Utensils}
          label="Meals Served Today"
          value={mealsServed.toLocaleString()}
          color="text-emerald-600"
          bgTint="bg-emerald-50 text-emerald-600 border border-emerald-100"
          trend={{ up: true, text: "+12%" }}
        />
        <StatCard
          icon={Users}
          label="Queue Waiting"
          value={waitingCrowd}
          color="text-amber-600"
          bgTint="bg-amber-50 text-amber-600 border border-amber-100/50"
          sub="~24 mins wait"
        />
        <StatCard
          icon={Flame}
          label="Kitchen Status"
          value="Cooking Dinner"
          color="text-orange-600"
          bgTint="bg-orange-50 text-orange-600 border border-orange-100/50"
          sub="Live Operations"
        />
        <StatCard
          icon={HeartHandshake}
          label="On-Duty Volunteers"
          value={12 * capacityMultiplier}
          color="text-indigo-600"
          bgTint="bg-indigo-50 text-indigo-600 border border-indigo-100/50"
          sub="Serving Now"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* DINING HALLS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-border/40">
            <div className="border-b border-border/40 bg-muted/10 px-6 py-5 flex items-center justify-between">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                Dining Hall Live Status
              </h3>
            </div>

            <div className="p-6 grid gap-6 sm:grid-cols-2">
              {/* Hall A */}
              <div className="rounded-2xl border border-border/50 bg-white p-5 transition-shadow hover:shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Hall A (General)</h4>
                    <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">Capacity: {200 * capacityMultiplier}</p>
                  </div>
                  <div className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                    95%
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full w-[95%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Turnover in:</span>
                    <span className="text-foreground">~8 mins</span>
                  </div>
                </div>
              </div>

              {/* Hall B */}
              <div className="rounded-2xl border border-border/50 bg-white p-5 transition-shadow hover:shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Hall B</h4>
                    <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">Capacity: {150 * capacityMultiplier}</p>
                  </div>
                  <div className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                    60%
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[60%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Turnover in:</span>
                    <span className="text-foreground">~15 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SPONSORSHIP AND MENU */}
          <div className="grid gap-6 sm:grid-cols-2">

            {/* Today's Menu */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-border/40 flex flex-col">
              <div className="border-b border-border/40 bg-muted/10 px-6 py-5 flex items-center justify-between">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Today's Menu</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 text-muted-foreground"><Utensils size={16} /></div>
                    <div>
                      <p className="font-semibold text-foreground text-xs">Sambar Rice (Hot)</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Freshly prepared with country vegetables</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 text-muted-foreground"><Leaf size={16} /></div>
                    <div>
                      <p className="font-semibold text-foreground text-xs">Curd Rice</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">With pomegranate and pickle</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 text-muted-foreground"><Utensils size={16} /></div>
                    <div>
                      <p className="font-semibold text-foreground text-xs">Sweet Pongal</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Special ghee preparation</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sponsorships */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-border/40 flex flex-col">
              <div className="border-b border-border/40 bg-muted/10 px-6 py-5 flex items-center justify-between">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Today's Sponsors</h3>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Total Funds Raised</div>
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    <span className="text-xl font-bold text-foreground">1,50,000</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-500 border border-amber-100">
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-foreground">Shri R. Krishnan & Family</p>
                      <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest mt-1">Morning Breakfast</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-500 border border-amber-100">
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-foreground">Smt. Lakshmi N.</p>
                      <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest mt-1">Evening Dinner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: INVENTORY */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-border/40 flex flex-col h-full">
          <div className="border-b border-border/40 bg-muted/10 px-6 py-5 flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Kitchen Inventory
            </h3>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
            {/* Item 1 */}
            <div className="group">
              <div className="flex justify-between items-end mb-2.5">
                <span className="font-bold text-xs text-foreground">Rice (Ponni)</span>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-foreground">450 kg</span>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Sufficient</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-foreground rounded-full w-[80%]" />
              </div>
            </div>

            {/* Item 2 */}
            <div className="group">
              <div className="flex justify-between items-end mb-2.5">
                <span className="font-bold text-xs text-foreground">Toor Dal</span>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-foreground">120 kg</span>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Sufficient</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-foreground rounded-full w-[65%]" />
              </div>
            </div>

            {/* Item 3 */}
            <div className="group">
              <div className="flex justify-between items-end mb-2.5">
                <span className="font-bold text-xs text-foreground">Cooking Oil</span>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-foreground">45 L</span>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-amber-600">Reorder Soon</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[35%]" />
              </div>
            </div>

            {/* Item 4 */}
            <div className="group">
              <div className="flex justify-between items-end mb-2.5">
                <span className="font-bold text-xs text-foreground">Pure Ghee</span>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-red-600">12 kg</span>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-red-600">Critical Low</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-red-100 rounded-full overflow-hidden animate-pulse">
                <div className="h-full bg-red-500 rounded-full w-[15%]" />
              </div>
            </div>

            {/* Item 5 */}
            <div className="group">
              <div className="flex justify-between items-end mb-2.5">
                <span className="font-bold text-xs text-foreground">Vegetables</span>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-foreground">200 kg</span>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Sufficient</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-foreground rounded-full w-[90%]" />
              </div>
            </div>

            <div className="mt-auto pt-4">
              <button className="w-full rounded-2xl bg-muted/30 text-foreground py-3 font-bold text-[13px] hover:bg-foreground hover:text-white transition-colors border border-border/60 shadow-sm">
                Generate Indent Request
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
