import { summaryMetrics } from "./dashboard";
import { SummaryCard } from "./sumaary-card";
 

export function SummaryGrid() {
  return (
    <section
      aria-label="Spending overview"
      className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3 xl:gap-4"
    >
      {summaryMetrics.map((metric) => (
        <SummaryCard key={metric.title} metric={metric} />
      ))}
    </section>
  );
}
