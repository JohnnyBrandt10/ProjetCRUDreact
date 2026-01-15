import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://johnnybrandt10:REAL%40MADRID@cluster0.dj17p.mongodb.net/crud0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));
