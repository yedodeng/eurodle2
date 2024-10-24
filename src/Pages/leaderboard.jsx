import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { isSameDay } from "date-fns";
import H2 from "../components/h2";

export default function Leaderboard({}) {
  let [sbms, setSbms] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score");
    setSbms(data);
  }

  function chk(dat) {
    let d1 = new Date(dat);
    let d2 = new Date();
    return isSameDay(d1, d2);
  }

  return (
    <div className="space-y-10">
      <H2>Leaderboard</H2>
      <div className="flex justify-center">
        <table className="table-1">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sbms
              ? sbms
                  .filter((sbm, i) => chk(sbm.date))
                  .map((sbm, i) => (
                    <tr key={i}>
                      <th> {i + 1} </th>
                      <td> {sbm.name} </td>
                      <td> {sbm.score} </td>
                    </tr>
                  ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}
