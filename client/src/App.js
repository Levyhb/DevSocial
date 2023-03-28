import { Route, Routes, Navigate } from "react-router-dom";
import 'animate.css';
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Search from "./pages/search/Search";


function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
        <Route
          exact path="/profile/:username"
          element={user ? <Profile /> : <Navigate replace to="/" />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate replace to="/" /> : <Messenger />}
        />
        <Route
          path="/search"
          element={!user ? <Navigate replace to="/" /> : <Search />}
        />
      </Routes>
    </div>
  );
}

export default App;
