import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/register";
import Home from './pages/home/Home';
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </div>
  );
}

export default App;
