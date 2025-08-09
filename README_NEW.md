# 💰 Xpense - Modern Expense Management System

![Xpense Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.0.4-black) ![React](https://img.shields.io/badge/React-18-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

A comprehensive expense management application built with Next.js, featuring advanced transaction management, category organization, and financial analytics.

## 🚀 Live Demo

- **Backend API**: https://xpense-backend-production.up.railway.app/
- **Frontend**: http://localhost:3000 (Development)

## ✨ Key Features

### 💳 **Advanced Transaction Management**

- **Complete CRUD Operations**: Create, read, update, and delete transactions
- **Smart Filtering**: Filter by type, category, date range, and amount
- **Pagination Support**: Handle large datasets efficiently
- **Real-time Updates**: Instant updates across all components
- **Bulk Operations**: Manage multiple transactions at once

### 📊 **Financial Analytics & Statistics**

- **Dashboard Overview**: Real-time balance and spending summaries
- **Category Analysis**: Detailed breakdown of expenses by category
- **Visual Charts**: Interactive pie charts and bar graphs
- **Trend Analysis**: Monthly and yearly financial trends
- **Export Capabilities**: PDF and CSV export options

### 🏷️ **Smart Category Management**

- **Custom Categories**: Create personalized expense categories
- **Icon & Color Support**: Visual category identification with emojis and colors
- **Usage Statistics**: Track how often categories are used
- **Default Categories**: Pre-built categories for common expenses
- **Category Filtering**: Dynamic filtering in transaction forms

### 👤 **Comprehensive Profile Management**

- **Personal Information**: Full name, phone, and address management
- **Security Settings**: Secure password change functionality
- **Profile Validation**: Comprehensive form validation
- **Modern UI**: Clean, responsive profile interface

### 🔐 **Robust Authentication System**

- **JWT Authentication**: Secure token-based authentication
- **Auto Token Refresh**: Seamless session management
- **Password Security**: Secure password hashing and validation
- **Session Persistence**: Remember login across browser sessions

## 🛠️ Technology Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 18** - Modern React with hooks and concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant forms with validation
- **Lucide React** - Beautiful icon library

### **Backend Integration**

- **REST API** - Railway-hosted backend API
- **JWT Authentication** - Secure token-based auth
- **Real-time Updates** - Optimistic UI updates
- **Error Handling** - Comprehensive error management

### **UI/UX**

- **Radix UI** - Accessible component primitives
- **Responsive Design** - Mobile-first approach
- **Loading States** - Smooth user experience
- **Error Boundaries** - Graceful error handling

## 📁 Project Structure

```
xpense/
├── app/                          # Next.js app router pages
│   ├── dashboard/               # Dashboard page
│   ├── transactions/            # Transaction management page
│   ├── profile/                 # User profile page
│   ├── login/                   # Authentication pages
│   └── signup/
├── src/
│   ├── components/
│   │   ├── organisms/           # Complex components
│   │   │   ├── TransactionManager.jsx    # Main transaction system
│   │   │   ├── TransactionForm.jsx       # Transaction creation/editing
│   │   │   ├── TransactionFilters.jsx    # Advanced filtering
│   │   │   ├── TransactionStats.jsx      # Analytics dashboard
│   │   │   ├── CategoryManager.jsx       # Category management
│   │   │   └── TransactionListView.jsx   # Enhanced list display
│   │   ├── molecules/           # Reusable components
│   │   └── atoms/              # Basic UI elements
│   ├── store/                   # Zustand state management
│   └── supabase/               # Legacy (removed)
├── utils/
│   ├── api.js                  # Comprehensive API integration
│   ├── auth.js                 # Authentication utilities
│   └── database.js             # Database operation wrappers
├── components/ui/              # Radix UI components
├── public/                     # Static assets
└── docs/                       # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Adith-628/xpense.git
cd xpense
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Create .env.local file
NEXT_PUBLIC_API_BASE_URL=https://xpense-backend-production.up.railway.app
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

```bash
# Navigate to
http://localhost:3000
```

## 🎯 Usage Guide

### **Getting Started**

1. **Create Account**: Sign up with email and password
2. **Complete Profile**: Add personal information
3. **Add Categories**: Create custom expense categories
4. **Start Tracking**: Begin adding your transactions

### **Managing Transactions**

- **Quick Add**: Use the floating action button
- **Bulk Import**: Import from CSV files
- **Smart Filters**: Find transactions quickly
- **Edit & Delete**: Manage existing transactions

### **Financial Analytics**

- **Dashboard View**: Get overview of your finances
- **Category Analysis**: See where your money goes
- **Trend Analysis**: Track spending patterns
- **Export Data**: Download reports

## 🔧 Development

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

### **Code Structure**

- **Components**: Modular, reusable React components
- **State Management**: Zustand for global state
- **API Layer**: Centralized API communication
- **Styling**: Tailwind CSS with custom components

## 🔐 API Integration

### **Authentication Endpoints**

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh

### **Transaction Endpoints**

- `GET /api/transactions` - List transactions (with filters)
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/stats/summary` - Get statistics

### **Category Endpoints**

- `GET /api/categories` - List all categories
- `POST /api/categories/custom` - Create custom category
- `PUT /api/categories/custom/:id` - Update category
- `DELETE /api/categories/custom/:id` - Delete category

## 📱 Features in Detail

### **Transaction Management**

- ✅ Create income and expense transactions
- ✅ Edit existing transactions
- ✅ Delete transactions with confirmation
- ✅ Filter by type, category, date range
- ✅ Paginated transaction listing
- ✅ Search functionality
- ✅ Real-time balance updates

### **Category System**

- ✅ Default system categories
- ✅ Custom user categories
- ✅ Category icons and colors
- ✅ Category usage statistics
- ✅ Bulk category management

### **Analytics Dashboard**

- ✅ Total income/expense summaries
- ✅ Net balance calculations
- ✅ Category-wise breakdowns
- ✅ Monthly trend analysis
- ✅ Visual charts and graphs

### **User Experience**

- ✅ Responsive design (mobile-first)
- ✅ Dark/light mode support
- ✅ Loading states and spinners
- ✅ Error handling and messages
- ✅ Smooth animations and transitions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive form validation
- **HTTPS Only**: Secure data transmission
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API abuse prevention
- **Error Handling**: Secure error messages

## 📈 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching Strategy**: Efficient API response caching
- **Lazy Loading**: Components loaded on demand
- **Bundle Analysis**: Optimized bundle sizes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Adith-628](https://github.com/Adith-628)
- **Backend API**: Railway-hosted Node.js backend
- **Design System**: Custom Tailwind CSS components

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Excellent deployment platform
- **Railway** - Reliable backend hosting
- **Tailwind CSS** - Beautiful utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide** - Beautiful icon library

---

**Built with ❤️ by the Xpense Team**

_Manage your expenses with style and intelligence._
