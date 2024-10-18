import { useState } from 'react';
import './App.css';

// Initialize image components as variables
const Fring = <img src="/assets/Gus_Fring.png" className="charPhotos" alt="Gus Fring" />;
const Hank = <img src="/assets/Hank_Schrader.png" className="charPhotos" alt="Hank Schrader" />;
const Walt = <img src="/assets/Walter_White.png" className="charPhotos" alt="Walt White" />;
const Hector = <img src="/assets/Hector_Salamanca.png" className="charPhotos" alt="Hector Salamanca" />;
const Jesse = <img src="/assets/Jesse_Pinkman.png" className="charPhotos" alt="Jesse Pinkman" />;
const Saul = <img src="/assets/Saul_Goodman.png" className="charPhotos" alt="Saul Goodman" />;
const Skyler = <img src="/assets/Skyler_White.png" className="charPhotos" alt="Skyler White" />;
const SteveGomez = <img src="/assets/Steve_Gomez.png" className="charPhotos" alt="Steve Gomez" />;
const Tuco = <img src="/assets/Tuco_Salamanca.png" className="charPhotos" alt="Tuco Salamanca" />;
const WaltJr = <img src="/assets/Walt_Jr.png" className="charPhotos" alt="Walt Jr" />;

// Array of image components
const initialCharArray = [
  { image: Fring, clicked: false },
  { image: Hank, clicked: false },
  { image: Walt, clicked: false },
  { image: Hector, clicked: false },
  { image: Jesse, clicked: false },
  { image: Saul, clicked: false },
  { image: Skyler, clicked: false },
  { image: SteveGomez, clicked: false },
  { image: Tuco, clicked: false },
  { image: WaltJr, clicked: false },
];

// Utility function for shuffling the array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// This component displays the game cards (images in this case)
function GameCards({ cards, onCardClick }) {
  return (
    <div className='cardBox'>
      {cards.map((card, index) => (
        <div className='cardMap' key={index} onClick={() => onCardClick(index)}>
          {card.image} {/* Render the image directly */}
        </div>
      ))}
    </div>
  );
}

// Main App component
function App() {
  // State to hold the current array of cards (shuffled) and the score
  const [cards, setCards] = useState(initialCharArray); // Initialize with initialCharArray
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Handle what happens when a card is clicked
  const handleCardClick = (index) => {
    if (!cards[index].clicked) {
      // If the card has not been clicked
      const newCards = cards.map((card, i) =>
        i === index ? { ...card, clicked: true } : card
      );
      setCards(shuffle(newCards)); // Shuffle the cards and update the state
      setScore(score + 1); // Increment the score
    } else {
      // If the card has been clicked, reset the game
      if (score > bestScore) {
        setBestScore(score); // Update the best score if necessary
      }
      setScore(0); // Reset the score
      setCards(initialCharArray.map((card) => ({ ...card, clicked: false }))); // Reset clicked state of all cards
    }
  };

  return (
    <>
      {/* Top Row with header, game description, and scoreboard */}
      <div className='wholeGame'>
        <div className="topRow">
          <div className="nameAndDescription">
            <h1>Memory Game</h1>
            <p>Click on an image to get points but don't click the same one twice!</p>
            <div className="scoreBoard">
              <span className="score">
                <p>Score: </p>
                {score}
              </span>
              <span className="bestScore">
                <p>Best Score: </p>
                {bestScore}
              </span>
            </div>
          </div>
        </div>

        {/* Game area with cards */}
        <div className="gameArea">
          <GameCards cards={cards} onCardClick={handleCardClick} /> {/* Pass cards and click handler */}
        </div>
      </div>
    </>
  );
}

export default App;
