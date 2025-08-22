import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create Supabase client if environment variables are properly configured
export const supabase = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key'
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null

export const isSupabaseConfigured = () => {
  return supabase !== null
}

export interface UserProfile {
  id: string
  email: string
  username: string
  full_name: string
  role: string
  avatar: string
  created_at: string
  updated_at: string
}

// Helper function to get current user
export const getCurrentUser = async () => {
  if (!supabase) return null
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) return null
  return user
}

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) return null
  return data
}

// Helper function to update user profile
export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) return null
  return data
}