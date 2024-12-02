import { useState } from "react";
import Card from "./Card";
import "../styles/CardContainer.css"

export default function CardContainer({ pokeCards }) {
  return (
    <div className="cards-container">
      {pokeCards.map(pokeCard => {
        return <Card key={pokeCard.id} pokeCard={pokeCard} />;
      })}
    </div>
  );
}
