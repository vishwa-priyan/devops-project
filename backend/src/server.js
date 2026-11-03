const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;
const APP_VERSION = process.env.APP_VERSION || "1.0.1";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DevOps CI/CD Application",
    version: APP_VERSION,
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Backend is running",
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    application: "DevOps Deployment Monitor",
    environment: process.env.NODE_ENV || "development",
    version: APP_VERSION,
  });
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
