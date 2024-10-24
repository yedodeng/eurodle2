import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Guesses from "../components/guesses";
import H2 from "../components/h2";
import useGuesser from "../hooks/useGuesser";
import Modal from "../modal";
import { supabase } from "../supabaseClient";

export default function Daily() {
  let { peon, names, setNames, loadPeon } = useGuesser();
  let [ans, setAns] = useState({});
  let [showMod, setShowMod] = useState(false);
  let [win, setWin] = useState(false);
  let [ar, setAr] = useState([]);
  let [al, setAl] = useState(false);
  let [sco, setSco] = useState(0);
  let [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    newAns();
    loadRecentGames();
  }, [peon]);

  async function loadRecentGames() {
    let logs = JSON.parse(localStorage.getItem("unlimited-log") || "[]");
    setRecentGames(logs.slice(-5));
  }

  async function newAns() {
    let i = Math.floor(Math.random() * peon.length);
    let obe = peon[i];
    console.log(obe);
    setAns(obe);
  }

  async function guess(ev) {
    ev.preventDefault();
    let gue = await loadPeon(ev.target["guess"].value);
    if (gue == undefined) {
      setAl(true);
    } else if (gue.name == ans.name) {
      setAr([...ar, gue]);
      setShowMod(true);
      setWin(true);
      setAl(false);

      // store data in local storage
      storeStat();
    } else {
      setAr([...ar, gue]);
      setAl(false);
      setNames(names.filter((v) => v != gue.name));
    }
    setSco(sco + 1);
    ev.target.reset();
  }

  function storeStat() {
    // store log
    let logs = JSON.parse(localStorage.getItem("unlimited-log") || "[]");
    let log = { ...ans, score: sco, time: new Date() };
    logs.push(log);
    localStorage.setItem("unlimited-log", JSON.stringify(logs));
    setRecentGames((v) => [...v, log]);
  }

  async function newGame() {
    setWin(false);
    newAns();
    setShowMod(false);
    setAr([]);
  }

  return (
 main
    <div className="space-y-5 flex flex-col items-center flex-1">
      <H2>Eurodle Unlimited</H2>
      <div>Guess the Important European!</div>
      <div className="h-5"></div>

      {/* play area */}
      {ar.length === 0 ? (
        <div className="flex-1 flex flex-col items-center">
          <QuestionMark />
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full">
          {al && (
            <div className="text-lg text-center text-error font-bold text-yellow">
              Invalid Guess
            </div>
          )}
          <Guesses ar={ar} ans={ans} />
          {win && (
            <div className="m-4 flex justify-center">
              <button className="btn btn-primary text-xl ">
                <Link to="/unlimited">Play More</Link>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center w-full text-xl">
        <div className="text-center my-4">
          Number of Guesses: <span className="font-bold text-2xl">{sco}</span>
        </div>
        <div className="flex justify-end">
          <Link to="/recent" className="flex items-center space-x-2">
            <FaArrowCircleRight />
            <div className="font-bold">Recent Games</div>
          </Link>
        </div>
      </div>
      <hr />
      <form className="flex items-center gap-2 w-full" onSubmit={guess}>
        <input
          list="guess"
          name="guess"
          className="flex-1 guess-input"
          placeholder="Select your next guess"
        />
        <datalist id="guess">
          {names?.map((v, i) => (
            <option value={v} key={i}></option>
          ))}
        </datalist>
        <button className="btn-primary" disabled={win}>
          Submit
        </button>
      </form>

      {/* modal */}
=======
    <>
      <div className="text-2xl text-center font-bold mt-4">Eurodle Unlimited</div>
      <div className="text-lg text-center font-bold">Guess the Important European!</div>
      {al && <div className="text-lg text-center text-error font-bold">Invalid Guess</div>}
      <Guesses ar={ar} ans={ans} win={win} guess={guess} names={names} />
      {win && (
        <div className=" m-4 flex justify-center">
          <button className="btn text-xl btn-primary" onClick={newGame}>New Game</button>
        </div>)}
      <div className="text-center text-xl font-bold my-4">Number of Guesses: {sco}</div>
 main
      <Modal show={showMod} close={() => setShowMod(false)} btn="X">
        <div className="mt-6 text-2xl font-bold text-center">Victory!!</div>
        <div className="m-4 text-xl font-bold text-center">
          Number of Guesses: {sco}
        </div>
      </Modal>
    </div>
  );
}

function QuestionMark() {
  return (
    <div className="flex-1 center">
      <img
        src="/question-solid.svg"
        alt=""
        className="h-40"
        style={{
          filter:
            "invert(55%) sepia(23%) saturate(224%) hue-rotate(183deg) brightness(86%) contrast(89%)",
        }}
      ></img>
    </div>
  );
}
