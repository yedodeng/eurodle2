import { useContext, useEffect, useState } from "react";
import Modal from "../modal";
import useGuesser from "../hooks/useGuesser";
import Guesses from "../components/guesses";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Unlimited() {
  let {peon, names, setNames, loadPeon} = useGuesser();
  let [ans, setAns] = useState({});
  let [showMod, setShowMod] = useState(false);
  let [win, setWin] = useState(false);
  let [ar, setAr] = useState([]);
  let [al, setAl] = useState(false);
  let [go, setGo] = useState(false);

  let {timer} = useContext(AppContext);
  let stri;
  timer = 5;
  if (timer) {
    stri = "duration-[" + timer + "ms]";
  }
  useEffect(() => {
    newAns();
  }, [peon])

  async function newAns() {
    let i = Math.floor(Math.random() * peon.length);
    let obe = peon[i];
    console.log(obe);
    setAns(obe);
  }

  async function guess(ev) {
    setGo(true);
    ev.preventDefault();
    let gue = await loadPeon(ev.target["guess"].value);
    if (gue == undefined) {
      setAl(true);
    } else if (gue.name == ans.name) {
      setAr([...ar, gue]);
      setShowMod(true)
      setWin(true);
      setAl(false);
    } else {
      setAr([...ar, gue]);
      setAl(false);
      setNames(names.filter((v) => v != gue.name));
    }
    ev.target.reset();
  }

  async function newGame() {
    setWin(false);
    newAns();
    setShowMod(false);
    setAr([]);
  }

  return (
    <>
      <div className="text-2xl text-center font-bold mt-4">Eurodle Unlimited {timer}</div>
      <div className="text-lg text-center font-bold">Guess the Important European!</div>
      {al && <div className="text-lg text-center text-error font-bold">Invalid Guess</div>}
      <Guesses ar={ar} ans = {ans} win ={win} guess={guess} names={names}/>
      {win &&
        <div className=" m-4 flex justify-center">
          <button className="btn text-xl btn-primary" onClick={newGame}>New Game</button>
        </div>}
      {ar.length == 0 && <div className = "flex justify-end my-8 mx-8">
        <button className="btn text-xl ">
            <Link to="/custom">Customize</Link>
          </button>
        </div>}
      {timer && <div className = {go ? "h-8 w-0 bg-red-200" : "h-8 w-full bg-red-200"} style={{
        	transitionDuration: (timer * 1000) + "ms"
      }}></div>}
      <Modal show={showMod} close={() => setShowMod(false)} btn="X">
        <div className="flex justify-center">
          <div className="m-4 mt-6 text-2xl font-bold">Victory!!</div>
        </div>
        <div className="flex flex-col">
          <button className="btn text-xl btn-primary" onClick={newGame}>New Game</button>
        </div>
      </Modal>
    </>
  )

}