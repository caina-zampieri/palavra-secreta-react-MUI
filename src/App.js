// React
import { useCallback, useEffect, useState } from 'react';

// Palavras
import { wordsList } from './data/words';

// Css
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Box } from '@mui/system';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

const guessesQty = 5;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(50);

  const pickedWordAndCategory = useCallback(() => {
    // pegar categories
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pegar palavra 
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);


  // começar o jogo

  const startGame = useCallback(() => {
    // clear tudo
    clearLetterStates();

    // pega palavra e categoria
    const { word, category } = pickedWordAndCategory();

    // Gerar array das letras

    let wordLetters = word.split('');
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // setar estados

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
    setOpen(false)
  }, [pickedWordAndCategory]);

  // processar letras

  const verifyLetters = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    // coloca uma letra ou remove a chance

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ],
        setOpen(true)
      );
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ],
        setOpen(false)
      );

      setGuesses((actualGuesses) => actualGuesses - 1)
    }



  };
  const [open, setOpen] = useState(false);



  if (open) {
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  } else { }


  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //derrotas
  useEffect(() => {
    if (guesses <= 0) {
      // reseta tudo
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //checa se ganhou

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    // win
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => actualScore += 1000);
      // reset game
      startGame();
    }

  }, [guessedLetters, letters, startGame]);

  // recomeça o jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name)
  }

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box>
        <Collapse in={open} sx={{ position: 'absolute', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, marginTop: 20, textAlign: 'center' }}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Acertou a letra, parabéns!
          </Alert>
        </Collapse>
      </Box>
      <div className="App">
        {gameStage === 'start' && <StartScreen startGame={startGame} />}
        {gameStage === 'game' && <Game verifyLetters={verifyLetters} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
        {gameStage === 'end' && <GameOver retry={retry} score={score} />}
      </div>
    </>
  );
}

export default App;
