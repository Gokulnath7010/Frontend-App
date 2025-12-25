import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h1>Admin Dashboard</h1>

        <ul>
          <li><Link to="/create-event">➕ Create Event</Link></li>
          <li><Link to="/admin/events">✏️ Manage Events</Link></li>
          <li><Link to="/admin/bookings">📊 View Bookings</Link></li>
        </ul>
      </div>
    </>
  );
}
