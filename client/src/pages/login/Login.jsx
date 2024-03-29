import React, { useContext, useEffect, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { notifyError } from "../../utils/notifyMessages";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      notifyError("Invalid Email or Password");
    }
  }, [error]);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  return (
    <div className="login ">
      <div className="loginWrapper flex-col md:flex-row">
        <div className="loginLeft">
          <h3 className="loginLogo text-center md:text-[50px]">&lt; DevSocial /&gt; </h3>
          <span className="loginDesc text-center md:text-[24px]">
            Connect with friends and the world around you on DevSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="teste@teste.com"
              className="loginInput"
              type="email"
              required
              ref={email}
            />
            <input
              placeholder="******"
              className="loginInput"
              type="password"
              minLength="6"
              required
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? <LoadingSpinner /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register" className="linkToRegister">
              <button className="loginRegisterButton">
                {isFetching ? <LoadingSpinner /> : "Create a New Account"}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
