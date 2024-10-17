import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Modal from "../modal";
import useGuesser from "../hooks/useGuesser";
import Guesses from "../components/guesses";
import { Link } from "react-router-dom";

export default function Daily() {
  let { peon, names, setNames, loadPeon, chk } = useGuesser();
  let [ans, setAns] = useState();
  let [showMod, setShowMod] = useState(false);
  let [win, setWin] = useState(false);
  let [ar, setAr] = useState([]);
  let [al, setAl] = useState(false);
  let [played, setPlayed] = useState([]);

  const testt = false;
  const won = localStorage.getItem("won");
  const sco = localStorage.getItem("score");

  useEffect(() => {
    if (won && chk(won)) setPlayed(true);
    loadData();
  }, []);

  useEffect(() => {
    console.log(ans);
    if (!ans) dailyAns();
  }, [peon])

  async function loadData() {
    const { data: data3 } = await supabase
      .from("answers")
      .select("*");

    let sto = data3.filter((v) => chk(v.date))
    if (sto.length > 0) {
      const { data } = await supabase
        .from("people")
        .select("*")
        .eq("name", sto[0].name)
        .single();
      setAns(data);
    }
  }

  async function dailyAns() {
    console.log("here")
    let date = new Date();
    let datePie = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ];
    let datePieAsNum = +datePie.join('');
    let uniq = Math.pow(datePieAsNum, 2).toString();
    let i = Math.floor((uniq.slice(-7) * 1e-7 * peon.length));
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
      setShowMod(true)
      setWin(true);
      setAl(false);
      let da = new Date();
      localStorage.setItem("won", da);
      localStorage.setItem("score", ar.length + 1);
    } else {
      setAr([...ar, gue]);
      setAl(false);
      setNames(names.filter((v) => v != gue.name));
    }
    ev.target.reset();
  }

  async function addName(ev) {
    ev.preventDefault();
    const { error } = await supabase
      .from("leaderboard")
      .insert({
        name: ev.target["name"].value,
        score: ar.length
      });
    if (error) console.log(error);
    setShowMod(false);
  }
  if (played && testt) return (
    <>
      <div className="text-2xl text-center font-bold mt-8">You have already played today</div>
      <div className="text-2xl text-center font-bold mt-8">You got a score of {sco} </div>
    </>
  )
  return (
    <>
      <div className="text-2xl text-center font-bold mt-4">Eurodle Daily</div>
      <div className="text-lg text-center font-bold">Guess the Important European!</div>
      {al && <div className="text-lg text-center text-error font-bold">Invalid Guess</div>}
      <Guesses ar={ar} ans={ans} win={win} guess={guess} names={names} />
      {win &&
        <div className="m-4 flex justify-center">
          <button className="btn btn-primary text-xl ">
            <Link to="/unlimited">Play More</Link>
          </button>
        </div>}
      <div className="text-center text-xl font-bold mt-8 mb-4">Number of Guesses: {sco}</div>
      <Modal show={showMod} close={() => setShowMod(false)} btn="X">
        <div className="mt-6 text-2xl font-bold text-center">Victory!!</div>
        <div className="m-4 text-xl font-bold text-center">Number of Guesses: {sco}</div>

        <form className="flex flex-col justify-center space-y-4" onSubmit={addName}>
          <input placeholder="Submit your name to the leaderboard" name="name" className="input input-bordered w-full" />
          <button className="btn text-xl btn-primary">Submit</button>
        </form>
      </Modal>
    </>
  )
}