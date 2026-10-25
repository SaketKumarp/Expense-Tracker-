# Personal Expense Tracker

A personal expense tracker for Indian rupees (₹). It has two parts:

- **Backend:** an [MCP](https://modelcontextprotocol.io) server built with FastMCP that stores expenses in a Supabase (Postgres) database. An AI assistant such as Claude can call its tools, so you can log and review spending in plain language, e.g. *"add headphones worth 1700 to my expenses"*.
- **Frontend:** a Next.js dashboard for viewing spending (see [Project status](#project-status)).

## Features

- Add an expense with an amount in ₹, a category, a note and an optional date
- List expenses, filtered by date range and category (newest first)
- Monthly summary with total spend and a per-category breakdown
- Rank categories from highest to lowest spending
- Delete an expense by ID
- Amounts are stored as integer paise (₹1 = 100 paise), so there are no floating-point rounding errors

## Project structure

```
Expense-Tracker-/
├── backend/
│   ├── pyproject.toml        # Python dependencies (managed with uv)
│   └── src/
│       ├── main.py           # MCP server and tools
│       └── migrate_sqlite.py # One-off copy of old SQLite data into Supabase
└── frontend/                 # Next.js dashboard
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

Data lives in one Supabase table, `public.expenses`:

| Column | Type | Notes |
|---|---|---|
| `id` | bigint | Primary key, auto-generated |
| `amount_paise` | bigint | Must be greater than 0 |
| `category` | text | One of the categories above |
| `note` | text | Defaults to empty |
| `spent_at` | date | Defaults to today |
| `created_at` | timestamptz | Defaults to `now()` |

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

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

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

## Project status

The backend is working. The frontend dashboard is still in progress: it currently shows sample data, and the "Add expense" and "View all" actions are not wired up yet.

## Troubleshooting

Free-tier Supabase projects pause after a period of inactivity. If the tools fail with a database connection or "tenant or user not found" error, open the Supabase dashboard and restore the project, then try again.

## Author

Saket Kumar — [GitHub](https://github.com/SaketKumarp)
