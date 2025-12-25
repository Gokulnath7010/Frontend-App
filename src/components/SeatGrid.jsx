import "../styles/seatgrid.css";

export default function SeatGrid({ seats, selectedSeats, setSelectedSeats }) {
  const toggleSeat = (id) => {
    setSelectedSeats((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="seat-grid">
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
  );
}
