import express from "express";
import crypto from "crypto";
import { razorpay } from "./../utlis/razorpay.js";
 
import Payment from "../models/payment.js";

const router = express.Router();


//   CREATE ORDER – FIXED ₹100

router.post("/create-order", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: 100 * 100,
    currency: "INR",
    receipt: "receipt_100_test",
  });

  await Payment.create({
    orderId: order.id,
    amount: 100,
    status: "created",
  });

  res.json({ success: true, order });
});

/**
 * VERIFY PAYMENT
 */
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  await Payment.findOneAndUpdate(
    { orderId: razorpay_order_id },
    {
      paymentId: razorpay_payment_id,
      status: "paid",
      source: "handler",
    }
  );

  res.json({ success: true });
});

router.get("/status", async (req, res) => {
  const payments = await Payment.find().sort({ createdAt: -1 });
  res.json(payments);
});


export default router;
