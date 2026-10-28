# Rajarshi Dash — Full-Stack Portfolio

A responsive personal portfolio built with HTML, CSS, vanilla JavaScript, Node.js, Express, and MongoDB.

## Features
- Responsive, mobile-first portfolio UI
- Profile, skills, and project data loaded from REST API
- Contact form with server-side validation and MongoDB storage
- Optional email notifications via SMTP (Nodemailer)
- MVC-style backend structure
- Helmet security headers, rate limiting, CORS configuration, and environment variables
- Demo portfolio data when MongoDB is not configured, so the UI can be previewed locally

## Requirements
- Node.js 20+
- MongoDB Atlas account or local MongoDB (optional for demo mode)
- SMTP credentials for email notifications (optional)

## Run locally
1. Install Node.js from https://nodejs.org/
2. Open a terminal in the `backend` folder.
3. Copy `.env.example` to `.env` and fill in the values you have.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Visit http://localhost:3000

The Express server serves the frontend and API together.

## Environment variables
See `backend/.env.example`. Never commit `.env` or real credentials.

## API endpoints
- `GET /api/health`
- `GET /api/profile`
- `GET /api/skills`
- `GET /api/projects`
- `POST /api/contact`

## Deploy
Deploy the repository to a Node.js hosting provider (for example Render or Railway), set the environment variables in its dashboard, and connect a MongoDB Atlas database. Set `NODE_ENV=production` and `CLIENT_ORIGIN` to your public site URL if you host the frontend separately.

## Before publishing
Replace the sample biography, email, skills, and sample projects with accurate information. Do not claim experience, education, or projects that are not yours.
