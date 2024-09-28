import { Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Home";
import "./App.css"
import Leaderboard from "./leaderboard";
import Admin from "./admin";

export default function App() {
  // return (
  //   <div>
  //     <Home />
  //   </div>
  // );
  return (
    <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home daily={true} key={1}/>}></Route>
            <Route path="/unlimited" element={<Home daily={false} key={2}/>}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Route>
        </Routes>
    </div>
  );
}

function Layout() {
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
      </nav>
      <main><Outlet /></main>
    </div>
  );
}

