import { Link } from "react-router-dom";
import H2 from "../components/h2";

const blocks = [
  {
    name: "Daily",
    desc: `Each day, players try to guess the same historical figure from AP European History. After each guess, players receive clues that compare their guess to the answer 
            The goal is to identify the correct person with the fewest guesses!`,
    href: "/daily",
  },
  {
    name: "Unlimited",
    href: "/unlimited",
    desc: `Unlimited practice with the same format of the daily. Perfect to continue praticing your AP Euro knowledge even after the daily.`,
  },
  {
    name: "Knockout",
    href: "/knockout",
    desc: `Another minigame to practice your AP Euro knowledge. Repeatedly knockout categories which will knockout people
            until you are only left with one person.`,
  },
  {
    name: "Statistics",
    href: "/stats",
    desc: `Learn further stats to know what areas you are weak in. Gives you data on your average scores for specific categories in unlimited.`,
  },
];

export default function Home() {
  return (
    <div className="">
      <h1 className="text-center text-4xl font-bold mt-5">EURODLE</h1>
      <div className="text-2xl text-center mb-8 text-gray-2">
        An AP European History Study Tool
      </div>
      <hr />
      <div className="">
        {blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

function Block({ block }) {
  let { name, desc, href } = block;

  return (
    <>
      <div className="py-10 flex flex-col items-center space-y-10">
        <H2>{name}</H2>
        <div className="w-2/3">{desc}</div>
        <Link to={href} className="btn-primary w-1/3">
          Move
        </Link>
      </div>
      <hr />
    </>
  );
}
