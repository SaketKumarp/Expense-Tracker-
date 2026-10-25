"use client";

import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DashboardHeaderProps = {
  onAddExpense?: () => void;
  selectedMonth?: string;
  onMonthChange?: (month: string) => void;
};

const months = [
  { label: "October 2026", value: "2026-10" },
  { label: "September 2026", value: "2026-09" },
  { label: "August 2026", value: "2026-08" },
];

export function DashboardHeader({
  onAddExpense,
  selectedMonth = "2026-10",
  onMonthChange,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div className="space-y-1">
        
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Good evening! Saket
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s your spending at a glance.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="w-[190px]">
            <CalendarDays className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={onAddExpense}
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Plus className="mr-2 size-4" />
          Add expense
        </Button>
      </div>
    </header>
  );
}
