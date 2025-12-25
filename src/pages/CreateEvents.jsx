import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/events.css";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    total_seats: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/events/create/", {
        title: form.title,
        description: form.description,
        location: form.location,
        date: form.date,                 
        total_seats: Number(form.total_seats),
      });

      navigate("/events");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create event");
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <form className="create-event-card" onSubmit={handleSubmit}>
        <h2>Create Event</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="total_seats"
          placeholder="Total Seats"
          min="1"
          value={form.total_seats}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
