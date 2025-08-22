# TechConnect - Modern Startup Platform

A comprehensive platform designed for entrepreneurs and innovators to connect, validate ideas, and access AI-powered business tools.

## 🚀 Features

- **User Authentication** - Secure login/signup with Supabase
- **AI-Powered Tools** - Business idea generation and validation
- **Interactive Diagrams** - Visual business model canvas
- **News Feed** - Latest startup and tech news
- **Market Trends** - Real-time market insights
- **Career Guidance** - Professional development tools

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (Supabase)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Testing**: Jest

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd techconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run the SQL script in your Supabase SQL Editor:
   ```bash
   # See setup-database.sql for the complete schema
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

1. Create a new Supabase project
2. Run the SQL commands from `setup-database.sql` in your Supabase SQL Editor
3. Configure authentication settings in your Supabase dashboard

For detailed setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) and [DATABASE_SETUP_STEPS.md](./DATABASE_SETUP_STEPS.md).

## 🎯 Demo Login

For testing purposes, you can use:
- **Email**: kaushik77@gmail.com
- **Password**: demo123

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── business/       # Business tools
│   └── shared/         # Shared UI components
├── lib/                # Utilities and configurations
└── testing/            # Test utilities
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

### Recommended Platforms
- Vercel
- Netlify
- GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React and TypeScript
- UI components inspired by modern design systems
- Powered by Supabase for backend services

## 📧 Contact

For questions or support, please open an issue in this repository.

---

**Made with ❤️ for the startup community**