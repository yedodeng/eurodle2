import { useEffect, useState } from "react";
import Modal from "../modal";
import useGuesser from "../hooks/useGuesser";
import Guesses from "../components/guesses";

export default function Unlimited() {
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
    setRecentGames(v => [...v, log])
  }

  async function newGame() {
    setWin(false);
    newAns();
    setShowMod(false);
    setAr([]);
  }

  return (
    <>
      <div className="text-2xl text-center font-bold mt-4">Eurodle Unlimited</div>
      <div className="text-lg text-center font-bold">Guess the Important European!</div>
      {al && <div className="text-lg text-center text-error font-bold">Invalid Guess</div>}
      <Guesses ar={ar} ans={ans} win={win} guess={guess} names={names} />
      {win && (
        <div className=" m-4 flex justify-center">
          <button className="btn text-xl btn-primary" onClick={newGame}>New Game</button>
        </div>}
      <div className="text-center text-xl font-bold my-4">Number of Guesses: {sco}</div>
      <Modal show={showMod} close={() => setShowMod(false)} btn="X">
        <div className="m-4 mt-6 text-2xl font-bold text-center">Victory!!</div>
        <div className="m-4 text-xl font-bold text-center">
          Number of Guesses: {sco}
        </div>

        <div className="flex flex-col">
          <button className="btn text-xl btn-primary" onClick={newGame}>
            New Game
          </button>
        </div>
      </Modal>
    </>
  );
}
