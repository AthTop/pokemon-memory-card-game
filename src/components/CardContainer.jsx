import { useState } from "react";
import Card from "./Card";
import "../styles/CardContainer.css";

export default function CardContainer({ pokeCards, handleCardClick }) {
  return (
    <div className="cards-container">
      {pokeCards.map((pokeCard) => {
        return (
          <Card
            key={pokeCard.id}
            pokeCard={pokeCard}
            handleCardClick={handleCardClick}
          />
        );
      })}
    </div>
  );
}
