import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h1>Welcome </h1>
        <p>This is your dashboard</p>

        <div style={{ marginTop: 20 }}>
          <p> Browse events</p>
          <p> Book tickets</p>
          <p> Manage your profile</p>
        </div>
      </div>
    </>
  );
}
