import React from 'react';
import {useNavigate} from 'react-router';
import { useState } from 'react';

//allow 6 guesses

//generate random word
function GenerateRandomWord() {

}

export default function GamePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        numGuesses: 0,
        lengthOfWord: 0
    });

    function updateSession(jsonObj) {
        return setUser((prevJsonObj) => {
            return { ...prevJsonObj, ...jsonObj };
        });
    }

    let word = '';

    //function to handle the click of a letter
    function onClickLetter() {

    }

    word = "TestWord"; //Testing purposes

    //Not sure if I need this onStartGame function
    async function PlayGame(e) {

        const response = await fetch("http://localhost:4000/records/generateWord", {
            method: "GET",
            credentials: "include"
            
        })
        if (response.status === 400) {
            window.alert(await response.json())
            return;
        }
        word = response;
        console.log(`The word sent from the backend is ${word}`);
        setUser({numGuesses: 0, lengthOfWord: word.length});
        
    }

    //Function to get the number of letter spaces to display to the user
    function PrintWordSpaces() {
        let wordLength = word.length;
        console.log(wordLength)
        let wordSpaces = [];
        for (let i = 0; i < wordLength; i++) {
            wordSpaces[i] = "____ ";
        }
        return(<p>{wordSpaces}</p>);
    }

    return(
        <div>
            <h3>Welcome to Hangman</h3>
            
                <div>
                    <label>Start guessing letters!</label>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div style={{paddingLeft: 50}}>
                    <PrintWordSpaces/>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div style={{paddingLeft: 50}}>
                        <button value="A">A</button>
                        <button value="B">B</button>
                        <button value="C">C</button>
                        <button value="D">D</button>
                        <button value="E">E</button>
                        <button value="F">F</button>
                        <button value="G">G</button>
                        <button value="H">H</button>
                        <button value="I">I</button>
                        <button value="J">J</button>
                        <button value="K">K</button>
                        <button value="L">L</button>
                        <button value="M">M</button>
                        <button value="N">N</button>
                        
                    </div>
                    <div style={{paddingLeft: 50}}>
                        <button value="O">O</button>
                        <button value="P">P</button>
                        <button value="Q">Q</button>
                        <button value="R">R</button>
                        <button value="S">S</button>
                        <button value="T">T</button>
                        <button value="U">U</button>
                        <button value="V">V</button>
                        <button value="W">W</button>
                        <button value="X">X</button>
                        <button value="Y">Y</button>
                        <button value="Z">Z</button>                        
                    </div>
                </div>
            
        </div>
    );
}

//<input type="text" name="name"  onChange={(e) => updateSession({name: e.target.value})} required/>

//<form onSubmit={PlayGame}>
//</form>