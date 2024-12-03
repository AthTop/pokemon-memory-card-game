import { useState } from "react";
import { useSound } from "use-sound";
import "../styles/Card.css";
import { colors, getColor } from "./pokemon-type-colors";

export default function Card({ pokeCard, handleCardClick, volume }) {
  const [clicked, setClicked] = useState(false);
  const [playCry] = useSound(pokeCard.pokeCryUrl, {
    volume: volume,
  });
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false)
      playCry();
      handleCardClick(pokeCard.id);
    }, 100)
  }

  return (
    <div className={"card " + pokeCard.pokeType + (clicked && " clicked")} onClick={handleClick} style={{ backgroundColor: getColor(pokeCard.pokeType)}}>
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
