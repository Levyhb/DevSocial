import axios from "axios";
import React, { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from 'react-router-dom';
import { notifyError } from "../../utils/notifyMessages"

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const AR = process.env.REACT_APP_API_REF;

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don´t match")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post(`${AR}/auth/register`, user);
        navigate("/login")
      } catch (err) {
        notifyError(err.response.data);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper flex-col md:flex-row">
        <div className="loginLeft">
          <h3 className="loginLogo text-center md:text-[50px]">&lt; DevSocial /&gt;</h3>
          <span className="loginDesc text-center md:text-[24px]">
            Connect with friends and the world around you on DevSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              required
              placeholder="Username"
              className="loginInput"
              ref={username}
            />
            <input
              required
              placeholder="Email"
              className="loginInput"
              ref={email}
              type="email"
            />
            <input
              required
              placeholder="Password"
              className="loginInput"
              ref={password}
              min="6"
              type="password"
            />
            <input
              required
              placeholder="Password Again"
              className="loginInput"
              min="6"
              ref={passwordAgain}
              type="password"
            />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton"><Link to="/login">Log Into Account</Link></button>
          </form>
        </div>
      </div>
    </div>
  );
}
