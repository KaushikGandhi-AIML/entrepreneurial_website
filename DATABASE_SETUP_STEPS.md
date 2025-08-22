# 🗄️ Database Setup Steps for Supabase

## 🎯 **What We're Setting Up:**
- User authentication system
- User profiles table
- Row Level Security (RLS) policies
- Automatic user profile creation on signup

## 📋 **Step-by-Step Instructions:**

### **1. Open Your Supabase Dashboard**
- Go to: https://supabase.com/dashboard
- Sign in to your account
- Select your project: `agdmfcjhjmcogckmozpf`

### **2. Navigate to SQL Editor**
- In the left sidebar, click **"SQL Editor"**
- Click **"New Query"** button

### **3. Copy and Paste the SQL Script**
- Copy the entire content from `setup-database.sql`
- Paste it into the SQL Editor
- Click **"Run"** button

### **4. Verify the Setup**
- You should see: `"Database setup completed successfully!"`
- Check **"Table Editor"** in the left sidebar
- You should see a new `user_profiles` table

### **5. Test the Connection**
- Go back to your project directory
- Run: `node test-supabase.js`
- Should show: `✅ Database connection successful!`

## 🔐 **Authentication Settings (Important!)**

### **1. Go to Authentication → Settings**
- Set **Site URL:** `http://localhost:5174` (your current dev server port)
- Set **Redirect URLs:** `http://localhost:5174/**`

### **2. Go to Authentication → Providers**
- Ensure **Email** provider is enabled
- You can customize email templates if needed

## 🧪 **Testing Your Setup**

### **1. Test User Registration**
- Go to your app: http://localhost:5174
- Click **"Sign up here"**
- Create a new account
- Check Supabase dashboard → **Authentication → Users**

### **2. Test User Login**
- Try logging in with your new account
- Check if user profile was created in **Table Editor**

### **3. Check Database**
- Go to **Table Editor** → `user_profiles`
- You should see your new user record

## 🚨 **Troubleshooting**

### **If you get errors:**
1. **"Table already exists"** - This is fine, the script handles it
2. **"Permission denied"** - Check if you're logged into the right Supabase account
3. **"Connection failed"** - Verify your `.env.local` credentials

### **Common Issues:**
- **CORS errors:** Check your site URL in Authentication settings
- **RLS policy errors:** Ensure all policies were created
- **Trigger errors:** The script handles existing triggers

## ✅ **What You'll Have After Setup:**

1. **Secure User Authentication** with Supabase Auth
2. **User Profile Management** with database storage
3. **Automatic Profile Creation** when users sign up
4. **Row Level Security** protecting user data
5. **Professional User Management** system

## 🎉 **Success Indicators:**

- ✅ `setup-database.sql` runs without errors
- ✅ `user_profiles` table appears in Table Editor
- ✅ `node test-supabase.js` shows successful connection
- ✅ New user registration works in your app
- ✅ User profiles are created automatically

## 🔗 **Next Steps After Setup:**

1. Test user registration and login
2. Customize user roles and permissions
3. Add additional profile fields if needed
4. Implement password reset functionality
5. Add social authentication providers

---

**Need Help?** Check the Supabase documentation or run into issues? The setup script handles most common scenarios automatically! 🚀
