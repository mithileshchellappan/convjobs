import About from "./pages/about/about";
import Welcome from "./pages/welcome/welcome";
import Dashboard from "./pages/dashboard/dashboard";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/login/login";
import MyProfile from "./pages/profile/profile";

export default function App() {
  return (
    <Router>
        <Navigation />
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/" Component={Welcome} />
        <Route path="/profile" Component={MyProfile} />
        <Route path="/about" Component={About} />
        {/* <Route path="*" Component={Error} /> */}
      </Routes>
    </Router>
  );
}

const Navigation=()=> {
  return (
    <nav>
      <ul>
        <li><Link to="/">Welcomw</Link></li>
        <li><Link to="/login">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
}
