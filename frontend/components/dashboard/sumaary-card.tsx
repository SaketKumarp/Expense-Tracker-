import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SummaryMetric } from "./dashboard";

type SummaryCardProps = {
  metric: SummaryMetric;
};

export function SummaryCard({ metric }: SummaryCardProps) {
  const Icon = metric.icon;
  const trend = metric.trend;

  return (
    <Card className="h-full min-w-0 rounded-xl border border-slate-700/60 bg-gradient-to-br from-[#151a21] to-[#10151b] text-slate-100 shadow-sm transition-colors hover:border-emerald-500/30">
      <CardContent className="flex min-h-[112px] items-start gap-3 p-3 sm:min-h-[120px] sm:p-4">
        {/* Compact icon */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          <Icon className="size-5" aria-hidden="true" />
        </div>

        {/* Metric content */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-slate-400 sm:text-sm">
            {metric.title}
          </p>

          <h3 className="mt-1 text-xl font-bold leading-tight tracking-tight text-slate-50 sm:text-2xl">
            {metric.value}
          </h3>

          {metric.progress ? (
            <div className="mt-2.5 space-y-1.5">
              <div
                className="h-2 overflow-hidden rounded-full bg-slate-700/70"
                role="progressbar"
                aria-label={metric.title}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.min(
                  100,
                  Math.max(0, metric.progress.value),
                )}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, metric.progress.value),
                    )}%`,
                  }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-2 text-[10px] text-slate-400 sm:text-xs">
                <span className="font-semibold text-slate-300">
                  {metric.progress.label}
                </span>
                <span>{metric.progress.detail}</span>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              {trend && (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    trend.positive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {trend.direction === "down" ? (
                    <ArrowDownRight className="size-3.5" />
                  ) : (
                    <ArrowUpRight className="size-3.5" />
                  )}
                  {trend.value}
                </span>
              )}

              {metric.description && (
                <span className="text-xs leading-4 text-slate-400">
                  {metric.description}
                </span>
              )}
            </div>
          )}

          {metric.progress && metric.description && (
            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
              {metric.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
