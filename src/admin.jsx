import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Admin() {
  let [names, setNames] = useState([]);
  let [error, setError] = useState("");
  const password = "";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("people")
      .select("name")
      .order('name', 'ascending');

    setNames(data.map((v) => v.name));
  }

  async function setAns(ev) {
    ev.preventDefault();
    if (ev.target["password"].value != password) {
      setError("Incorrect Password");
      return;
    }
    if (ev.target["date"]) {
      const { error } = await supabase
        .from("answers")
        .insert(
          { name: ev.target["name"].value,
            date: ev.target["date"].value }
        );
    } else {
      const { error } = await supabase
        .from("answers")
        .insert(
          { name: ev.target["name"].value }
        );
    }

    if (error) setError(error.message);
    else setError("");
  }

  return (
    <>
      <div className="text-2xl text-center font-bold mt-4">Admin</div>
      <form className="flex flex-col items-center space-y-2" onSubmit={setAns}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Daily Answer</span>
          </div>
          <input
            type="name"
            name="name"
            list="name"
            placeholder="Important Person in AP Euro"
            className="input input-bordered w-full max-w-xs"
          />
          <datalist id="name">
            {names?.map((v, i) => (
              <option value={v} key={i}></option>
            ))}
          </datalist>
          <div className="label"></div>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Date</span>
          </div>
          <input
            type="date"
            name="date"
            placeholder="Day for the Answer"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label"></div>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder=""
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label"></div>
        </label>
        <button className="btn btn-sm btn-primary">Submit</button>
      </form>
      {error && <div className="text-error text-center m-2">{error}</div>}
    </>
  )
}