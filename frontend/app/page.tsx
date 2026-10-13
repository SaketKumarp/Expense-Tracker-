 
"use client";

import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  ReceiptText,
  ChartNoAxesCombined,
  Wallet,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
  ShoppingBag,
  Car,
  House,
  HeartPulse,
  GraduationCap,
  MoreHorizontal,
  CalendarDays,
  IndianRupee,
  X,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Expense = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  payment: string;
};

const initialExpenses: Expense[] = [
  {
    id: 1,
    title: "Lunch",
    category: "Food",
    amount: 250,
    date: "2026-10-11",
    payment: "UPI",
  },
  {
    id: 2,
    title: "Dinner",
    category: "Food",
    amount: 500,
    date: "2026-10-12",
    payment: "UPI",
  },
  {
    id: 3,
    title: "Diet Coke",
    category: "Food",
    amount: 50,
    date: "2026-10-12",
    payment: "Cash",
  },
  {
    id: 4,
    title: "Bolt Fit running shoes",
    category: "Shopping",
    amount: 800,
    date: "2026-10-12",
    payment: "Card",
  },
];

const chartData = [
  { day: "Mon", amount: 450 },
  { day: "Tue", amount: 720 },
  { day: "Wed", amount: 530 },
  { day: "Thu", amount: 1100 },
  { day: "Fri", amount: 680 },
  { day: "Sat", amount: 1350 },
  { day: "Sun", amount: 800 },
];

const categoryColors: Record<string, string> = {
  Food: "#6366f1",
  Shopping: "#14b8a6",
  Transport: "#f59e0b",
  Bills: "#f97316",
  Health: "#ec4899",
  Education: "#8b5cf6",
  Other: "#94a3b8",
};

const categoryIcons: Record<string, React.ElementType> = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Transport: Car,
  Bills: House,
  Health: HeartPulse,
  Education: GraduationCap,
  Other: ReceiptText,
};

