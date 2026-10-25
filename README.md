# Pocketwise — Personal Expense Tracker

Pocketwise is a personal expense tracker built with FastMCP, Supabase PostgreSQL, and Next.js. It helps you track expenses in Indian rupees (₹) through MCP tools and a modern dashboard.

## Screenshots

### Dashboard
![Pocketwise Dashboard](docs/screenshots/dashboard.png)

### Supabase Database
![Supabase Expenses Table](docs/screenshots/supabase-expenses.png)

## Features

- Add, list, and delete expenses using MCP tools.
- Filter expenses by date and category.
- View monthly spending summaries and category breakdowns.
- Store amounts in integer paise to avoid floating-point errors.
- Visualize spending through dashboard cards, charts, and transaction tables.

## Tech Stack

- **Backend:** Python, FastMCP, psycopg
- **Database:** Supabase PostgreSQL
- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide

## Project Structure

```text
Pocketwise/
├── backend/
│   └── src/
│       ├── main.py
│       └── migrate_sqlite.py
└── frontend/
    ├── app/
    ├── components/
    ├── hooks/
    └── public/
