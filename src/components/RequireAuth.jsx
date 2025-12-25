import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    api.get("/api/me/")
      .then(() => {
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return authenticated ? children : <Navigate to="/login" />;
}
