
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentStatus = () => {
  const [payments, setPayments] = useState([]);
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

 useEffect(() => {
  axios.get(backendUrl + "/api/payment/status").then((res) => {
    setPayments(res.data);
  });
}, []);


  return (
  <div className="min-h-screen p-6 max-w-2xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Payment Status</h2>

    {payments.length === 0 && (
      <p className="text-gray-500">No payments found</p>
    )}

    {payments.map((p) => (
      <div
        key={p._id}
        className="border p-4 rounded mb-3 bg-white shadow-sm"
      >
        <p><b>Order:</b> {p.orderId}</p>
        <p><b>Status:</b> {p.status}</p>
        <p><b>Updated By:</b> {p.source}</p>
      </div>
    ))}
  </div>
);

};

export default PaymentStatus;
