# Xpense - Personal Expense Tracker

Xpense helps you track your income, spending, and budget effortlessly. Categorize transactions, analyze spending trends, and stay financially organized.

This is a [Next.js](https://nextjs.org) project that connects to a REST API backend for data management.

## Features

- 🔐 User Authentication (Register, Login, Logout)
- 💰 Transaction Management (Add, View, Edit, Delete)
- 📊 Expense Analytics and Statistics
- 🏷️ Category Management (Default + Custom Categories)
- 📱 Responsive Mobile-First Design
- 🔒 Secure JWT Authentication

## Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI, Lucide React
- **Forms**: React Hook Form
- **Charts**: Recharts, ApexCharts

## Backend API

This frontend connects to the Xpense Backend API deployed at:
`https://xpense-backend-production.up.railway.app/`

The API provides secure endpoints for:

- User authentication and profile management
- Transaction CRUD operations
- Category management
- Statistics and analytics

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd xpense
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` if needed (API URL is pre-configured)

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for the backend API (defaults to production URL)

## API Integration

The app uses a custom API utility (`utils/api.js`) that handles:

- Authentication tokens (stored in localStorage)
- HTTP requests with proper headers
- Error handling and response parsing
- Automatic token refresh

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Small reusable components
│   ├── molecules/      # Component combinations
│   └── organisms/      # Complex feature components
├── store/             # Zustand state management
└── database/          # Database schema (reference)

utils/
├── api.js            # API utility functions
├── auth.js           # Authentication helpers
└── database.js       # Database operation wrappers

app/                  # Next.js app router pages
├── dashboard/        # Main dashboard
├── login/           # Authentication
├── signup/          # User registration
├── profile/         # User profile
└── transactions/    # Transaction history
```

## Key Components

- **AddTransaction**: Modal form for creating new transactions
- **TransactionList**: Display recent transactions
- **BalanceCard**: Show current balance and spending
- **Header**: Navigation and user info
- **LoginForm/SignupForm**: Authentication forms

## Authentication Flow

1. User registers/logs in through the API
2. JWT token is stored in localStorage
3. Token is automatically included in API requests
4. User profile is fetched and stored in Zustand state
5. Protected routes check for valid authentication

## API Endpoints Used

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/protected/profile` - Get user profile

### Transactions

- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/stats/summary` - Get statistics

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories/custom` - Create custom category

## Building for Production

```bash
npm run build
npm start
```

## Deployment

The app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **AWS/GCP/Azure**

Make sure to set the `NEXT_PUBLIC_API_BASE_URL` environment variable in your deployment platform.

## Changes from Previous Version

- ✅ Removed Supabase integration
- ✅ Removed Firebase dependencies
- ✅ Implemented REST API integration
- ✅ Updated authentication flow
- ✅ Migrated to JWT token-based auth
- ✅ Updated all CRUD operations
- ✅ Maintained existing UI/UX

## License

This project is licensed under the MIT License.
