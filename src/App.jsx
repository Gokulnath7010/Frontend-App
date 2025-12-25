import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Pay from "./pages/Pay";
import SelectSeats from "./pages/SelectSeats";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import CreateEvent from "./pages/CreateEvents";
import EditEvent from "./pages/EditEvent";
import MyTickets from "./pages/MyTickets";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/events"
        element={
          <RequireAuth>
            <Events />
          </RequireAuth>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <RequireAuth>
            <MyBookings />
          </RequireAuth>
        }
      />

      <Route
        path="/events/:eventId/seats"
        element={
          <RequireAuth>
            <SelectSeats />
          </RequireAuth>
        }
      />

      <Route
        path="/pay"
        element={
          <RequireAuth>
            <Pay />
          </RequireAuth>
        }
      />

      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/my-tickets"
        element={
          <RequireAuth>
            <MyTickets />
          </RequireAuth>
        }
      />


      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/events"
        element={
          <RequireAuth>
            <AdminEvents />
          </RequireAuth>
        }
      />

      <Route
        path="/create-event"
        element={
          <RequireAuth>
            <CreateEvent />
          </RequireAuth>
        }
      />

      <Route
        path="/edit-event/:id"
        element={
          <RequireAuth>
            <EditEvent />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
