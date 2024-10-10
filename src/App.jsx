import { Link, Outlet, Route, Routes } from "react-router-dom";
import "./App.css"
import Leaderboard from "./Pages/leaderboard";
import Admin from "./admin";
import Unlimited from "./Pages/unlimited";
import Daily from "./Pages/daily";
import { createContext, useContext, useState } from "react";
import Custom from "./Pages/custom";
import Game2 from "./Pages/game2";


export const AppContext = createContext(null);

export default function App() {
  let [timer, setTimer] =useState();

  // return (
  //   <div>
  //     <Home />
  //   </div>
  // );

  return (
    <AppContext.Provider value={{timer, setTimer}}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Daily />}></Route>
            <Route path="/unlimited" element={<Unlimited />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/custom" element={<Custom />}></Route>
            <Route path="/game2" element={<Game2 />}></Route>
          </Route>
        </Routes>
    </AppContext.Provider>
  );
}

function Layout() {
  let {x} = useContext(AppContext);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center border-primary border-b p-5 bg-gray-200 space-x-8">
        <div className="text-xl font-bold">
          <Link to="/">Daily</Link>
        </div>
        <div className="text-xl font-bold">
          <Link to="/unlimited">Unlimited</Link>
        </div>
        <div className="text-xl font-bold">
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
        <div className="text-xl font-bold">
          <Link to="/admin">Admin</Link>
        </div>
        <div className="text-xl font-bold">
          <Link to="/game2">2</Link>
        </div>
      </nav>
      <main className="p-5"><Outlet /></main>
    </div>
  );
}

