import { ArrowUpRight, ShoppingBag, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "./dashboard"; 

type RecentTransactionsProps = {
  transactions: Transaction[];
  onViewAll?: () => void;
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function getCategoryStyle(category: string) {
  switch (category.toLowerCase()) {
    case "food":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "shopping":
      return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

export function RecentTransactions({
  transactions,
  onViewAll,
}: RecentTransactionsProps) {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            Recent transactions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your latest recorded expenses.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="shrink-0 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
        >
          View all
          <ArrowUpRight className="ml-1 size-4" />
        </Button>
      </CardHeader>

      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-6">Expense</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="pr-6 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No expenses recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => {
                const FoodIcon =
                  transaction.category.toLowerCase() === "food"
                    ? Utensils
                    : ShoppingBag;

                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <FoodIcon
                            className="size-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="font-medium">
                          {transaction.note || "Untitled expense"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getCategoryStyle(transaction.category)}
                      >
                        {transaction.category}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {dateFormatter.format(
                        new Date(`${transaction.spentAt}T00:00:00Z`),
                      )}
                    </TableCell>

                    <TableCell className="pr-6 text-right font-semibold tabular-nums">
                      {currencyFormatter.format(transaction.amountPaise / 100)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
