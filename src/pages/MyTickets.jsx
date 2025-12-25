import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/tickets.css";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/my-tickets/")
      .then((res) => setTickets(res.data))
      .catch(() => setError("Failed to load tickets"));
  }, []);

  const refundTicket = async (ticketId) => {
    if (!window.confirm("Are you sure you want to refund this ticket?")) return;

    try {
      await api.post(`/api/tickets/${ticketId}/refund/`);
      alert("Refund initiated successfully");
      setTickets((prev) => prev.filter((t) => t.id !== ticketId));
    } catch (err) {
      alert(err.response?.data?.error || "Refund failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="tickets-page">
        <h2>My Tickets</h2>

        {error && <p className="page-msg error">{error}</p>}

        {tickets.length === 0 && (
          <p className="page-msg">No tickets found</p>
        )}

        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h3>{ticket.event}</h3>
              <p>🎟 Seat: {ticket.seat}</p>
              <p>📅 Date: {ticket.date}</p>

              <img
                src={`http://localhost:8000${ticket.qr}`}
                alt="QR Code"
                className="qr-img"
              />

              <button
                className="refund-btn"
                onClick={() => refundTicket(ticket.id)}
              >
                Refund
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
