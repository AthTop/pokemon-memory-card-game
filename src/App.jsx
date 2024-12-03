import { useState } from "react";
import InitPage from "./components/InitPage";
import "./App.css";
import { generatePokeObjectsArray, arrayShuffle } from "./components/utils";
import CardContainer from "./components/CardContainer";
import FloatMessage from "./components/FloatMessage";
// Init page to ask user how many cards they want to play with (limit 3 to 16)
// Generate user.input number of unique Ids, put in a set and call the pokeApi to generate objects with
// a 0-user.input index, the pokemon's name and their front sprite link (optional their sound to be played when clicked)
// and place all objects created in a set to be used as a reference for the card Ids state to generate cards
// App that contains Card components
// Has state variables for array of card Ids, current score, best score
// Method to shuffle array and set state with it on Card click

// potentially make it so card background color derives from pokemon's type

const dummyData = [
  {
    id: 0,
    pokeId: 238,
    pokeName: "Smoochum",
    pokeSpriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/238.png",
    pokeCryUrl:
      "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/238.ogg",
    pokeType: "ice",
    isClicked: false,
  },
  {
    id: 1,
    pokeId: 519,
    pokeName: "Pidove",
    pokeSpriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/519.png",
    pokeCryUrl:
      "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/519.ogg",
    pokeType: "normal",
    isClicked: false,
  },
  {
    id: 2,
    pokeId: 651,
    pokeName: "Quilladin",
    pokeSpriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/651.png",
    pokeCryUrl: null,
    pokeType: "grass",
    isClicked: false,
  },
];

function App() {
  const [isInit, setIsInit] = useState(false);
  const [pokeCards, setPokeCards] = useState([]);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState('');

  const handleUserInput = async (input) => {
    // const data = await generatePokeObjectsArray(input);
    setPokeCards(dummyData);
    setIsInit(true);
  };
  // When card is clicked, set isClicked to true and shuffle the pokeCards state array

  const clickAndShuffle = (id) => {
    setClickedIds((clickedIds) => new Set([...clickedIds, id]));
    setPokeCards((pokeCards) =>
      arrayShuffle(
        pokeCards.map((pokeCard) =>
          pokeCard.id === id ? { ...pokeCard, isClicked: true } : pokeCard
        )
      )
    );
  };
  const checkAndUpdateBestScore = (newScore) => {
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  };
  const checkWinCondition = (newScore) => {
    if (newScore === pokeCards.length) {
      setMessage('You win!');
      setCurrentScore(0);
      setClickedIds(new Set());
      return;
    }
  };
  // Handle user click
  const handleCardClick = (id) => {
    if (clickedIds.has(id)) {
      setMessage('You lose!');
      setCurrentScore(0);
      setClickedIds(new Set());
      return;
    }
    // Do score logic and check for win condition
    const newScore = currentScore + 1;
    clickAndShuffle(id);
    setCurrentScore(newScore);
    checkAndUpdateBestScore(newScore);
    checkWinCondition(newScore);
  };

  const resetMessage = () => {
    setMessage("");
  }

  if (!isInit) {
    return (
      <>
        <InitPage onSubmit={handleUserInput} />
      </>
    );
  }
  return (
    <>
      <div className="scoreboard">
        <p>Current score: {currentScore}</p>
        <p>Best score: {bestScore}</p>
      </div>
      <FloatMessage message={message} resetMessage={resetMessage} />
      <CardContainer pokeCards={pokeCards} handleCardClick={handleCardClick} />
    </>
  );
}

export default App;
