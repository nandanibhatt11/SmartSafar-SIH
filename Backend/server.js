import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import locationRoutes from "./routes/locationRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);



app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "YatraSense API is running",
  });
});

app.use("/api/locations", locationRoutes);
app.use("/api/cities", cityRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `YatraSense API running on http://localhost:${PORT}`
      );
      console.log(
        `Network access: http://172.20.138.23:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
}

startServer();