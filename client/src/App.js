import { Route, Routes, redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./components/register/register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? redirect("/") : <Login />} />
        <Route path="/register" element={user ? redirect("/") : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
