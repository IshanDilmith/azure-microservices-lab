require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const defaultOrigins = [
  "http://localhost:5173",
  "https://polite-sky-031eceb00.1.azurestaticapps.net"
];
const allowedOrigins = (process.env.FRONTEND_ORIGIN || defaultOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Gateway service is running successfully!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/items", (req, res) => {
  res.json([
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});