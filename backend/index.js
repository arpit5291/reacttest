require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const REACT_DEV_SERVER = "http://localhost:5291";

// Middleware
app.use(cors());
app.use(express.json());

// Proxy API requests (if needed)
app.use("/api", (req, res) => {
    res.json({ message: "API is working" });
});

// Serve React app in development mode
app.use(
    createProxyMiddleware({
        target: REACT_DEV_SERVER,
        changeOrigin: true,
        ws: true,
    })
);

// Start server
app.listen(PORT, () => {
    console.log(`Server running in development mode on http://localhost:${PORT}`);
});
