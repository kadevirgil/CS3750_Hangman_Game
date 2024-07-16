import React from 'react';
import {useNavigate} from 'react-router';
import { useState } from 'react';


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
        const response = await fetch("http://localhost:4000/records/add", {
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
                    <label>Please enter in your name: </label>
                    <input type="text" name="name"  onChange={(e) => updateSession({name: e.target.value})} required/>
                    <br/>  
                    <button type="submit" value="Start Game">Start Game</button>
                </div>
            </form>
            
            
        </div>
    );
}