# 🚀 Supabase Setup Guide for TechConnect

## 📋 Prerequisites
1. A Supabase account (free at [supabase.com](https://supabase.com))
2. Node.js and npm installed

## 🔧 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name:** `techconnect-app`
   - **Database Password:** Choose a strong password
   - **Region:** Select closest to your users
5. Click "Create new project"
6. Wait for project to be created (2-3 minutes)

## 🔑 Step 2: Get Project Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## ⚙️ Step 3: Update Environment Variables

1. Open `.env.local` file in your project
2. Replace the placeholder values:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🗄️ Step 4: Database Schema Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'Entrepreneur',
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, username, full_name, avatar)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        COALESCE(
            (SELECT string_agg(UPPER(substr(word, 1, 1)), '') 
             FROM regexp_split_to_table(
                 COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), 
                 '\s+'
             ) AS word
            ), 
            'U'
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;
GRANT ALL ON public.user_profiles_id_seq TO anon, authenticated;
```

## 🔐 Step 5: Authentication Settings

1. Go to **Authentication** → **Settings**
2. Configure:
   - **Site URL:** `http://localhost:5173` (for development)
   - **Redirect URLs:** `http://localhost:5173/**`
3. Go to **Authentication** → **Providers**
4. Enable **Email** provider
5. Configure email templates if needed

## 🧪 Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Try to register a new account
3. Try to login with the new account
4. Check the database to see if user profiles are created

## 🚨 Troubleshooting

### Common Issues:
1. **CORS Error:** Check your site URL and redirect URLs in Supabase
2. **RLS Policy Error:** Ensure all policies are created correctly
3. **Environment Variables:** Make sure `.env.local` is in your project root
4. **Build Issues:** Restart your dev server after adding environment variables

### Check Database:
- Go to **Table Editor** in Supabase
- Verify `user_profiles` table exists
- Check if new users are being created

## 📱 Next Steps

After setup:
1. Test user registration and login
2. Customize user roles and permissions
3. Add additional user profile fields
4. Implement password reset functionality
5. Add social authentication providers

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Functions](https://supabase.com/docs/guides/database/functions)
