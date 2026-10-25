import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SpendingCategory } from "./dashboard";  

type CategoryBreakdownProps = {
  categories: SpendingCategory[];
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Spending by category
        </CardTitle>
        <p className="text-sm text-muted-foreground">Where your money goes.</p>
      </CardHeader>

      <CardContent className="space-y-5">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <span className="truncate text-sm font-medium">
                    {category.name}
                  </span>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium">
                    {currencyFormatter.format(category.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {category.percentage}%
                  </p>
                </div>
              </div>

              <div
                className="h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-label={`${category.name} spending`}
                aria-valuenow={category.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(0, category.percentage))}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
