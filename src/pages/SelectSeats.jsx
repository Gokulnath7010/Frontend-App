import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import CinemaSeatGrid from "../components/CinemaSeatGrid";

export default function SelectSeats() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/events/${eventId}/seats/`)
      .then((res) => setSeats(res.data))
      .catch(() => setError("Failed to load seats"));
  }, [eventId]);

  const proceedToPay = async () => {
    if (selectedSeats.length === 0) {
      setError("Please select at least one seat");
      return;
    }

    navigate("/pay", {
      state: {
        eventId: eventId,
        seatIds: selectedSeats,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="events-page">
        <h2>Select Seats</h2>
        {error && <p className="page-msg error">{error}</p>}
        <CinemaSeatGrid
          seats={seats}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
        <button className="pay-btn" onClick={proceedToPay}>
          Proceed to Pay
        </button>
      </div>
    </>
  );
}
