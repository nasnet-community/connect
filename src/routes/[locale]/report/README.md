# VPN Credentials Dashboard

This section of the application provides a comprehensive dashboard for managing and analyzing L2TP VPN credentials that are distributed to users.

## Overview

The VPN Credentials Dashboard consists of the following pages:

1. **Overview** - Summary view of credential statistics and recent assignments
2. **Analytics** - Detailed analytics with visualizations of usage metrics
3. **Manage Credentials** - Full administrative interface for managing credentials

## Features

### Analytics

- Total credential count and usage statistics
- Distribution by platform and referrer
- Usage trends over time
- Export functionality for reports

### Credential Management

- View available credentials
- Assign credentials to users
- Create new credentials individually
- Bulk import credentials via CSV
- View credential details (username, password, server, etc.)

## Edge Functions

The dashboard relies on the following Supabase Edge Functions:

- `l2tp-credentials`: Existing edge function for serving credentials to users
- `credentials-report`: New edge function for generating reports and accessing analytics data

## Environment Variables

To run the dashboard, you need the following environment variables:

```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Schema

The dashboard works with the `l2tp_credentials` table that has the following structure:

```sql
CREATE TABLE IF NOT EXISTS public.l2tp_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  server TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expiry_date TIMESTAMPTZ,
  platform TEXT,
  referrer TEXT,
  is_assigned BOOLEAN DEFAULT FALSE,
  session_id TEXT
);
```

## API Integration

The dashboard integrates with Supabase via:

1. Direct database access using the `createClient` from `@supabase/supabase-js`
2. API routes that proxy requests to Supabase Edge Functions
3. Server-side data loading with Qwik's `routeLoader$`

## Deployment

The VPN Credentials Dashboard is designed to be deployed as part of the Connect application on Vercel. The Supabase Edge Functions should be deployed to your Supabase project. 