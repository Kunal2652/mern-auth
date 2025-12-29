import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Payment = () => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handlePayment = async () => {
    const { data } = await axios.post(
      backendUrl + "/api/payment/create-order"
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      name: "Webhook Test",
      description: "Fixed ₹100 Payment",
      order_id: data.order.id,
      handler: async function (response) {
        await axios.post(
          backendUrl + "/api/payment/verify-payment",
          response
        );
        alert("Payment successful & verified");
      },
      theme: { color: "#0f172a" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

 return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="p-6 rounded-lg shadow bg-white text-center">
      <h2 className="text-xl font-semibold mb-2">Test Payment</h2>
      <p className="mb-4 text-gray-600">Amount: ₹100</p>
      <button
        onClick={handlePayment}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Pay ₹100
      </button>
    </div>
  </div>
);
};
export default Payment;
