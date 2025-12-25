import { useLocation, useNavigate, Navigate } from "react-router-dom";
import api from "../api/axios";

export default function Pay() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <Navigate to="/" />;
  }

  const { eventId, seatIds } = state;

  const payNow = async () => {
    const res = await api.post(
      `/api/events/${eventId}/razorpay-order/`,
      { seat_ids: seatIds }
    );

    const options = {
      key: res.data.key,
      amount: res.data.amount * 10,
      currency: "INR",
      name: "Ticket Booking",
      description: "Event Tickets",
      order_id: res.data.order_id,
      handler: async function (response) {
        await api.post("/api/razorpay/verify/", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          seat_ids: seatIds,
        });

        navigate("/my-tickets");
      },
      theme: { color: "#16a34a" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-container">
      <h2>Complete Payment</h2>
      <button className="pay-btn" onClick={payNow}>
        Pay with Razorpay
      </button>
    </div>
  );
}
