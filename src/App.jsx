import { useState } from "react";
import InitPage from "./components/InitPage";
import "./App.css";

// Init page to ask user how many cards they want to play with (limit 3 to 16)
// Generate user.input number of unique Ids, put in a set and call the pokeApi to generate objects with
// a 0-user.input index, the pokemon's name and their front sprite link (optional their sound to be played when clicked)
// and place all objects created in a set to be used as a reference for the card Ids state to generate cards
// App that contains Card components
// Has state variables for array of card Ids, current score, best score
// Method to shuffle array and set state with it on Card click

// potentially make it so card background color derives from pokemon's type

function App() {
  const [isInit, setIsInit] = useState(false);
  const [userCardsSelection, setUserCardsSelection] = useState(3);

  const handleUserInput = (input) => {
    setUserCardsSelection(input);
    setIsInit(true);
  };

  if (!isInit) {
    return (
      <>
        <InitPage onSubmit={handleUserInput} />
      </>
    );
  }
  return <p> {userCardsSelection}</p>;
}

export default App;
