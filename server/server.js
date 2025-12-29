import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentroutes.js";
import razorpayWebhookRoute from "./routes/razorpayWebhook.js"; // ✅ ADD THIS

const app = express();
const port = process.env.PORT || 4000;

connectDB();

/* ===============================
   🔔 WEBHOOK MUST COME FIRST
=============================== */
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhookRoute
);

/* ===============================
   NORMAL MIDDLEWARES
=============================== */
const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/* ===============================
   API ROUTES
=============================== */
app.get("/", (req, res) => res.send("API Working"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/user", userRouter);
app.use("/api/payment", paymentRoutes);

/* ===============================
   START SERVER
=============================== */
app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`);
});
