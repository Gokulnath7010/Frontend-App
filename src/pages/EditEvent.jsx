import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "../styles/events.css";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    total_seats: "",
    available_seats: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Load event data
  useEffect(() => {
    api.get(`/api/events/${id}/`)
      .then((res) => {
        const e = res.data;
        setForm({
          title: e.title,
          description: e.description,
          location: e.location,
          date: e.date.slice(0, 16), // datetime-local format
          total_seats: e.total_seats,
          available_seats: e.available_seats,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load event");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.put(`/api/events/${id}/update/`, {
        title: form.title,
        description: form.description,
        location: form.location,
        date: form.date,
        total_seats: Number(form.total_seats),
        available_seats: Number(form.available_seats),
      });

      navigate("/events");
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    }
  };

  if (loading) return <p className="page-msg">Loading event...</p>;
  if (error) return <p className="page-msg error">{error}</p>;

  return (
    <div className="create-event-container">
      <form className="create-event-card" onSubmit={handleSubmit}>
        <h2>Edit Event</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="location"
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
          value={form.total_seats}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="available_seats"
          value={form.available_seats}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
