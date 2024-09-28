import { useEffect, useState } from "react";
import Modal from "./modal";
import { supabase } from "./supabaseClient";

export default function Home({ daily }) {
  let [ans, setAns] = useState({});
  let [showMod, setShowMod] = useState(false);
  let [win, setWin] = useState(false);
  let [ar, setAr] = useState([]);
  let [peon, setPeon] = useState([]);
  let [al, setAl] = useState(false);
  let [preans, setPreans] = useState();
  let [names, setNames] = useState([]);

  let now = new Date();
  let mon = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : str(now.getMonth() + 1); 
  let dat = now.getFullYear() + "-" + mon  + "-" + now.getDate();
  const won = localStorage.getItem(won);


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    daily ? dailyAns() : newAns();
  }, [peon])

  async function loadData() {
    const { data } = await supabase
      .from("people")
      .select("*")

    const { data: data2 } = await supabase
      .from("people")
      .select("name")
      .order('name', 'ascending');


    

    setPeon(data);
    setNames(data2.map((v) => v.name));
  }

  async function dailyAns() {
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

  async function newAns() {
    let i = Math.floor(Math.random() * peon.length);
    let obe = peon[i];
    console.log(obe);
    setAns(obe);
  }

  async function loadPeon(name) {
    const { data } = await supabase
      .from("people")
      .select("*")
      .eq("name", name)
      .single();

    return data;
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
    localStorage.setItem(won, true);
  }

  return (
    <>
      <div className="text-2xl text-center font-bold mt-4">Eurodle {daily ? "Daily" : "Unlimited"}</div>
      <div className="text-lg text-center font-bold">Guess the Important European!</div>
      {al && <div className="text-lg text-center text-error font-bold">Invalid Guess</div>}
      {ar.length != 0 &&
        <table className="table table-1" style={{
          borderSpacing: 20
        }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Year</th>
              <th>Era</th>
              <th>Country</th>
              <th>Occupation</th>
              <th>Religion</th>
            </tr>
          </thead>
          <tbody>
            {ar
              .map((v, i) => (
                <tr key={i}>
                  <td className={v.name == ans.name ? "bg-green-200" : "bg-red-200"}>{v.name}</td>
                  <td className={v.byear == ans.byear ? "bg-green-200" : "bg-red-200"}>
                    <>
                      <div>{v.byear + (v.byear > ans.byear ? " (Smaller)" : " (Greater)")}</div>
                    </>
                  </td>
                  <td className={v.era == ans.era ? "bg-green-200" : "bg-red-200"}>{v.era}</td>
                  <td className={v.country == ans.country ? "bg-green-200" : "bg-red-200"}>{v.country}</td>
                  <td className={v.role == ans.role ? "bg-green-200" : "bg-red-200"}>{v.role}</td>
                  <td className={v.religion == ans.religion ? "bg-green-200" : "bg-red-200"}>{v.religion}</td>
                </tr>
              ))}
          </tbody>
        </table >
      }
      <form className="flex justify-evenly my-4" onSubmit={guess}>
        <div>
          <input list="guess" name="guess" className="input input-bordered w-full max-w-xs" />
          <datalist id="guess">
            {names?.map((v, i) => (
              <option value={v} key={i}></option>
            ))}
          </datalist>
        </div>
        <button className="btn text-xl btn-primary" disabled={win || won}>Submit</button>
      </form>
      {win &&
        <div className=" m-4 flex justify-center">
          <button className="btn text-xl btn-primary" disabled={daily} onClick={newGame}>New Game</button>
        </div>}
      <Modal show={showMod && !daily} close={() => setShowMod(false)} btn="X">
        <div className="flex justify-center">
          <div className="m-4 mt-6 text-2xl font-bold">Victory!!</div>
        </div>
        <div className="flex flex-col">
          <button className="btn text-xl btn-primary" onClick={newGame}>New Game</button>
        </div>
      </Modal>
      <Modal show={showMod && daily} close={() => setShowMod(false)} btn="X">
        <div className="flex justify-center">
          <div className="m-4 mt-6 text-2xl font-bold">Victory!!</div>
        </div>
        <form className="flex flex-col justify-center space-y-4" onSubmit={addName}>
          <input placeholder="Submit your name to the leaderboard" name="name" className="input input-bordered w-full" />
          <button className="btn text-xl btn-primary">Submit</button>
        </form>
      </Modal>
    </>
  )
}



