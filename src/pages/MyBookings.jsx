import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/api/my-bookings/")
      .then((res) => setBookings(res.data));
  }, []);

  const refund = async (id) => {
    await api.post(`/api/bookings/${id}/refund/`);
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h2>My Tickets</h2>

        {bookings.map(b => (
          <div key={b.id}>
            🎫 {b.event_title} — {b.seats} seats
            <button onClick={() => refund(b.id)}>Refund</button>
          </div>
        ))}
      </div>
    </>
  );
}
