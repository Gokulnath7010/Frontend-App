import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import EventCard from "../components/EventCard";
import "../styles/events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/events/")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load events");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="page-msg">Loading events...</p>;
  if (error) return <p className="page-msg error">{error}</p>;

  return (
    <>
      <Navbar />

      <div className="events-page">
        <h1>🎉 Available Events</h1>

        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
