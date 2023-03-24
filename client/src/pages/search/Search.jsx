import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./search.css";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get(`q`);
  const [searchedUser, setSearchedUser] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const AR = process.env.REACT_APP_API_REF;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setRedirect(false);
    const getSearchedUser = async () => {
      try {
        const res = await axios.get(`${AR}/users/${query}`);
        setSearchedUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSearchedUser();
  }, [query]);

  return (
    <>
      <Topbar />
      <div className="searchContainer">
        <Sidebar />
        <div className="searchWrapper">
          {searchedUser.length > 0 ? (
            searchedUser.map((u) => (
              <div className="usersInfo" onClick={() => setRedirect(true)}>
                <img
                  src={
                    u.profilePicture
                      ? PF + u.profilePicture
                      : PF + "/person/noAvatar.png"
                  }
                  alt=""
                />
                <span>{u.username}</span>
                {redirect && <Navigate replace to={`/profile/${u.username}`} />}
              </div>
            ))
          ) : (
            <div className="noFoundUser">
              <h2>No user found </h2>
            </div>
          )}
        </div>
        <Rightbar user={user} />
      </div>
    </>
  );
}
