import { useMemo } from "react";

function getStat(ar, key) {
  let map = ar.reduce((prev, v) => {
    if (!prev[v[key]]) prev[v[key]] = { sum: 0, cnt: 0 };
    prev[v[key]].sum += v.score;
    prev[v[key]].cnt++;
    return prev;
  }, {});

  let ret = Object.keys(map).map((key) => ({
    name: key,
    avg: (map[key].sum / map[key].cnt).toFixed(2),
  }));

  ret.sort((a, b) => a.avg - b.avg);
  return ret;
}



export default function StatsPage() {
  const stats = useMemo(() => {
    try {
      // Safe JSON parsing fallback
      const rawLogs = localStorage.getItem("unlimited-log");
      const logs = rawLogs ? JSON.parse(rawLogs) : [];
      
      return {
        religion: getStat(logs, "religion"),
        era: getStat(logs, "era"),
        role: getStat(logs, "role"),
        country: getStat(logs, "country"),
      };
    } catch (e) {
      console.error("Failed to parse logs from localStorage", e);
      return { religion: [], era: [], role: [], country: [] };
    }
  }, []); 

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <StatTable name="religion" data={stats.religion} />
        <StatTable name="era" data={stats.era} />
        <StatTable name="role" data={stats.role} />
        <StatTable name="country" data={stats.country} />
      </div>
    </div>
  );
}

function StatTable({ name, data }) {
  return (
    <div className="rounded-xl shadow p-5 space-y-5">
      <h3>by {name}</h3>
      {/* <div>{JSON.stringify(data)}</div> */}
      <table className="table-1">
        <thead>
          <tr>
            <th>{name}</th>
            <th>Avg. Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <tr key={i}>
              <td>{v.name}</td>
              <td><strong>{v.avg}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
