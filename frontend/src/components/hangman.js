//import React, { useEffect } from 'react';
import {useNavigate} from 'react-router';
import React, { useState, useEffect } from 'react';

//allow 6 guesses <--incorrectGuesses that is


function Letter({ letter, onLetterClick, disabled }) {
    return (
        <button 
        className="letter"
        onClick={() => onLetterClick(letter)}
        disabled={disabled}
        style={{ backgroundColor: disabled ? 'gray' : '#f0f0f0', 
            color: 'black', padding: '6px', margin: '5px', 
            fontSize: '25px', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            {letter}
        </button>
    );
}

export default function GamePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        numGuesses: 0,
        lengthOfWord: 0
    });

    // Runs on page load to get session
    useEffect(() => {       
        
        async function fetchData(){
            
            const response = await fetch('http://localhost:4000/user', 
                {
                    method: "GET",
                    credentials: "include"            
                }
            )  
            if(response.status === 400){                   
                window.alert(await response.json())
                navigate("/");
                return;
            }
            const responseRecord = await response.json();
            console.log(responseRecord);
            setUser(responseRecord);   
                     
                   
        }
        fetchData();

        // fetch the random word from backend
        async function PlayGame(e) {

            const response = await fetch("http://localhost:4000/records/generateWord", {
                method: "GET",
                credentials: "include"
                
            })
            if (response.status === 400) {
                window.alert(await response.json())
                return;
            }
            const wordObj = await response.json();
            
            console.log(`The word sent from the backend is ${word}`);
            //setUser({numGuesses: 0, lengthOfWord: word.length});
            
        }
        PlayGame();
        
    }, []); 

    //Test comment

    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);

    function updateSession(jsonObj) {
        return setUser((prevJsonObj) => {
            return { ...prevJsonObj, ...jsonObj };
        });
    }

    //Renders button disabled once guessed
    const handleLetterClick = (letter) => {
        if (!guessedLetters.includes(letter)) {
          setGuessedLetters([...guessedLetters, letter]);
          if (!word.includes(letter)) {
            setIncorrectGuesses(incorrectGuesses + 1);
          }
        }
    };

    //Function to get the number of letter spaces to display to the user
    function PrintWordSpaces({ word, guessedLetters }) {
        //let wordLength = word.length;
        //tests
        // testword = "Sample"; //Testing purposes
        // //let wordL = testword.length;
        // let wordLength = testword.length;//test line just for UX stuff
        // console.log(wordLength)
        // //end tests
        // let wordSpaces = [];
        // for (let i = 0; i < wordLength; i++) {
        //     wordSpaces[i] = "_____ ";
        // }
        // return(<p>{wordSpaces}</p>);
        return (
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '24px', margin: '20px' }}>
              {word.split('').map((letter, index) => (
                <span key={index} style={{ margin: '0 5px', borderBottom: '2px solid #000', width: '20px', textAlign: 'center' }}>
                  {guessedLetters.includes(letter) ? letter : '_'}
                </span>
              ))}
            </div>
          );
    }

    return(
        <div>
            <h3>Welcome to Hangman {user.name}</h3>
            
                <div>
                    <label>Start guessing letters!</label>
                </div>
                <div style={{height: '300px'}}>
                </div>
                
                             
                <div style={{position: 'relative', bottom: -20}}>
                    <div style={{paddingLeft: 200, position: 'absolute', bottom: 150}}>
                        <PrintWordSpaces word={word} guessedLetters={guessedLetters}/>
                    </div>
                    <br/>
                    <br/>
                    <div style={{paddingLeft: 50, }}>
                        <Letter letter="A" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("A")}/>
                        <Letter letter="B" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("B")}/>
                        <Letter letter="D" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("D")}/>
                        <Letter letter="C" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("C")}/>
                        <Letter letter="E" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("E")} />
                        <Letter letter="F" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("F")} />
                        <Letter letter="G" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("G")} />
                        <Letter letter="H" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("H")} />
                        <Letter letter="I" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("I")} />
                        <Letter letter="J" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("J")} />
                        <Letter letter="K" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("K")} />
                        <Letter letter="L" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("L")} />
                        <Letter letter="M" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("M")} />
                        <Letter letter="N" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("N")} />
                        
                    </div>
                    <div style={{paddingLeft: 50}}>
                        <Letter letter="P" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("P")} />
                        <Letter letter="O" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("O")} />
                        <Letter letter="Q" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("Q")} />
                        <Letter letter="R" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("R")} />
                        <Letter letter="S" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("S")} />
                        <Letter letter="T" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("T")} />
                        <Letter letter="U" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("U")} />
                        <Letter letter="V" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("V")} />
                        <Letter letter="W" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("W")} />
                        <Letter letter="X" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("X")} />
                        <Letter letter="Y" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("Y")} />
                        <Letter letter="Z" onLetterClick={handleLetterClick} disabled={guessedLetters.includes("Z")} />                       
                    </div>
                </div>
            
        </div>
    );
}

//<input type="text" name="name"  onChange={(e) => updateSession({name: e.target.value})} required/>

//<form onSubmit={PlayGame}>
//</form>