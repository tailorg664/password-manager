import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/database.js";
import http from "http";
import cookieParser from 'cookie-parser';
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

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
// Routes
import authRoutes from "./src/routes/authRoute.js";
import passwordRoute from "./src/routes/passwordRoute.js";
app.use("/api/auth", authRoutes);
app.use("/api/home",passwordRoute);
//listening to server
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
