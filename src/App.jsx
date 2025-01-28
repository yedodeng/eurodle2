import { Link, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Leaderboard from "./Pages/leaderboard";
import Admin from "./admin";
import Unlimited from "./Pages/unlimited";
import Daily from "./Pages/daily";
import { createContext, useContext, useState } from "react";
import Custom from "./Pages/custom";
import Knockout from "./Pages/knockout";
import Home from "./Pages/home";
import StatsPage from "./Pages/stats";
import RecentGames from "./Pages/recent";
import Test from "./Pages/test";


export const AppContext = createContext(null);

export default function App() {
  let [timer, setTimer] = useState();

  // return (
  //   <div>
  //     <Home />
  //   </div>
  // );

  return (
    <AppContext.Provider value={{ timer, setTimer }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/daily" element={<Daily />}></Route>
          <Route path="/unlimited" element={<Unlimited />}></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/custom" element={<Custom />}></Route>
          <Route path="/game2" element={<Knockout />}></Route>
          <Route path="/stats" element={<StatsPage />}></Route>
          <Route path="/recent" element={<RecentGames />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

function Layout() {
  let { x } = useContext(AppContext);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-around p-5 bg-gradient-end space-x-8">
        <div>
          <Link to="/">
            <img src="/logo.png" className="h-12" />
          </Link>
        </div>
        <div>
          <Link to="/daily">Daily</Link>
        </div>
        <div>
          <Link to="/unlimited">Unlimited</Link>
        </div>
        <div>
          <Link to="/game2">Knockout</Link>
        </div>
        <div>
          <Link to="/stats">Stats</Link>
        </div>
        <div>
          <Link to="/test">Test</Link>
        </div>
        {/* <div className="text-xl font-bold">
          <Link to="/admin">Admin</Link>
        </div> */}
      </nav>
      <main className="p-5 flex-1 flex flex-col container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
