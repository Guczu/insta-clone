import { useDispatch, useSelector } from 'react-redux'
import logo from '../images/logo.png'
import React, { useState } from 'react';
import useChangeRoute from '../methods/useChangeRoute';
import SearchBar from './SearchBar';
import Notifications from './Notifications';
import { setTheme } from '../reducers/themeSlice';
import AddPost from './AddPost';

export default function Navbar() {
  const user = useSelector(state => state.user);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isAddPost, setIsAddPost] = useState(false);
  const darkmode = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const changeRoute = useChangeRoute();

  const handleProfileButton = () => {
    changeRoute(`/${user.username}`);
    window.location.reload();
  }

  const handleInbox = () => {
    changeRoute('/inbox');
    window.location.reload();
  }

  const handleHomeButton = () => {
    changeRoute('/');
    window.location.reload();
  }

  const handleLogout = () => {
    localStorage.removeItem('uid');
    changeRoute('/login');
    window.location.reload();
  }

  const handleSearchBar = () => {
    setIsSearchBar(oldState => !oldState);
  }

  const handleNotifications = () => {
    setIsNotification(oldState => !oldState);
  }

  const handleAddPost = () => {
    setIsAddPost(oldState => !oldState);
  }

  const handleTheme = () => {
    if(darkmode === "light") {
      dispatch(setTheme("dark"));
      localStorage.setItem('darkmode', 'dark');
      document.querySelector('body').style.backgroundColor = '#0f0f0f';
    }
    else {
      dispatch(setTheme("light"));
      localStorage.setItem('darkmode', 'light');
      document.querySelector('body').style.backgroundColor = '#fafafa';
    }
  }

  return (
    <div className={`navbar--container ${darkmode}`}>
      <div className='mainpage--navbar'>
          <div className='mainpage--logo'>
            <div className="navbar--logoimg" onClick={handleHomeButton}>
              <img src={logo} className='navbar--image'></img>
            </div>
          </div>

          <div onClick={handleHomeButton} className='mainpage--link'>
            <i className="fa-sharp fa-solid fa-house fa-xl"></i>
            <span className='navbar--link'>Strona główna</span>
          </div>
    
          <div className='mainpage--link' onClick={handleSearchBar}>
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            <span className='navbar--link'>Szukaj</span>
          </div>
          
          <div className='mainpage--link'>
            <i className="fa-regular fa-compass fa-xl"></i>
            <span className='navbar--link'>Eksploruj</span>
          </div>
          
          <div className='mainpage--link'>
            <i className="fa-solid fa-film fa-xl"></i>
            <span className='navbar--link'>Reels</span>
          </div>
          
          <div onClick={handleInbox} className='mainpage--link'>
            <i className="fa-regular fa-envelope fa-xl"></i>
            <span className='navbar--link'>Wiadomości</span>
          </div>
          
          <div className='mainpage--link' onClick={handleNotifications}>
            <i className="fa-regular fa-heart fa-xl"></i>
            <span className='navbar--link'>Powiadomienia</span>
          </div>
          
          <div className='mainpage--link' onClick={handleAddPost}>
            <i className="fa-regular fa-square-plus fa-xl"></i>
            <span className='navbar--link'>Utwórz</span>
          </div>
          
          <div onClick={handleProfileButton} className='mainpage--link'>
            <img src={user.picture} className='navbar--profileimg'></img>
            <span className='navbar--link'>Profil</span>
          </div>
        
          <div onClick={handleLogout} className='mainpage--link'>
            <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
            <span className='navbar--link'>Wyloguj</span>
          </div>

          <div className='mainpage--morecontainer'>
            <div onClick={handleTheme} className='mainpage--link'>
              <i className="fa-solid fa-moon fa-xl"></i>
              <span className='navbar--link'>Dark mode</span>
            </div>
          </div>
      </div>
      {isSearchBar && <SearchBar handleSearchBar= {handleSearchBar} />}
      {isNotification && <Notifications handleNotifications= {handleNotifications} />}
      {isAddPost && <AddPost handleAddPost={handleAddPost} />}
    </div>
  )
}
