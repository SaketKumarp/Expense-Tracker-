"use client";

import { useState } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SummaryGrid } from "@/components/dashboard/summary-grid";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { recentTransactions, spendingCategories, spendingData } from "@/components/dashboard/dashboard";

 

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState("2026-10");

  const handleAddExpense = () => {
    // TODO: Open the Add Expense modal.
  };

  const handleViewAll = () => {
    // TODO: Navigate to the Transactions page.
  };

return (
  <main className="dark min-h-screen bg-[#0b0f14] text-slate-100">
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 p-4 sm:p-5 lg:p-6">
      <DashboardHeader
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onAddExpense={handleAddExpense}
      />

      <SummaryGrid />

      <section
        aria-label="Spending analytics"
        className="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_1fr]"
      >
        <SpendingChart data={spendingData} />
        <CategoryBreakdown categories={spendingCategories} />
      </section>

      <RecentTransactions
        transactions={recentTransactions}
        onViewAll={handleViewAll}
      />

      <footer className="pb-1 text-center text-xs text-slate-500">
        Small steps, big financial goals.
      </footer>
    </div>
  </main>
)

}
