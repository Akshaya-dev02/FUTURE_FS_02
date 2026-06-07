# CRM Website

A creative and user-friendly CRM website built with a React-based frontend and a Node.js/Express backend.

## Features

- Lead capture and management
- Client information storage
- Lead status tracking (New, Contacted, Converted)
- Notes and follow-ups
- Login and registration pages for admin access using email and secure password rules

## Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000`

## Notes

The server is configured to use MongoDB. Set the `MONGODB_URI` environment variable if you want actual persistence. Without it, the backend still runs and serves the frontend.
