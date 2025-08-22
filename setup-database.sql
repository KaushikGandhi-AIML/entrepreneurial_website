-- 🚀 TechConnect Database Schema Setup
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security on auth.users
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

-- Create policies for user_profiles
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
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;

-- Create sequence for user_profiles if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS public.user_profiles_id_seq;

-- Grant permissions on sequence
GRANT USAGE, SELECT ON SEQUENCE public.user_profiles_id_seq TO anon, authenticated;

-- Insert some sample data for testing (optional)
-- INSERT INTO public.user_profiles (id, email, username, full_name, role, avatar) 
-- VALUES (
--     gen_random_uuid(),
--     'test@example.com',
--     'testuser',
--     'Test User',
--     'Entrepreneur',
--     'TU'
-- );

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;
