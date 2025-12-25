import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/api/logout/");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🎟 TicketHub</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/events">Events</Link>
        <Link to="/my-bookings">My Tickets</Link>
        <Link to="/profile">Profile</Link>

        {user?.is_admin && (
          <Link className="admin-link" to="/admin">
            Admin
          </Link>
        )}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
