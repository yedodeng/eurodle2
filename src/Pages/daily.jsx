import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Modal from "../modal";
import useGuesser from "../hooks/useGuesser";
import Guesses from "../components/guesses";
import { Link } from "react-router-dom";
import H2 from "../components/h2";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Daily() {
  let { peon, names, setNames, loadPeon, chk } = useGuesser();
  let [ans, setAns] = useState();
  let [showMod, setShowMod] = useState(false);
  let [win, setWin] = useState(false);
  let [ar, setAr] = useState([]);
  let [al, setAl] = useState(false);
  let [played, setPlayed] = useState(false);

  const testt = true;
  const won = localStorage.getItem("won");
  const sco = localStorage.getItem("score");
  useEffect(() => {
    if (won && chk(won)) {
      setPlayed(true);
    }
    if (!chk(won) || !testt) localStorage.setItem("score", 0);
    loadData();
  }, []);

  useEffect(() => {
    if (!ans) dailyAns();
  }, [peon]);

  async function loadData() {
    const { data: data3 } = await supabase.from("answers").select("*");

    let sto = data3.filter((v) => chk(v.date));
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
    let date = new Date();
    let datePie = [date.getFullYear(), date.getMonth(), date.getDate()];
    let datePieAsNum = +datePie.join("");
    let uniq = Math.pow(datePieAsNum, 2).toString();
    let i = Math.floor(uniq.slice(-7) * 1e-7 * peon.length);
    let obe = peon[i];
    setAns(obe);
    console.log(obe);
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
      let da = new Date();
      localStorage.setItem("won", da);
      localStorage.setItem("score", ar.length + 1);
    } else {
      setAr([...ar, gue]);
      setAl(false);
      setNames(names.filter((v) => v != gue.name));
      localStorage.setItem("score", Number(localStorage.getItem("score")) + 1);
    }
    ev.target.reset();
  }

  async function addName(ev) {
    ev.preventDefault();
    const { error } = await supabase.from("leaderboard").insert({
      name: ev.target["name"].value,
      score: ar.length,
    });
    if (error) console.log(error);
    setShowMod(false);
  }
  if (played && testt)
    return (
      <>
        <div className="text-2xl text-center font-bold mt-8">
          You have already played today
        </div>
        <div className="text-2xl text-center font-bold mt-8">
          You got a score of {sco}{" "}
        </div>
        <div className="flex justify-center m-10">
          <button className="btn btn-lg text-2xl ">
            <Link to="/leaderboard">Leaderboard</Link>
          </button>
        </div>
      </>
    );
  return (
    <div className="space-y-5 flex flex-col items-center flex-1">
      <H2>Eurodle Daily</H2>
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
          <Link to="/leaderboard" className="flex items-center space-x-2">
            <FaArrowCircleRight />
            <div className="font-bold">Leaderboard</div>
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
      <Modal show={showMod} close={() => setShowMod(false)} btn="X">
        <div className="mt-6 text-2xl font-bold text-center">Victory!!</div>
        <div className="m-4 text-xl font-bold text-center">
          Number of Guesses: {sco}
        </div>
        <form
          className="flex flex-col justify-center space-y-4"
          onSubmit={addName}
        >
          <input
            placeholder="Submit your name to the leaderboard"
            name="name"
            className="input input-bordered w-full bg-transparent"
          />
          <button className="btn text-xl btn-primary">Submit</button>
        </form>
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
