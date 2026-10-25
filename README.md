# Pocketwise — Personal Expense Tracker

Pocketwise is a personal expense tracker built with FastMCP, Supabase PostgreSQL, and Next.js. It helps you track expenses in Indian rupees (₹) through MCP tools and a modern dashboard.

## Screenshots

### Dashboard
 <img width="900" height="600" alt="Screenshot 2026-10-26 at 01 18 38" src="https://github.com/user-attachments/assets/c8d3b843-fd86-4ae3-914f-86ef74a9a53f" />


### Supabase Database
 <img width="900" height="600" alt="Screenshot 2026-10-26 at 01 18 35" src="https://github.com/user-attachments/assets/7bb32e80-de80-45cc-8a58-fe288d0bb08b" />


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
