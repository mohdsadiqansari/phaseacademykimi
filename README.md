# Phase Academy Website

A full-stack React application built with Vite, React, Hono, Drizzle ORM, and TRPC. 
Designed to run entirely on **100% Free Tier Services**.

## 🚀 Free Tier Tech Stack

This project is configured to run out-of-the-box on the following free-tier services:

- **Hosting / Deployment:** [Vercel](https://vercel.com) (Free "Hobby" Tier)
- **Database (MySQL):** [TiDB Serverless](https://tidbcloud.com/) (5GB Free) OR [Aiven for MySQL](https://aiven.io/mysql) (Free Tier)
- **Storage (S3 Compatible):** [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) (10GB Free/month) OR [Supabase Storage](https://supabase.com/storage) (Free Tier)
- **Authentication:** Native, built-in Email/Password Auth (100% Free, infinite users)

## 📦 Setting up the Free Services

### 1. Database (TiDB Serverless)
1. Go to [TiDB Cloud](https://tidbcloud.com/) and create a free Serverless cluster.
2. Get your connection string (format: `mysql://<user>:<password>@<host>:<port>/<database>`).
3. Set the `DATABASE_URL` in your `.env`.

### 2. File Storage (Cloudflare R2)
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) > R2.
2. Create a new bucket.
3. Generate R2 API Tokens (Access Key and Secret Key).
4. Set the `S3_` environment variables in your `.env`.

### 3. Vercel Deployment
1. Import this repository into Vercel.
2. Add all the environment variables from `.env.example`.
3. Set the Build Command to `npm run build`.
4. Deploy!

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment variables template and fill them in
cp .env.example .env

# 3. Generate database schema & push to the DB
npm run db:generate
npm run db:push

# 4. Start the development server
npm run dev
```

## 🛠 Features

- **Courses Management:** Full CRUD operations for tech courses.
- **Image Gallery:** S3-backed gallery upload via presigned URLs.
- **Admin Dashboard:** Secure admin panel using TRPC & Hono APIs.
- **Authentication:** Native Email/Password with Bcrypt hashing and secure cookies.
- **Tailwind CSS & Shadcn:** Fully customizable beautiful UI components.
