import { useState } from "react";
import { useSound } from "use-sound";
import "../styles/Card.css";

export default function Card({ pokeCard, handleCardClick }) {
  const [playCry] = useSound(pokeCard.pokeCryUrl, {
    volume: 0.15,
  });
  const handleClick = () => {
    playCry();
    handleCardClick(pokeCard.id);
  }
  return (
    <div className="card" onClick={handleClick}>
      <figure>
        <img
          src={pokeCard.pokeSpriteUrl}
          alt={"Image of " + pokeCard.pokeName}
        />
        <figcaption>{pokeCard.pokeName}</figcaption>
      </figure>
    </div>
  );
}
