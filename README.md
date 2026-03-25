# Azure Microservices Lab

Cloud-native lab project with a Vite React frontend and a small Node.js gateway API. The frontend portal can check gateway health and retrieve sample items from the backend.

## Overview

- Frontend: React app in [frontend/src/App.jsx](frontend/src/App.jsx)
- Frontend entry: [frontend/index.html](frontend/index.html)
- Frontend config: [frontend/vite.config.js](frontend/vite.config.js)
- Gateway: Express API in [gateway/server.js](gateway/server.js)
- Package manifests: [frontend/package.json](frontend/package.json) and [gateway/package.json](gateway/package.json)

The gateway exposes two API endpoints used by the portal:

- `GET /health` returns a basic health status payload
- `GET /api/items` returns a sample item list

## Project Structure

```text
azure-microservices-lab/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
└── gateway/
    ├── Dockerfile
    ├── package.json
    └── server.js
```

## Prerequisites

- Node.js 18+ recommended
- npm

## Run the Gateway Locally

1. Open a terminal in the `gateway` folder.
2. Install dependencies:

```bash
npm install
```

3. Start the service:

```bash
npm start
```

By default, the gateway listens on port `3000` unless `PORT` is set.

## Run the React Frontend

1. Open a second terminal in the `frontend` folder.
2. Install dependencies:

```bash
npm install
```

3. Create a local `.env` file in `frontend/` from [frontend/.env.example](frontend/.env.example) and set the API URL if needed:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

4. Start the dev server:

```bash
npm run dev
```

The app will usually run at `http://localhost:5173`.

## Test the Gateway

With the service running, try these endpoints:

- `http://localhost:3000/`
- `http://localhost:3000/health`
- `http://localhost:3000/api/items`

Example responses:

- `/` returns a plain text confirmation message
- `/health` returns `{ "status": "ok" }`
- `/api/items` returns a small JSON array of sample items

## Frontend Environment Variable

The React app reads `VITE_API_BASE_URL` from the frontend environment and falls back to the deployed gateway URL if it is not set.

Create [frontend/.env](frontend/.env) locally from [frontend/.env.example](frontend/.env.example).

## CORS Notes

The gateway allows both the local Vite dev server and the deployed Static Web Apps origin by default. If you deploy the frontend elsewhere, update `FRONTEND_ORIGIN` in [gateway/.env.example](gateway/.env.example) or your real gateway `.env` file.

## Docker

The `gateway` folder includes a [Dockerfile](gateway/Dockerfile) for containerized deployment. Build and run it from the `gateway` directory if you want a local container workflow.

## Deployment Notes

- The frontend is now a React app built with Vite.
- The gateway is an Express service that can run locally, in Docker, or on Azure Container Apps.
- Make sure the frontend API URL and gateway CORS allowlist match the deployment environment.
