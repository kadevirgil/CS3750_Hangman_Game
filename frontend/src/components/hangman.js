//import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import axios from "axios";

// const ObjectId = require('mongodb').ObjectId;

//allow 6 guesses <--incorrectGuesses that is
import phase0 from "./images/0.jpg";
import phase1 from "./images/1.jpg";
import phase2 from "./images/2.jpg";
import phase3 from "./images/3.jpg";
import phase4 from "./images/4.jpg";
import phase5 from "./images/5.jpg";
import phase6 from "./images/6.jpg";

const images = [phase0, phase1, phase2, phase3, phase4, phase5, phase6];

function Letter({ letter, onLetterClick, disabled }) {
  return (
    <button
      className="letter"
      onClick={() => onLetterClick(letter)}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "slategrey" : "#f0f0f0",
        color: "black",
        padding: "6px",
        margin: "5px",
        fontSize: "25px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {letter}
    </button>
  );
}

export default function GamePage() {
  const navigate = useNavigate();
  const [isWin, setIsWin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    numGuesses: 0,
    lengthOfWord: 0,
  });

  const [word, setWord] = useState({
    word: "",
    lengthOfWord: 0,
  });

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  // Runs on page load to get session
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/user", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 400) {
        window.alert(await response.json());
        navigate("/");
        return;
      }
      const responseRecord = await response.json();
      setUser(responseRecord);
    }
    fetchData();

    // fetch the random word from backend
    async function PlayGame(e) {
      const response = await fetch(
        "http://localhost:4000/records/generateWord",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 400) {
        window.alert(await response.json());
        return;
      }
      const wordObj = await response.json();
      setWord(wordObj);
    }
    PlayGame();
  }, []);

  function updateUser(jsonObj) {
    return setUser((prevJsonObj) => {
      return { ...prevJsonObj, ...jsonObj };
    });
  }

  //Renders button disabled once guessed
  const handleLetterClick = (letter) => {
    const updateGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(updateGuessedLetters);
    if (!word.word.includes(letter)) {
      // Loss check
      setIncorrectGuesses(incorrectGuesses + 1);
      if (incorrectGuesses == 6) {
        PrintLoss(isWin);
      }
    } else {
      // Win Check
      const gameWord = word.word.split(""); // GAME = ['G', 'A', 'M', 'E']
      const containsAll = (updateGuessedLetters, gameWord) =>
        gameWord.every((gameWordLetter) =>
          updateGuessedLetters.includes(gameWordLetter)
        );
      if (containsAll(updateGuessedLetters, gameWord)) {
        setIsWin(!isWin);
        let editedUser = {
          name: user.name,
          numGuesses: updateGuessedLetters.length,
          lengthOfWord: word.lengthOfWord,
        };
        setUser((user) => ({
          ...user,
          ...editedUser,
        }));
        const userID = user._id;
        axios
          .put(`http://localhost:4000/update/${userID}`, editedUser)
          .then((res) => {
            setUser({
              name: "",
              numGuesses: 0,
              lengthOfWord: 0,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        PrintLoss(isWin);
      }
    }
  };

  function PrintLoss({ isWin }) {
    if (!isWin && incorrectGuesses >= 6) {
      disableButtons();
      return (
        <div>
          <h1 style={{ color: "darkred" }}>You Lost!</h1>
          <h3>The word was {word.word}</h3>
          <button onClick={() => navigate(`/highscores/${word.lengthOfWord}`)}>
            Highscores Page
          </button>
        </div>
      );
    } else if (isWin) {
      disableButtons();
      return (
        <div>
          <h1 style={{ color: "darkgreen" }}>You Won!</h1>
          <button onClick={() => navigate(`/highscores/${word.lengthOfWord}`)}>
            Highscores Page
          </button>
        </div>
      );
    }
  }

  function disableButtons() {
    const letterDiv1 = document.getElementById("letters1");
    const letterDiv2 = document.getElementById("letters2");
    letterDiv1.style.display = "none";
    letterDiv2.style.display = "none";
  }

  //Function to get the number of letter spaces to display to the user
  function PrintWordSpaces({ randomWord, guessedLetters }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "24px",
          margin: "20px",
        }}
      >
        {randomWord.split("").map((letter, index) => (
          <span
            key={index}
            style={{
              margin: "0 5px",
              borderBottom: "2px solid #000",
              width: "20px",
              textAlign: "center",
            }}
          >
            {guessedLetters.includes(letter) ? letter : "_"}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "slategrey", padding: "2em" }}>
      <h3>Welcome to Hangman {user.name}</h3>

      <div>
        <label>Start guessing letters!</label>
        <br />
        <img src={images[incorrectGuesses]} />
        <PrintLoss
          isWin={isWin}
          style={{ display: "block", padding: "100px" }}
        />
      </div>
      <div style={{ height: "200px" }}></div>
      <div style={{ position: "relative", bottom: -20 }}>
        <div style={{ paddingLeft: 200, position: "absolute", bottom: 150 }}>
          <PrintWordSpaces
            randomWord={word.word}
            guessedLetters={guessedLetters}
          />
        </div>
        <br />
        <br />
        <div id="letters1" style={{ paddingLeft: 50 }}>
          <Letter
            letter="A"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("A")}
          />
          <Letter
            letter="B"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("B")}
          />
          <Letter
            letter="D"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("D")}
          />
          <Letter
            letter="C"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("C")}
          />
          <Letter
            letter="E"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("E")}
          />
          <Letter
            letter="F"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("F")}
          />
          <Letter
            letter="G"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("G")}
          />
          <Letter
            letter="H"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("H")}
          />
          <Letter
            letter="I"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("I")}
          />
          <Letter
            letter="J"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("J")}
          />
          <Letter
            letter="K"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("K")}
          />
          <Letter
            letter="L"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("L")}
          />
          <Letter
            letter="M"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("M")}
          />
          <Letter
            letter="N"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("N")}
          />
        </div>
        <div id="letters2" style={{ paddingLeft: 50 }}>
          <Letter
            letter="P"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("P")}
          />
          <Letter
            letter="O"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("O")}
          />
          <Letter
            letter="Q"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("Q")}
          />
          <Letter
            letter="R"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("R")}
          />
          <Letter
            letter="S"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("S")}
          />
          <Letter
            letter="T"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("T")}
          />
          <Letter
            letter="U"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("U")}
          />
          <Letter
            letter="V"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("V")}
          />
          <Letter
            letter="W"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("W")}
          />
          <Letter
            letter="X"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("X")}
          />
          <Letter
            letter="Y"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("Y")}
          />
          <Letter
            letter="Z"
            onLetterClick={handleLetterClick}
            disabled={guessedLetters.includes("Z")}
          />
        </div>
      </div>
    </div>
  );
}

//<input type="text" name="name"  onChange={(e) => updateSession({name: e.target.value})} required/>

//<form onSubmit={PlayGame}>
//</form>
