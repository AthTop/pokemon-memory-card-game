import { useState } from "react";
import InitPage from "./components/InitPage";
import "./App.css";
import { generatePokeObjectsArray, arrayShuffle } from "./components/utils";
import CardContainer from "./components/CardContainer";
import FloatMessage from "./components/FloatMessage";
import VolumeSlider from "./components/VolumeSlider";
import useSound from "use-sound";
import loseSfx from "./Assets/lose.mp3";
import winSfx from "./Assets/win.mp3";

function App() {
  const [isInit, setIsInit] = useState(false);
  const [pokeCards, setPokeCards] = useState([]);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [playLose] = useSound(loseSfx, {
    volume: volume + 0.3,
    playbackRate: 1.3,
  });
  const [playWin] = useSound(winSfx, {
    volume: volume + 0.3,
    playbackRate: 0.7,
  });

  const handleUserInput = async (input) => {
    const data = await generatePokeObjectsArray(input);
    setPokeCards(data);
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
      setTimeout(() => {
        playWin();
        setMessage("You win!");
        setCurrentScore(0);
        setClickedIds(new Set());
      }, 300);
      return;
    }
  };
  // Handle user click
  const handleCardClick = (id) => {
    if (clickedIds.has(id)) {
      setTimeout(() => {
        playLose();
        setMessage("You lose!");
        setCurrentScore(0);
        setClickedIds(new Set());
      }, 300);
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
  };
  const adjustVolume = (value) => {
    setVolume(value);
  };

  if (!isInit) {
    return (
      <>
        <InitPage onSubmit={handleUserInput} />
      </>
    );
  }
  return (
    <div className="game">
      <div className="control">
        <VolumeSlider volume={volume} adjustVolume={adjustVolume} />
        <div>
          <p>Current score: {currentScore}</p>
          <p>Best score: {bestScore}</p>
        </div>
      </div>
      <FloatMessage message={message} resetMessage={resetMessage} />
      <CardContainer
        pokeCards={pokeCards}
        handleCardClick={handleCardClick}
        volume={volume}
      />
    </div>
  );
}

export default App;
