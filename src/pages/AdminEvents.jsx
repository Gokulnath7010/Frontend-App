import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/events/")
      .then((res) => setEvents(res.data));
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await api.delete(`/api/events/${id}/delete/`);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h2>Manage Events</h2>

        {events.map(e => (
          <div key={e.id} style={{ marginBottom: 10 }}>
            <strong>{e.title}</strong>
            <button onClick={() => navigate(`/edit-event/${e.id}`)}>Edit</button>
            <button onClick={() => remove(e.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
