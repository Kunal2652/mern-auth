import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  amount: Number,
  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },
  source: {
    type: String,
    enum: ["handler", "webhook"],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
