import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const scores = (props) => (
    <tr>
        <td>{props.records.name}</td>
        <td>{props.records.numGuesses}</td>
    </tr>
);
export default function HighScores() {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
     useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:4000/records/${records.length}`, ); // change ${params.wordLength}
            if (response.status === 400) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            else if (response === 200) {
                window.alert("Success");
                const responseRecords = await response.json();
                setRecords(responseRecords);
            }           
            return;
        }
        getRecords();
        return;
     },[records.length]);
    async function playAgain(){

        // const response = await fetch("http://localhost:4000/playAgain",
        //     {
        //         method: "GET",
        //         credentials: "include"
        //     }
        // );
                               
        
    }
    async function logout(){
        const response = await fetch("http://localhost:4000/logout",
            {
                method: "GET",
                credentials: "include"
            }
        );
                               
        if(!response.ok){               

            const message= `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }            
        
        const statusResponse = await response.json();
        console.log(statusResponse);
        console.log(statusResponse.status);
        return;
        navigate("/");
                    
    }   
    function highScoresList() {
        return records.map((record) => {
            return (
                <scores 
                records={record} 
                key={record._id} 
                />
            );
        });

    }
    return (
        <div>
            <h3>High Scores for [BLANK] letter words </h3>
            <table style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of Guesses</th>
                    </tr>
                </thead>
                <tbody>{highScoresList()}</tbody>
            </table>
            <button value ="Play Again" onClick={playAgain}>Play Again</button>
            <button value ="Logout" onClick={logout}>Logout</button>
            
            
        </div>
    );
}