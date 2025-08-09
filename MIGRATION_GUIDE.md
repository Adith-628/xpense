# Migration Guide - Supabase to REST API

## Overview

This guide explains the migration from Supabase to a REST API backend for the Xpense application.

## What Changed

### Authentication

- **Before**: Supabase Auth with session management
- **After**: JWT-based authentication with Railway backend
- **Impact**: Users need to log in again after the migration

### Data Storage

- **Before**: Supabase PostgreSQL database
- **After**: Railway-hosted backend API
- **Impact**: All data is now managed through REST endpoints

### Real-time Features

- **Before**: Supabase real-time subscriptions
- **After**: Manual refresh and optimistic updates
- **Impact**: Data updates require explicit refresh

## Breaking Changes

### Component API Changes

1. **TransactionList.jsx**: Enhanced with filtering and pagination
2. **Profile Management**: Complete redesign with password changes
3. **Authentication Flow**: New JWT-based login process

### Store Changes

```javascript
// Old Zustand store
{
  user: null,
  transactions: [],
  // Limited state management
}

// New enhanced store
{
  user: null,
  transactions: [],
  pagination: {},
  filters: {},
  transactionStats: {},
  loading: boolean,
  // Comprehensive state management
}
```

## Migration Steps for Developers

### 1. Update Dependencies

```bash
# Remove Supabase dependencies (already done)
npm uninstall @supabase/supabase-js

# Ensure all new dependencies are installed
npm install
```

### 2. Update Environment Variables

```bash
# Remove old Supabase variables
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Add new API base URL
NEXT_PUBLIC_API_BASE_URL=https://xpense-backend-production.up.railway.app
```

### 3. Authentication Updates

- All users need to create new accounts or log in again
- Previous sessions are invalid
- JWT tokens are now managed automatically

### 4. Data Migration

- Previous Supabase data needs to be migrated to the new backend
- Contact backend team for data migration procedures
- Ensure user accounts are recreated in the new system

## New Features Available

### Enhanced Transaction Management

- Advanced filtering by type, category, date range
- Pagination for large datasets
- Real-time statistics and analytics
- Bulk operations support

### Comprehensive Profile Management

- Full profile editing capabilities
- Password change functionality
- Enhanced security settings

### Category Management

- Custom category creation and management
- Category usage statistics
- Dynamic category filtering

### Analytics Dashboard

- Financial overview with charts
- Category-wise spending analysis
- Monthly and yearly trends
- Export capabilities

## Testing the Migration

### 1. Authentication Test

```javascript
// Test login flow
1. Visit /login
2. Create new account or use existing credentials
3. Verify JWT token storage
4. Test auto-refresh functionality
```

### 2. Transaction Management Test

```javascript
// Test CRUD operations
1. Create new transaction
2. Filter transactions by category/type
3. Edit existing transaction
4. Delete transaction
5. Verify pagination works
```

### 3. Profile Management Test

```javascript
// Test profile features
1. Update profile information
2. Change password
3. Verify data persistence
```

## Troubleshooting

### Common Issues

#### Authentication Problems

```bash
# Clear browser storage
localStorage.clear();
sessionStorage.clear();

# Restart development server
npm run dev
```

#### API Connection Issues

```bash
# Verify API base URL
console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

# Check network requests in browser DevTools
```

#### Component Errors

```bash
# Verify all new components are imported correctly
# Check for missing dependencies
# Review console errors
```

## Performance Considerations

### Before Migration

- Real-time subscriptions provided instant updates
- Direct database access was faster
- Less network requests

### After Migration

- Manual refresh required for updates
- REST API adds network latency
- Better error handling and retry mechanisms

## Security Improvements

### JWT Authentication Benefits

- More secure token management
- Automatic token refresh
- Better session control
- Improved error handling

### API Security

- Centralized authentication
- Better rate limiting
- Comprehensive input validation
- Secure password handling

## Support and Issues

### Where to Get Help

1. Check this migration guide
2. Review the main documentation
3. Check console errors for specific issues
4. Contact the development team

### Known Limitations

1. No real-time updates (requires manual refresh)
2. Initial login required for all users
3. Previous data may need manual migration

## Rollback Plan

If critical issues arise:

1. Keep the old Supabase code in version control
2. Revert to previous commit if necessary
3. Restore Supabase configuration
4. Communicate with users about the rollback

---

_This migration represents a significant improvement in the application's architecture, security, and feature set. While it requires some initial setup, the benefits include better scalability, enhanced security, and more comprehensive functionality._
