export default function Guesser({ daily }) {
  if (daily) {
    
  }
  

  return (
    <>
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
        <button className="btn text-xl btn-primary" disabled={win}>Submit</button>
      </form>
    </>
  )
}