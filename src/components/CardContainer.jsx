import Card from "./Card";
import "../styles/CardContainer.css";

export default function CardContainer({ pokeCards, handleCardClick, volume }) {
  return (
    <div className="cards-container">
      {pokeCards.map((pokeCard) => {
        return (
          <Card
            key={pokeCard.id}
            pokeCard={pokeCard}
            handleCardClick={handleCardClick}
            volume={volume}
          />
        );
      })}
    </div>
  );
}
