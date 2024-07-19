import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
//for displaying highscores
const scores = (props) => (
    <tr>
        <td>{props.records.name}</td>
        <td>{props.records.numGuesses}</td>
    </tr>
);
export default function HighScores() {
    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState({});
    const [records, setRecords] = useState([]);
    //Checking if user has played before on run
    useEffect(() => {       
        
        async function fetchData(){
            
            const response = await fetch('http://localhost:4000/user', 
                {
                    method: "GET",
                    credentials: "include"            
                }
            );  
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
    },[]);
    // This will run right when the page open to get highscores for given word length to display thought we can display them the same way we displayed records from past assignments not currently working
    
    //  useEffect(() => { 
    //     async function getRecords() {
    //         const response = await fetch(`http://localhost:4000/records/${params.wordLength}`, ); // change ${params.wordLength}
    //         if (response.status === 400) {
    //             const message = `An error occurred: ${response.statusText}`;
    //             window.alert(message);
    //             return;
    //         }
    //         else if (response === 200) {
    //             window.alert("Success");
    //             const responseRecords = await response.json();
    //             setRecords(responseRecords);
    //         }           
    //         return;
    //     }
    //     getRecords();
    //     return;
    //  },[records.length]);
    async function playAgain(){ // doesn't exist / hasn't even been started

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
        console.log(response); 
        if(response.status === 400){               

            const message= `No session found: ${response.statusText}`;
            window.alert(message);
            
        }        
        else if (response.status === 200) {
            window.alert("Logged Out");              
        }  
        navigate("/");           
        return;                    
    }   
    //for displaying highscores
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
    //When we have the highscores working we need to change out [BLANK] for the var instead also displaying of highscores may not be working/correct just grabbed it from the past assignments haven't been able to test it
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