const categories = [
  "Food",
  "Shopping",
  "Transport",
  "Bills",
  "Health",
  "Education",
  "Other",
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function DashboardPage() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
    payment: "UPI",
  });

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryData = useMemo(() => {
    const totals: Record<string, number> = {};

    expenses.forEach((expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) + expense.amount;
    });

    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value,
        color: categoryColors[name] || categoryColors.Other,
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch =
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        expense.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  function addExpense(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const amount = Number(form.amount);

    if (!form.title.trim() || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      title: form.title.trim(),
      category: form.category,
      amount,
      date: form.date,
      payment: form.payment,
    };

    setExpenses((current) => [newExpense, ...current]);
    setForm({
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().slice(0, 10),
      payment: "UPI",
    });
    setDialogOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-5 py-7 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Wallet size={21} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Spendwise
              </h1>
              <p className="text-xs text-slate-500">Personal finance</p>
            </div>
          </div>

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            <a
              href="#overview"
              className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700"
            >
              <LayoutDashboard size={18} />
              Overview
            </a>
            <a
              href="#transactions"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <ReceiptText size={18} />
              Transactions
            </a>
            <a
              href="#analytics"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <ChartNoAxesCombined size={18} />
              Analytics
            </a>
          </nav>

          <div className="mt-auto">
            <Separator className="mb-5" />
            <a
              href="#settings"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <Settings size={18} />
              Settings
            </a>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Wallet size={16} className="text-indigo-600" />
                Your finances
              </div>
              <p className="text-xs leading-5 text-slate-500">
                Keep track of your spending and build better money habits.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                SK
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">My Account</p>
                <p className="text-xs text-slate-500">Personal workspace</p>
              </div>
              <MoreHorizontal size={18} className="ml-auto text-slate-400" />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main id="overview" className="min-w-0 flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-md sm:px-8">
            <div>
              <p className="text-xs font-medium text-slate-500">
                PERSONAL FINANCE / DASHBOARD
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight">
                Overview
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative hidden sm:block">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  placeholder="Search expenses..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-52 rounded-xl border-slate-200 bg-slate-50 pl-9"
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                className="relative rounded-xl"
                aria-label="Notifications"
              >
                <Bell size={17} />
              </Button>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-700">
                    <Plus size={17} className="mr-1" />
                    <span className="hidden sm:inline">Add expense</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[450px]">
                  <DialogHeader>
                    <DialogTitle>Add an expense</DialogTitle>
                    <DialogDescription>
                      Enter the details of your transaction below.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={addExpense} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-title">Expense name</Label>
                      <Input
                        id="expense-title"
                        placeholder="e.g. Lunch with friends"
                        value={form.title}
                        onChange={(event) =>
                          setForm({ ...form, title: event.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expense-amount">Amount (₹)</Label>
                      <Input
                        id="expense-amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        value={form.amount}
                        onChange={(event) =>
                          setForm({ ...form, amount: event.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={form.category}
                          onValueChange={(value) =>
                            setForm({ ...form, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Payment method</Label>
                        <Select
                          value={form.payment}
                          onValueChange={(value) =>
                            setForm({ ...form, payment: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Payment" />
                          </SelectTrigger>
                          <SelectContent>
                            {["UPI", "Cash", "Card", "Net Banking"].map(
                              (payment) => (
                                <SelectItem key={payment} value={payment}>
                                  {payment}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expense-date">Date</Label>
                      <Input
                        id="expense-date"
                        type="date"
                        value={form.date}
                        onChange={(event) =>
                          setForm({ ...form, date: event.target.value })
                        }
                        required
                      />
                    </div>

                    <DialogFooter className="pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        Save expense
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-8">
            {/* Welcome */}
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Good to see you!
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Here&apos;s what&apos;s happening with your money.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={17} />
                <span>
                  {new Date().toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </section>

            {/* Summary cards */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Total expenses
                    </p>
                    <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                      <Wallet size={19} />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    {formatCurrency(totalSpent)}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Across {expenses.length} transactions
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      This month
                    </p>
                    <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                      <ChartNoAxesCombined size={19} />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    {formatCurrency(totalSpent)}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                    <ArrowDownRight size={14} />
                    <span>Monthly spending total</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Average expense
                    </p>
                    <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                      <IndianRupee size={19} />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    {formatCurrency(
                      expenses.length ? totalSpent / expenses.length : 0
                    )}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Per transaction
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Top category
                    </p>
                    <div className="rounded-xl bg-rose-50 p-2.5 text-rose-500">
                      <ReceiptText size={19} />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    {categoryData[0]?.name || "—"}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {categoryData[0]
                      ? formatCurrency(categoryData[0].value) +
                        " spent in this category"
                      : "No expenses yet"}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Charts */}
            <section
              id="analytics"
              className="grid gap-5 xl:grid-cols-[1.65fr_1fr]"
            >
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-bold">
                      Spending overview
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Example daily spending for the week
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="rounded-lg">
                    This week
                  </Badge>
                </CardHeader>

                <CardContent>
                  <div className="h-[270px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="spendingGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#6366f1"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="95%"
                              stopColor="#6366f1"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          stroke="#e2e8f0"
                          strokeDasharray="4 4"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                          tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                          formatter={(value) => [
                            formatCurrency(Number(value)),
                            "Spent",
                          ]}
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid #e2e8f0",
                            fontSize: 12,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#6366f1"
                          strokeWidth={2.5}
                          fill="url(#spendingGradient)"
                          activeDot={{ r: 5, fill: "#6366f1" }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold">
                    Expenses by category
                  </CardTitle>
                  <CardDescription>
                    Where your money goes
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {categoryData.length === 0 ? (
                    <div className="flex h-[230px] items-center justify-center text-sm text-slate-500">
                      Add an expense to see your breakdown.
                    </div>
                  ) : (
                    <>
                      <div className="relative h-[190px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              dataKey="value"
                              nameKey="name"
                              innerRadius={58}
                              outerRadius={82}
                              paddingAngle={4}
                              stroke="none"
                            >
                              {categoryData.map((entry) => (
                                <Cell
                                  key={entry.name}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) =>
                                formatCurrency(Number(value))
                              }
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xs text-slate-500">
                            Total spent
                          </span>
                          <span className="mt-1 text-lg font-bold">
                            {formatCurrency(totalSpent)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-3">
                        {categoryData.slice(0, 4).map((category) => (
                          <div
                            key={category.name}
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <span className="text-sm text-slate-600">
                                {category.name}
                              </span>
                            </div>
                            <span className="text-sm font-semibold">
                              {formatCurrency(category.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Transactions */}
            <section id="transactions">
              <Card className="overflow-hidden rounded-2xl border-slate-200 shadow-sm">
                <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">
                      Recent transactions
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Review and filter your expenses
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="relative sm:hidden">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full pl-9"
                      />
                    </div>

                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-[150px] rounded-xl">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-sm">
                      <thead className="border-y border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-6 py-4 font-semibold">
                            Transaction
                          </th>
                          <th className="px-6 py-4 font-semibold">
                            Category
                          </th>
                          <th className="px-6 py-4 font-semibold">Date</th>
                          <th className="px-6 py-4 font-semibold">Payment</th>
                          <th className="px-6 py-4 text-right font-semibold">
                            Amount
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredExpenses.map((expense) => {
                          const Icon =
                            categoryIcons[expense.category] ||
                            categoryIcons.Other;

                          return (
                            <tr
                              key={expense.id}
                              className="transition hover:bg-slate-50/80"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                      backgroundColor:
                                        (categoryColors[expense.category] ||
                                          categoryColors.Other) + "18",
                                      color:
                                        categoryColors[expense.category] ||
                                        categoryColors.Other,
                                    }}
                                  >
                                    <Icon size={18} />
                                  </div>
                                  <span className="font-medium text-slate-800">
                                    {expense.title}
                                  </span>
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <Badge
                                  variant="secondary"
                                  className="rounded-lg bg-slate-100 font-medium text-slate-600"
                                >
                                  {expense.category}
                                </Badge>
                              </td>

                              <td className="px-6 py-4 text-slate-500">
                                {formatDate(expense.date)}
                              </td>

                              <td className="px-6 py-4 text-slate-500">
                                {expense.payment}
                              </td>

                              <td className="px-6 py-4 text-right font-semibold text-slate-800">
                                −{formatCurrency(expense.amount)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {filteredExpenses.length === 0 && (
                    <div className="px-6 py-12 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        <ReceiptText size={22} />
                      </div>
                      <p className="font-medium">No expenses found</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try a different search or add a new expense.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                    <p className="text-xs text-slate-500">
                      Showing {filteredExpenses.length} of {expenses.length}{" "}
                      transactions
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600 hover:text-indigo-700"
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory("All");
                      }}
                    >
                      Clear filters
                      <X size={14} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            <footer className="pb-3 text-center text-xs text-slate-400">
              Spendwise · Personal finance dashboard
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
 