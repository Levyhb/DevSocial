import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./search.css";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get(`q`);
  const [searchedUser, setSearchedUser] = useState([]);
  const AR = process.env.REACT_APP_API_REF;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  useEffect(() => {
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
      <div className="searchContainer w-full">
        <Sidebar />
        <div className="searchWrapper">
          {searchedUser.length > 0 ? (
            searchedUser.map((u) => (
              <Link className="usersInfo" to={"/profile/" + u.username}>
                <img
                  src={
                    u.profilePicture
                      ? PF + u.profilePicture
                      : PF + "/person/noAvatar.png"
                  }
                  alt=""
                />
                <span>{u.username}</span>
              </Link>
            ))
          ) : (
            <div className="noFoundUser w-full">
              <h2>No user found </h2>
            </div>
          )}
        </div>
        <Rightbar user={user} className="hidden md:flex"/>
      </div>
    </>
  );
}
