import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CarFront,
  CircleEllipsis,
  ShoppingBag,
  Utensils,
} from "lucide-react";

export type SummaryMetric = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down";
    positive: boolean;
  };
  progress?: {
    value: number;
    label: string;
    detail: string;
  };
};

export type SpendingPoint = {
  date: string;
  amount: number;
};

export type SpendingCategory = {
  name: string;
  amount: number;
  percentage: number;
  icon: LucideIcon;
};

export type Transaction = {
  id: number;
  note: string;
  category: string;
  amountPaise: number;
  spentAt: string;
};

export const summaryMetrics: SummaryMetric[] = [
  {
    title: "Total spent",
    value: "₹4,850",
    description: "Compared with last month",
    icon: ArrowDownRight,
    trend: { value: "12%", direction: "down", positive: true },
  },
  {
    title: "Monthly budget",
    value: "₹15,000",
    description: "32% of budget used",
    icon: ArrowUpRight,
    progress: {
      value: 32.3,
      label: "32% spent",
      detail: "₹4,850 / ₹15,000",
    },
  },
  {
    title: "This week",
    value: "₹1,250",
    description: "Compared with last week",
    icon: ArrowDownRight,
    trend: { value: "18%", direction: "down", positive: true },
  },
  {
    title: "Largest category",
    value: "Shopping",
    description: "₹800 · 17% of total",
    icon: ShoppingBag,
  },
];

export const spendingData: SpendingPoint[] = [
  { date: "Oct 1", amount: 350 },
  { date: "Oct 3", amount: 600 },
  { date: "Oct 5", amount: 420 },
  { date: "Oct 7", amount: 850 },
  { date: "Oct 9", amount: 500 },
  { date: "Oct 11", amount: 1550 },
  { date: "Oct 12", amount: 1050 },
  { date: "Oct 13", amount: 750 },
];

export const spendingCategories: SpendingCategory[] = [
  { name: "Food", amount: 1425, percentage: 29, icon: Utensils },
  { name: "Shopping", amount: 800, percentage: 17, icon: ShoppingBag },
  { name: "Transport", amount: 400, percentage: 8, icon: CarFront },
  { name: "Other", amount: 2225, percentage: 46, icon: CircleEllipsis },
];

export const recentTransactions: Transaction[] = [
  {
    id: 1,
    note: "Lunch",
    category: "Food",
    amountPaise: 25000,
    spentAt: "2026-10-11",
  },
  {
    id: 2,
    note: "Dinner",
    category: "Food",
    amountPaise: 50000,
    spentAt: "2026-10-12",
  },
  {
    id: 3,
    note: "Diet Coke",
    category: "Food",
    amountPaise: 5000,
    spentAt: "2026-10-12",
  },
  {
    id: 4,
    note: "Bolt Fit running shoes",
    category: "Shopping",
    amountPaise: 80000,
    spentAt: "2026-10-12",
  },
  {
    id: 5,
    note: "White Monster",
    category: "Food",
    amountPaise: 12500,
    spentAt: "2026-10-12",
  },
];
