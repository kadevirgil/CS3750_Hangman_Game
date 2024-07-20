import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";

//for displaying highscores
const Scores = (props) => (
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
    async function fetchData() {
      const response = await fetch("http://localhost:4000/user", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 400) {
        //window.alert(await response.json())
        navigate("/");
        return;
      }
      const responseRecord = await response.json();
      //console.log(responseRecord);
      setUser(responseRecord);
    }
    fetchData();
    async function getRecords() {
      const response = await fetch(
        `http://localhost:4000/records/highscores/${params.wordLength}`
      );
      if (response.status === 400) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      } else if (response.status === 200) {
        const responseRecords = await response.json();
        setRecords(responseRecords);
      }
      return;
    }
    getRecords();
    return;
  }, [Scores.length, navigate]);
  // This will run right when the page open to get highscores for given word length to display thought we can display them the same way we displayed records from past assignments not currently working

  //  useEffect(() => {

  //  },[records.length]);
  async function playAgain() {
    // doesn't exist / hasn't even been started

    const response = await fetch("http://localhost:4000/user", {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 400) {
      // If no session exists
      window.alert("No session exists");
      return;
    } else {
      // allow them to play again
      navigate("/hangman");
      return;
    }
  }
  async function logout() {
    const response = await fetch("http://localhost:4000/logout", {
      method: "GET",
      credentials: "include",
    });
    //console.log(response);
    if (response.status === 400) {
      const message = `No session found: ${response.statusText}`;
      //window.alert(message);
    } else if (response.status === 200) {
      //window.alert("Logged Out");
    }
    navigate("/");
    return;
  }
  //for displaying highscores
  function highScoresList() {
    return records.map((record) => {
      return <Scores records={record} key={record._id} />;
    });
  }
  //When we have the highscores working we need to change out [BLANK] for the var instead also displaying of highscores may not be working/correct just grabbed it from the past assignments haven't been able to test it
  return (
    <div id="highscores-container">
      <h3>High Scores for {params.wordLength} letter words </h3>
      <table id="highscores" style={{ margin: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of Guesses</th>
          </tr>
        </thead>
        <tbody>{highScoresList()}</tbody>
      </table>
      <button value="Play Again" onClick={playAgain}>
        Play Again
      </button>
      <button value="Logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
