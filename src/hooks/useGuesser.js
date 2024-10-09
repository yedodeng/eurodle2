import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { isSameDay } from "date-fns";

export default function useGuesser() {
  let [peon, setPeon] = useState([]);
  let [names, setNames] = useState([]);
    
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("people")
      .select("*")

    const { data: data2 } = await supabase
      .from("people")
      .select("name")
      .order('name', 'ascending');

    setPeon(data);
    setNames(data2.map((v) => v.name));
  }

  async function loadPeon(name) {
    const { data } = await supabase
      .from("people")
      .select("*")
      .eq("name", name)
      .single();

    return data;
  }

  function chk(dat) {
    let d1 = new Date(dat);
    d1.setDate(d1.getDate() + 1)
    let d2 = new Date();
    return isSameDay(d1, d2);
  }

  return {peon, names, setNames, loadPeon, chk};
}