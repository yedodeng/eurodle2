# Eurodle

Eurodle is a web-based game inspired by Wordle, built around European geography. Test your knowledge and challenge yourself to identify locations through an interactive guessing game.

## Features

- Interactive guessing gameplay
- Responsive interface for desktop and mobile
- Supabase integration for database functionality
- Deployed with Vercel

## Tech Stack

- **Frontend:** React
- **Database:** [Supabase / PostgreSQL]
- **Hosting:** Vercel
- **Source Control:** GitHub

## Getting Started

### Prerequisites

- Node.js version 24 
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/yedodeng/eurodle2.git
cd eurodle2
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and add the environment variables required by the application.

Example for a Next.js project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key
```

Use the variable names expected by your code. Never commit database passwords, service-role keys, or other secrets to GitHub.

### Run Locally

```bash
npm run dev
```

Open the local URL printed in your terminal, usually http://localhost:3000 for Next.js or http://localhost:5173 for Vite.

## Deployment

The project can be deployed through Vercel:

1. Import the GitHub repository into Vercel.
2. Configure the required environment variables.
3. Deploy the project.
4. Verify the production website and its Supabase connection.
