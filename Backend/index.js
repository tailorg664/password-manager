import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/database.js";
import http from "http";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("the error is: ", err.message);
  });
const app = express();
const server = http.createServer(app);
const origin = process.env.CORS_ORIGIN;
const extensionOrigin = process.env.EXTENSION_ID;
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [origin, extensionOrigin];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// Routes
import authRoutes from "./src/routes/authRoute.js";
import passwordRoute from "./src/routes/passwordRoute.js";
app.use("/api/auth", authRoutes);
app.use("/api/home", passwordRoute);
//listening to server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
