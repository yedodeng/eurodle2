import { useContext, useState } from "react";
import { AppContext } from "../App";

export default function Custom() {
    let {setTimer} = useContext(AppContext);
    let [sto, setSto] = useState(undefined);

    async function changeTimer(ev) {
        ev.preventDefault();
        let time = ev.target["time"].value;
        setTimer(time);
        setSto(time);
    }

    return (
        <form className="flex justify-evenly my-4" onSubmit={changeTimer}>
        <div>
          <input name="time" className="input input-bordered w-full max-w-xs" />
        </div>
        <button className="btn text-xl btn-primary hover:btn-secondary">{sto ? sto : "Hello"}</button>
        <div className="bg-gray-300 duration-1000 w-48 hover:w-64">test</div>
      </form>
    )
}