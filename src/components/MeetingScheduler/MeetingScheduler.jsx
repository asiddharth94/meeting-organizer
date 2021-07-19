import "./MeetingScheduler.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useState } from "react";

function MeetingScheduler({ handleFormData }) {
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [building, setBuilding] = useState("Building 8");
  const [error, setError] = useState("");

  const handleFormSubmit = (event) => {
    if (!date || !start || !end || !building) {
      setError("Fill all fields to proceed!");
      event.preventDefault();
    } else if (start > end) {
      setError("Start time is after the End time");
      event.preventDefault();
    } else if (start === end) {
      setError("Start time is same as the End time");
      event.preventDefault();
    } else {
      handleFormData({
        date: date,
        start: start,
        end: end,
        building: building,
      });
    }
  };
  return (
    <div className="scheduler">
      <form
        className="scheduler__form"
        onSubmit={(event) => handleFormSubmit(event)}
      >
        <label htmlFor="date">DATE</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setError("");
          }}
        />

        <label htmlFor="start">Start Time</label>
        <input
          id="start"
          type="time"
          step="900"
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
            setError("");
          }}
        />

        <label htmlFor="end">End Time</label>
        <input
          id="end"
          type="time"
          step="900"
          value={end}
          onChange={(e) => {
            setEnd(e.target.value);
            setError("");
          }}
        />

        <label htmlFor="building" aria-label="select building"></label>
        <select
          name="building"
          id="building"
          value={building}
          onChange={(e) => {
            setBuilding(e.target.value);
            setError("");
          }}
        >
          <option value="Building 8">Building 8</option>
          <option value="Building 6">Building 6</option>
          <option value="Building 4">Building 4</option>
        </select>
        <Link to="/rooms" onClick={(event) => handleFormSubmit(event)}>
          <Button action="add" />
        </Link>
      </form>
      {error && <h4 className="error">{error}</h4>}
    </div>
  );
}

export default MeetingScheduler;
