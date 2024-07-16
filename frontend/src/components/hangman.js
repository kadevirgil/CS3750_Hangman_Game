import React from 'react';
import {useNavigate} from 'react-router';
import { useState } from 'react';

//allow 6 guesses


export default function LandingPage() {
    const navigate = useNavigate();
    const [user, updateUser] = useState({
        name: "",
        numGuesses: 0,
        lengthOfWord: 0
    });

    function updateSession(jsonObj) {
        return updateUser((prevJsonObj) => {
            return { ...prevJsonObj, ...jsonObj };
        });
    }
    async function onStartGame(e) {
        e.preventDefault();
        const newPerson = {...user};
        const response = await fetch("http://localhost:4000/records/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
            credentials: "include"
            
        })
        if (response.status === 400) {
            window.alert(await response.json())
            return;
        }
        updateUser({name: "", numGuesses: 0, lengthOfWord: 0});
        navigate("/hangman");
    }

    return(
        <div>
            <h3>Welcome to Hangman</h3>
            <form onSubmit={onStartGame}>
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
                
            </form>
            
            
        </div>
    );
}

//<input type="text" name="name"  onChange={(e) => updateSession({name: e.target.value})} required/>