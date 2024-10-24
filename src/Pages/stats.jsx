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
  const logs = JSON.parse(localStorage.getItem("unlimited-log") || []);
  let religion = getStat(logs, "religion");
  let era = getStat(logs, "era");
  let role = getStat(logs, "role");
  let country = getStat(logs, "country");

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <StatTable name="religion" data={religion} />
        <StatTable name="era" data={era} />
        <StatTable name="role" data={role} />
        <StatTable name="country" data={country} />
      </div>
    </div>
  );
}

function StatTable({ name, data }) {
  return (
    <div className="rounded-xl shadow p-5">
      <h1 className="font-bold mb-2">by {name}</h1>
      {/* <div>{JSON.stringify(data)}</div> */}
      <table className="table">
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
              <td>{v.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
