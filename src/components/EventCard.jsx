import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>📍 {event.location}</p>
      <p>🎟 Available Seats: {event.available_seats}</p>

      <button onClick={() => navigate(`/events/${event.id}/seats`)}>
        Book Ticket
      </button>
    </div>
  );
}
