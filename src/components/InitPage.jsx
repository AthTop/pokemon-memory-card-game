import { useState } from "react";

import "../styles/InitPage.css";

export default function InitPage({ onSubmit }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setInput(value);
    setError(
      value < 3 || value > 15
        ? "Cards should be 3 to 15"
        : isNaN(value)
        ? "Only numbers are valid input"
        : ""
    );
  };

  const handleSubmit = () => {
    if (error === "" && input !== "") {
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
          max="15"
          value={input}
          placeholder="3 to 15 cards allowed"
          onChange={handleChange}
          className = {error ? 'invalid-input' : ''}
        />
      </label>
      <button onClick={handleSubmit}>Start Game!</button>
      <p>{error ? "*" + error : ""}</p>
    </div>
  );
}
