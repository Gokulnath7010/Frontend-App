import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/api/logout/");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
