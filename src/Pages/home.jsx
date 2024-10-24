export default function Home() {
  return (
    <>
      <div className="text-5xl text-center font-bold m-4">Eurodle</div>
      <div className="text-2xl text-center mb-8">An AP European History Study Tool</div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 grid-rows-4 w-1/2 h-auto">
          <div className="border border-black text-5xl text-center font-bold pt-5">Daily 📅</div>
          <div className="border border-black text-5xl text-center font-bold pt-5">Unlimited ♾️</div>
          <div className=" border-black p-2">Each day, players try to guess the same historical figure from AP European History. After each guess, players receive clues that compare their guess to the answer 
            The goal is to identify the correct person with the fewest guesses! 
          </div>
          <div className=" border-black p-2">Unlimited practice with the same format of the daily. Perfect to continue praticing your AP Euro knowledge even after the daily.</div>
          <div className="border border-black text-5xl text-center font-bold pt-5">Knockout 🥊</div>
          <div className="border border-black text-5xl text-center font-bold pt-5">Statistics 📊</div>
          <div className=" border-black p-2">Another minigame to practice your AP Euro knowledge. Repeatedly knockout categories which will knockout people
            until you are only left with one person. 
          </div>
          <div className=" border-black p-2">Learn further stats to know what areas you are weak in. Gives you data on your average scores for specific categories in unlimited.</div>
        </div>
      </div>
    </>
  )
}