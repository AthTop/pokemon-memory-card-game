import { useState } from "react";
import { useSound } from "use-sound";
import "../styles/Card.css";

export default function Card({ pokeCard }) {
  const [playCry] = useSound(pokeCard.pokeCryUrl, {
    volume: 0.15,
  });

  return (
    <div className="card" onClick={playCry}>
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
