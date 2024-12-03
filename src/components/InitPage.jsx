import { useState } from "react";

import "../styles/InitPage.css";

export default function InitPage({ onSubmit }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setInput(value);
    setError(
      value < 3 || value > 18
        ? "Cards should be 3 to 18"
        : isNaN(value)
        ? "Only numbers are valid input"
        : ""
    );
  };

  const handleSubmit = () => {
    if (error === "" && input !== "") {
      setLoading(true);
      onSubmit(input);
    }
  };

  return (
    <div className="start-game-container">
      <h1>Welcome to the Pokemon Memory Card Game!</h1>
      <label>
        Please select the amount of cards you want to play with:
        <input
          type="number"
          min="3"
          max="18"
          value={input}
          placeholder="3 to 18 cards allowed"
          onChange={handleChange}
          className={error ? "invalid-input" : ""}
        />
      </label>
      <button onClick={handleSubmit}>
        Start Game!
      </button>
      <div className={loading ? "loader" : ""}></div>
      <p>{error ? "*" + error : ""}</p>
    </div>
  );
}
