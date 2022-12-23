import React, { useRef } from "react";
import "./login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ReactSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ReactSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              minLength="6"
              required
              ref={password}
            />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
