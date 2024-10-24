export default function Guesses({ ar, ans }) {
  return (
    <>
      {ar.length != 0 && (
        <table className="table-1">
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
            {ar.map((v, i) => (
              <tr key={i}>
                <td className={v.name == ans.name ? "correct" : "wrong"}>
                  <div>{v.name}</div>
                </td>
                <td className={v.byear == ans.byear ? "correct" : "wrong"}>
                  <>
                    <div>
                      {v.byear +
                        (v.byear > ans.byear ? " (Smaller)" : " (Greater)")}
                    </div>
                  </>
                </td>
                <td className={v.era == ans.era ? "correct" : "wrong"}>
                  <div>{v.era}</div>
                </td>
                <td className={v.country == ans.country ? "correct" : "wrong"}>
                  <div>{v.country}</div>
                </td>
                <td className={v.role == ans.role ? "correct" : "wrong"}>
                  <div>{v.role}</div>
                </td>
                <td
                  className={v.religion == ans.religion ? "correct" : "wrong"}
                >
                  <div>{v.religion}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
