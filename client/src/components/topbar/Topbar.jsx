import React from 'react'
import './topbar.css';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from "react-router-dom"

export default function Topbar() {
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
          <img src="/assets/person/1.jpeg" alt="person" className="topbarImg"/>
      </div>
    </div>
  )
}
