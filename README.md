# ElectroStore - E-commerce Platform

A modern e-commerce platform built with Next.js, Prisma, and PostgreSQL.

## Features

- 🛍️ Product catalog with categories and search
- 👤 User authentication (Admin & Buyer roles)
- 📊 Admin dashboard with analytics
- 💳 Transaction management
- 📱 Responsive design
- 🔒 Secure authentication with JWT

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd electrostore
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database URL and JWT secret:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/electrostore"
JWT_SECRET="your-super-secret-jwt-key"
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment to Vercel

### 1. Database Setup

First, set up a PostgreSQL database. You can use:
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [PlanetScale](https://planetscale.com/)
- [Railway](https://railway.app/)

### 2. Environment Variables

In your Vercel dashboard, add these environment variables:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### 3. Deploy

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy!

Vercel will automatically:
- Install dependencies
- Generate Prisma client
- Build the application
- Deploy to production

### 4. Database Migration

After deployment, run the database migration:

```bash
npx prisma migrate deploy
```

## Demo Accounts

- **Admin**: admin@electrostore.com / admin123
- **Buyer**: buyer@electrostore.com / buyer123

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   └── ...                # Other pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── admin/            # Admin-specific components
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## API Routes

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/products` - Get products (with pagination, search, filters)
- `POST /api/products` - Create product (admin only)
- `GET /api/admin/analytics` - Get dashboard analytics
- `GET /api/admin/transactions` - Get all transactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.