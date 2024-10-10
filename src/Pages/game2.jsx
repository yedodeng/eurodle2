import { useEffect, useMemo, useState } from "react"
import { supabase } from "../supabaseClient"

function removeDup(ar) {
    return Array.from(new Set(ar));
}

function matchValue(obj, v) {
    return Object.values(obj).includes(v);
}

export default function Game2() {
    const [debug, setDebug] = useState(undefined);
    const [people, setPeople] = useState(undefined);
    const [ans, setAns] = useState(undefined);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        async function loadPeople() {
            const { data } = await supabase
                .from("people")
                .select("*");
            setPeople(data);
            setAns(data[Math.floor(Math.random() * data.length)]);
        }

        loadPeople();
    }, []);

    const options = useMemo(() => {
        let filters = {};
        if (people) {
            let peopleFiltered = people.map(v => {
                let { id, name, byear, ...rest } = v;
                return rest;
            })
            let p = peopleFiltered[0];
            for (let key of Object.keys(peopleFiltered[0])) {
                filters[key] = [];
            }

            for (let p of peopleFiltered) {
                for (let key of Object.keys(p)) {
                    filters[key].push(p[key]);
                }
            }

            for (let key of Object.keys(filters)) {
                filters[key] = removeDup(filters[key]);
            }
        }
        return filters;

    }, [people])

    if (!people || people.length === 0) return <div>loading....</div>

    return <div>
        {
            ans && <div>{JSON.stringify(ans)}</div>
        }
        <div className="flex space-x-1">
            {
                Object.keys(options).map(key => <div key={key} className="border-4">
                    <div>{key}</div>
                    <div className="flex flex-wrap gap-1">
                        {
                            options[key].map((v, i) => <button onClick={() => {
                                if (!filters.includes(v))
                                    setFilters([...filters, v])
                            }} className={`btn btn-xs
                                ${!filters.includes(v) ? '' : matchValue(ans, v) ? "btn-success" : "btn-error"}
                                `} key={i}>{v}</button>)
                        }
                    </div>
                </div>)
            }
        </div>
    </div>
}