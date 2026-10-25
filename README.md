# Pocketwise: Personal Expense Tracker

A personal expense tracker for Indian rupees (₹). It has two parts:

- **Backend:** an [MCP](https://modelcontextprotocol.io) server built with FastMCP that stores expenses in a Supabase (Postgres) database. An AI assistant such as Claude can call its tools, so you can log and review spending in plain language, e.g. *"add headphones worth 1700 to my expenses"*.
- **Frontend:** a dark-themed Next.js dashboard called **Pocketwise** for viewing spending at a glance. See [Frontend](#frontend) for details and current status.

## Features

- Add an expense with an amount in ₹, a category, a note and an optional date
- List expenses, filtered by date range and category (newest first)
- Monthly summary with total spend and a per-category breakdown
- Rank categories from highest to lowest spending
- Delete an expense by ID
- Amounts are stored as integer paise (₹1 = 100 paise), so there are no floating-point rounding errors
- Dashboard with summary cards, a spending-over-time chart, a category breakdown and a recent-transactions table

## Project structure

```
Expense-Tracker-/
├── backend/
│   ├── pyproject.toml          # Python dependencies (managed with uv)
│   └── src/
│       ├── main.py             # MCP server and tools
│       └── migrate_sqlite.py   # One-off copy of old SQLite data into Supabase
└── frontend/
    ├── app/
    │   ├── layout.tsx          # Root layout: fonts, page title and metadata
    │   ├── globals.css         # Global styles and theme tokens
    │   └── (home)/
    │       ├── layout.tsx      # Sidebar + main content shell
    │       └── page.tsx        # Dashboard page
    ├── components/
    │   ├── dashboard/          # Dashboard components and sample data
    │   └── ui/                 # shadcn/ui building blocks
    ├── hooks/                  # Shared React hooks
    ├── lib/utils.ts            # Helpers
    └── public/                 # Static assets
```

## MCP tools (backend)

| Tool | What it does |
|---|---|
| `add_expense` | Records an expense (`amount`, `category`, optional `note`, optional `spent_at` as `YYYY-MM-DD`) |
| `list_expenses` | Lists expenses, optionally filtered by `start_date`, `end_date` and `category`. `limit` is 1–100 (default 20) |
| `get_monthly_summary` | Total spent, expense count and category breakdown for a month (`YYYY-MM`, defaults to the current month) |
| `find_expensive_categories` | Ranks categories from highest to lowest spending for a month |
| `delete_expense` | Permanently deletes an expense by ID |

**Categories:** `food`, `travel`, `shopping`, `rent`, `bills`, `health`, `education`, `entertainment`, `other`

Notes are limited to 500 characters.

## Database

Data lives in one Supabase table, `public.expenses`:

| Column | Type | Notes |
|---|---|---|
| `id` | bigint | Primary key, auto-generated |
| `amount_paise` | bigint | Must be greater than 0 |
| `category` | text | One of the categories above |
| `note` | text | Defaults to empty |
| `spent_at` | date | Defaults to today |
| `created_at` | timestamptz | Defaults to `now()` |

## Frontend

The frontend is a single-page dashboard built with Next.js (App Router), React and Tailwind CSS. It uses a dark theme with an emerald accent colour and formats all amounts in Indian rupees (`en-IN`).

### What the dashboard shows

| Section | Component | Details |
|---|---|---|
| Sidebar | `dashboard-sidebar.tsx` | Pocketwise logo and navigation: Overview, Transactions, Categories, Reports, Settings. Hidden on small screens |
| Header | `dashboard-header.tsx` | Greeting, month picker (October, September and August 2026) and an "Add expense" button |
| Summary cards | `summary-grid.tsx`, `sumaary-card.tsx` | Four cards: total spent, monthly budget (with a progress bar), this week, and largest category |
| Spending over time | `spending-chart.tsx` | Line chart of spending across the month (Recharts), with a tooltip |
| Spending by category | `category-breakdown.tsx` | Per-category amount, share of total and a progress bar |
| Recent transactions | `recent-transactions.tsx` | Table of the latest expenses with category badges, dates and amounts, plus a "View all" button and an empty state |

The layout is responsive: the summary cards go from one column on phones to four on large screens, and the charts sit side by side on extra-large screens.

### Frontend tech stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19, written in TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- [shadcn/ui](https://ui.shadcn.com) components (button, card, table, select, badge, dialog, sheet, tabs and more) built on Base UI
- [Recharts](https://recharts.org) for charts
- [Lucide](https://lucide.dev) icons
- Inter and Geist Mono fonts through `next/font`

### Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm start` | Runs the production build |
| `npm run lint` | Runs ESLint |

### Current status of the frontend

The dashboard is a working UI prototype. It is **not connected to the database yet**:

- All numbers, the chart, the categories and the transactions come from sample data in `frontend/components/dashboard/dashboard.ts`. Your real expenses are not shown yet.
- The "Add expense" button and the "View all" button are placeholders (marked `TODO` in `app/(home)/page.tsx`).
- The month picker is a hard-coded list and the greeting is fixed text.
- The sidebar items other than Overview have no pages yet.

To show real data, the dashboard needs a way to read from Supabase. The backend is an MCP server over stdio, which a browser cannot call directly, so this would need an API layer (for example Next.js route handlers that query Supabase) that reuses the same table and the paise conversion.

## Setup

### Requirements

- Python 3.13 or newer and [uv](https://docs.astral.sh/uv/)
- Node.js and npm (for the frontend)
- A Supabase project with the `expenses` table above

### Backend

```bash
cd backend
uv sync
```

Create `backend/src/.env` with your Supabase Postgres connection string:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/postgres
```

> Never commit `.env`. It contains your database password.

Run the server (it uses the default stdio transport):

```bash
uv run src/main.py
```

### Connect it to an AI client

Add the server to your MCP client's config, for example in Claude Desktop:

```json
{
  "mcpServers": {
    "expense-tracker": {
      "command": "uv",
      "args": ["run", "--directory", "/path/to/Expense-Tracker-/backend", "src/main.py"]
    }
  }
}
```

Then ask things like:

- "Add ₹250 for lunch under food"
- "Show my shopping expenses this month"
- "Which category did I spend the most on in 2026-10?"

### Migrating old SQLite data

If you have records in the earlier SQLite database (`backend/src/expenses.db`), copy them to Supabase with:

```bash
cd backend
uv run src/migrate_sqlite.py
```

The script leaves the SQLite file untouched and skips IDs that already exist.

## Tech stack

- **Backend:** Python 3.13, FastMCP, psycopg 3, python-dotenv, Supabase (Postgres)
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Recharts

## Troubleshooting

Free-tier Supabase projects pause after a period of inactivity. If the tools fail with a database connection or "tenant or user not found" error, open the Supabase dashboard and restore the project, then try again.

## Author

Saket Kumar — [GitHub](https://github.com/SaketKumarp)
