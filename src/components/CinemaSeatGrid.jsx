import "../styles/cinemaSeat.css";

export default function CinemaSeatGrid({
  seats,
  selectedSeats,
  setSelectedSeats,
}) {
  const toggleSeat = (id) => {
    setSelectedSeats((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="cinema-container">
      <div className="screen">SCREEN</div>

      <div className="seat-area grid">
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={
              selectedSeats.includes(seat.id)
                ? "seat selected"
                : "seat"
            }
            onClick={() => toggleSeat(seat.id)}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>

      <div className="legend">
        <div><span className="seat" /> Available</div>
        <div><span className="seat selected" /> Selected</div>
      </div>
    </div>
  );
}
