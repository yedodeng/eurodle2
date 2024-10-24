import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import H2 from "../components/h2";

export default function RecentGames() {
  let [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    loadRecentGames();
  }, []);

  async function loadRecentGames() {
    let logs = JSON.parse(localStorage.getItem("unlimited-log") || "[]");
    setRecentGames(logs.slice(-5));
  }
  return (
    <div className="space-y-10">
      <H2>Recent Games</H2>
      <table className="table-1">
        <thead>
          <th></th>
          <th>Name</th>
          <th>Score</th>
        </thead>
        <tbody>
          {recentGames.map((g, i) => (
            <tr key={i}>
              <td>{formatDistance(new Date(g.time), new Date())}</td>
              <td>{g.name}</td>
              <td>{g.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
