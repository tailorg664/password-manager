import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/database.js";
import http from "http";

dotenv.config();
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("the error is: ",err.message);
  });
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
import authRoutes from "./src/routes/authRoute.js";
app.use("/api/auth", authRoutes);

//listening to server
server.listen(5000, () => {
  console.log("Server is running on port 6000");
});
