import { useEffect, useMemo, useState } from "react"
import { supabase } from "../supabaseClient"
import Modal from "../modal";

function removeDup(ar) {
    return Array.from(new Set(ar));
}

function matchValue(obj, v) {
    return Object.values(obj).includes(v);
}

export default function Knockout() {
    const [debug, setDebug] = useState(undefined);
    const [people, setPeople] = useState(undefined);
    const [right, setRight] = useState(undefined);
    const [ans, setAns] = useState(undefined);
    const [filters, setFilters] = useState({});
    const [num, setNum] = useState(0);
    let [incor, setIncor] = useState([]);
    const [once, setOnce] = useState(true);
    let [showMod, setShowMod] = useState(false);


    useEffect(() => {
        async function loadPeople() {
            const { data } = await supabase
                .from("people")
                .select("*");
            setPeople(data);
            setRight(data);
            setAns(data[Math.floor(Math.random() * data.length)]);
        }
        
        loadPeople();
    }, []);

    useEffect(() => {
        if (once && people) {
            // console.log("what")
            createFilter();
            setOnce(false);
        }
    }, [people])

    useEffect(() => {
        if (right && right.length == 1) {
            setShowMod(true);
        }
    }, [right])

    async function newGame() {

    }
    async function handleFilter(v, key) {
        let newIncor = incor;

        if (matchValue(ans, v)) {
            newIncor= [...incor, ...people.filter((p) => p[key] !== v).map((p) => p.id)]
            // console.log(newIncor);
            setRight(right.filter((p) => p[key] == v));
        }
        else {
            newIncor= [...incor, ...people.filter((p) => p[key] === v).map((p) => p.id)]
            setRight(right.filter((p) => p[key] != v));
        }
        newIncor = removeDuplicates(newIncor);
        // console.log(newIncor);

        setIncor(newIncor);
        setNum(num + 1);
    }

    async function handlePerson(v){
        if (v == ans) {
            setIncor([...people.filter(p => p != v).map((p) => p.id)])
            setRight(right.filter(j => j == v))
        }  else {
            console.log([...incor, v.id])
            setIncor([...incor, v.id])
            setRight(right.filter(j => j != v))
        }
        setNum(num + 1);
    }

    function removeDuplicates(arr) {
        let unique = [];
        arr.forEach(element => {
            if (!unique.includes(element)) {
                unique.push(element);
            }
        });
        return unique;
    }

    function chk(key) {
        let i = 0;
        filters[key].forEach(v => {
            if (options.includes(v)) i++;
        })
        return i == 1;
    }

    async function createFilter() {
        let ilters = {};
        if (right) {
            let peopleFiltered = right.map(v => {
                let { id, name, byear, religion, ...rest } = v;
                return rest;
            })
            let p = peopleFiltered[0];
            for (let key of Object.keys(peopleFiltered[0])) {
                ilters[key] = [];
            }

            for (let p of peopleFiltered) {
                for (let key of Object.keys(p)) {
                    ilters[key].push(p[key]);
                }
            }

            for (let key of Object.keys(ilters)) {
                ilters[key] = removeDup(ilters[key]);
            }
        }
        setFilters(ilters);
    }

    const options = useMemo(() => {
        let filters = [];
        if (right) {
            let peopleFiltered = right.map(v => {
                let { id, name, byear, religion, ...rest } = v;
                return rest;
            })
            for (let p of peopleFiltered) {
                for (let key of Object.keys(p)) {
                    filters.push(p[key]);
                }
            }
                filters = removeDuplicates(filters);
                // console.log(filters);
            
        }
        return filters;

    }, [right])



    if (!people || people.length === 0) return <div>loading....</div>

    return <div>
        {
            ans && <div>{JSON.stringify(ans)}</div>
        }
        <div className="flex space-x-1 mb-4">
            {
                Object.keys(filters).map(key => <div key={key} className="border-4">
                    <div>{key}</div>
                    <div className="flex flex-wrap gap-1">
                        {
                            filters[key].map((v, i) => <button onClick={() => {
                                handleFilter(v, key)
                            }}disabled={!options.includes(v)} className={`btn btn-xs
                                ${matchValue(ans, v) && chk(key) ? "btn-success" : ''}
                                `} key={i}>{v}</button>) 
                        }
                    </div>
                </div>)
            }
        </div>
        <div>
            {people && <div className="flex flex-wrap gap-2">
                {people.map((v, i) => <button key={i} onClick={() => handlePerson(v)} 
                disabled={incor.includes(v.id)}
                className={"btn btn-sm"} 
                style={{transitionDuration: "2000ms"}}>{v.name}</button>)}
            </div>}
        </div>
        <div>{right.length}</div>
        <div className="text-center text-xl font-bold my-8">Number of Guesses: {num}</div>
        <Modal show={showMod} close={() => setShowMod(false)} btn="X">
        <div className="flex justify-center">
          <div className="m-4 mt-6 text-2xl font-bold">Victory!!</div>
        </div>
        <div className="flex flex-col">
          <button className="btn text-xl btn-primary" onClick={newGame}>New Game</button>
        </div>
      </Modal>
    </div>
}