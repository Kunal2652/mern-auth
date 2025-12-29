import express from "express";
import crypto from "crypto";
import Payment from "../models/payment.js";

const router = express.Router();

router.post("/razorpay", async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("❌ Invalid webhook signature");
      return res.status(400).json({ success: false });
    }

    const event = JSON.parse(req.body.toString());

    console.log("✅ Webhook received:", event.event);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      await Payment.findOneAndUpdate(
        { paymentId: payment.id },
        {
          status: "paid",
          source: "webhook",
        }
      );

      console.log("✅ Payment updated via webhook");
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ success: false });
  }
});

export default router;
