<h1 align="center">Pocketwise</h1>
<p align="center"><b>A personal expense tracker you can talk to.</b><br/>Log and review your spending in ₹ through AI tools, and see it on a clean dashboard.</p>

<p align="center">
  <img alt="Python 3.13+" src="https://img.shields.io/badge/Python-3.13%2B-3776AB?logo=python&logoColor=white" />
  <img alt="FastMCP" src="https://img.shields.io/badge/FastMCP-MCP%20server-10b981" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white" />
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
</p>

Pocketwise is built with FastMCP, Supabase PostgreSQL and Next.js. An AI assistant such as Claude can add, list and delete expenses through MCP tools, while a dark-themed dashboard shows your spending at a glance. Everything is in Indian rupees (₹).

> **Try it:** tell your AI client *"add headphones worth 1700 to my expenses"* and it is saved to your database.

## Screenshots

### Dashboard

<img width="900" alt="Pocketwise dashboard with summary cards, spending chart, category breakdown and recent transactions" src="https://github.com/user-attachments/assets/c8d3b843-fd86-4ae3-914f-86ef74a9a53f" />

### Supabase database

<img width="900" alt="The expenses table in Supabase" src="https://github.com/user-attachments/assets/7bb32e80-de80-45cc-8a58-fe288d0bb08b" />

## Features

- Add, list and delete expenses using MCP tools
- Filter expenses by date range and category
- Monthly spending summaries and category breakdowns
- Rank categories from highest to lowest spending
- Amounts are stored as integer paise (₹1 = 100 paise) to avoid floating-point errors
- Dashboard with summary cards, a spending chart, a category breakdown and a transactions table

## How it works

```mermaid
flowchart LR
    U["You"] -->|"plain language"| C["AI client<br/>(for example Claude Desktop)"]
    C -->|"MCP tools over stdio"| S["FastMCP server<br/>backend/src/main.py"]
    S -->|"psycopg"| DB[("Supabase PostgreSQL<br/>public.expenses")]
    D["Next.js dashboard<br/>frontend/"] -.->|"planned: API layer"| DB
```

The solid arrows work today. The dashed arrow is planned: the dashboard currently shows sample data (see [Project status](#project-status)).

### Example: adding an expense

```mermaid
sequenceDiagram
    participant You
    participant Client as AI client
    participant MCP as FastMCP server
    participant DB as Supabase
    You->>Client: Add headphones worth 1700
    Client->>MCP: add_expense(amount=1700, category=shopping, note=Headphones)
    MCP->>MCP: Validate input and convert ₹1,700 to 170000 paise
    MCP->>DB: INSERT INTO public.expenses
    DB-->>MCP: New row
    MCP-->>Client: success, expense_id, amount
    Client-->>You: Added ₹1,700 under shopping
```

## MCP tools

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

Data lives in one Supabase table, `public.expenses`.

```mermaid
erDiagram
    EXPENSES {
        bigint id PK
        bigint amount_paise
        text category
        text note
        date spent_at
        timestamptz created_at
    }
```

| Column | Type | Notes |
|---|---|---|
| `id` | bigint | Primary key, auto-generated |
| `amount_paise` | bigint | Must be greater than 0 |
| `category` | text | One of the categories above |
| `note` | text | Defaults to empty |
| `spent_at` | date | Defaults to today |
| `created_at` | timestamptz | Defaults to `now()` |

## Frontend

The dashboard is a single page built with the Next.js App Router. It uses a dark theme with an emerald accent and formats amounts as Indian rupees (`en-IN`).

| Section | File | What it shows |
|---|---|---|
| Sidebar | `dashboard-sidebar.tsx` | Pocketwise logo and navigation: Overview, Transactions, Categories, Reports, Settings |
| Header | `dashboard-header.tsx` | Greeting, month picker and "Add expense" button |
| Summary cards | `summary-grid.tsx` | Total spent, monthly budget with progress bar, this week, largest category |
| Spending over time | `spending-chart.tsx` | Line chart with tooltip (Recharts) |
| Spending by category | `category-breakdown.tsx` | Amount, share of total and a progress bar per category |
| Recent transactions | `recent-transactions.tsx` | Table with category badges, dates and amounts, plus an empty state |

The layout is responsive: the summary cards go from one column on phones to four on large screens.

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Python 3.13, FastMCP, psycopg 3, python-dotenv |
| Database | Supabase PostgreSQL |
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui |
| Charts and icons | Recharts, Lucide |

## Project structure

```text
Expense-Tracker-/
├── backend/
│   ├── pyproject.toml          # Python dependencies (managed with uv)
│   └── src/
│       ├── main.py             # MCP server and tools
│       └── migrate_sqlite.py   # One-off copy of old SQLite data into Supabase
└── frontend/
    ├── app/                    # Layouts and the dashboard page
    ├── components/
    │   ├── dashboard/          # Dashboard components and sample data
    │   └── ui/                 # shadcn/ui building blocks
    ├── hooks/
    ├── lib/
    └── public/
```

## Getting started

### Requirements

- Python 3.13 or newer and [uv](https://docs.astral.sh/uv/)
- Node.js and npm
- A Supabase project with the `expenses` table above

### 1. Backend

```bash
cd backend
uv sync
```

Create `backend/src/.env` with your Supabase Postgres connection string:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/postgres
```

> Never commit `.env`. It contains your database password.

Run the server (default stdio transport):

```bash
uv run src/main.py
```

### 2. Connect it to an AI client

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

### 3. Frontend

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

### Migrating old SQLite data (optional)

```bash
cd backend
uv run src/migrate_sqlite.py
```

The script leaves the SQLite file untouched and skips IDs that already exist.

## Project status

- **Backend:** working. All five MCP tools run against Supabase.
- **Frontend:** a working UI prototype. Its numbers, chart and transactions come from sample data in `frontend/components/dashboard/dashboard.ts`, so your real expenses are not shown yet.

### Roadmap

- [ ] Connect the dashboard to Supabase through an API layer, since a browser cannot call the stdio MCP server directly
- [ ] "Add expense" form (the button is a `TODO` in `app/(home)/page.tsx`)
- [ ] Transactions page behind "View all"
- [ ] Categories, Reports and Settings pages
- [ ] Real month picker and budget tracking

## Troubleshooting

Free-tier Supabase projects pause after a period of inactivity. If the tools fail with a database connection or "tenant or user not found" error, open the Supabase dashboard and restore the project, then try again.

## Author

Saket Kumar — [GitHub](https://github.com/SaketKumarp)
