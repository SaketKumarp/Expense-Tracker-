import {
  ChartNoAxesCombined,
  CircleUserRound,
  LayoutDashboard,
  ReceiptText,
  Settings,
  Tags,
} from "lucide-react";

const navigationItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Transactions", icon: ReceiptText, active: false },
  { label: "Categories", icon: Tags, active: false },
  { label: "Reports", icon: ChartNoAxesCombined, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[228px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0d1117] px-3 py-5 md:flex">
      <div className="mb-9 flex items-center gap-3 px-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          <ChartNoAxesCombined className="size-5" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">
          pocketwise
        </span>
      </div>

      <nav aria-label="Main navigation" className="space-y-1">
        {navigationItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            aria-current={active ? "page" : undefined}
            className={[
              "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
              active
                ? "border-l-2 border-emerald-400 bg-emerald-400/10 text-emerald-400"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100",
            ].join(" ")}
          >
            <Icon className="size-[19px]" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/[0.07] px-3 pt-5">
        <div className="flex items-start gap-2 text-xs leading-5 text-slate-500">
          <CircleUserRound className="mt-0.5 size-4 shrink-0 text-emerald-400" />
          <p>
            Small steps,
            <br />
            big financial goals.
          </p>
        </div>
      </div>
    </aside>
  );
}
