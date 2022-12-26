import React, { useContext } from 'react'
import './topbar.css';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/">
          <span className='logo'>React_Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <Search className="searchIcon"/>
        <input placeholder='Search for friend, post or video' className='searchInput' />
      </div>
      <div className="topbarRight">
        <div className='topbarLinks'>
          <div className="topbarLink">Homepage</div>
          <div className="topbarLink">Timeline</div>
        </div>

        <div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <div className="topbarIconItemBadge">1</div>
            </div>

            <div className="topbarIconItem">
              <Chat />
              <div className="topbarIconItemBadge">3</div>
            </div>

            <div className="topbarIconItem">
              <Notifications />
              <div className="topbarIconItemBadge">1</div>
            </div>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="person" className="topbarImg"/>
        </Link>
      </div>
    </div>
  )
}
