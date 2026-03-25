# Azure Microservices Lab

Simple lab project that pairs a static frontend with a small Node.js gateway API. The frontend is a single-page portal that calls the gateway for health checks and sample data.

## Overview

- Frontend: static HTML app in [frontend/index.html](frontend/index.html)
- Gateway: Express API in [gateway/server.js](gateway/server.js)
- Package manifest: [gateway/package.json](gateway/package.json)

The gateway exposes two API endpoints used by the portal:

- `GET /health` returns a basic health status payload
- `GET /api/items` returns a sample item list

## Project Structure

```text
azure-microservices-lab/
├── frontend/
│   └── index.html
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

## Test the Gateway

With the service running, try these endpoints:

- `http://localhost:3000/`
- `http://localhost:3000/health`
- `http://localhost:3000/api/items`

Example responses:

- `/` returns a plain text confirmation message
- `/health` returns `{ "status": "ok" }`
- `/api/items` returns a small JSON array of sample items

## Frontend

The frontend is a standalone HTML file with embedded styles and scripts. It calls a fixed gateway URL configured in the page script:

```text
https://gateway.yellowmeadow-18860117.southeastasia.azurecontainerapps.io
```

If you want to point the portal at a different gateway, update the `API_URL` constant in [frontend/index.html](frontend/index.html).

## CORS Notes

The gateway currently allows requests from a specific Azure Static Web Apps origin. If you run the frontend from another origin during development, update the CORS configuration in [gateway/server.js](gateway/server.js) to include your local or deployed frontend URL.

## Docker

The `gateway` folder includes a [Dockerfile](gateway/Dockerfile) for containerized deployment. Build and run it from the `gateway` directory if you want a local container workflow.

## Deployment Notes

- The frontend is designed to run as static hosting.
- The gateway is an Express service that can run locally, in Docker, or on Azure Container Apps.
- Make sure the frontend API URL and gateway CORS allowlist match the deployment environment.

## License

No license file is currently included in the repository.