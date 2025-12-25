import { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h2>My Profile</h2>

        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </>
  );
}
