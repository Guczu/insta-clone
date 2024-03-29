import { useDispatch, useSelector } from 'react-redux'
import logo from '../images/logo.png'
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Notifications from './Notifications';
import AddPost from './AddPost';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = useSelector(state => state.user);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isAddPost, setIsAddPost] = useState(false);
  const navigate = useNavigate();

  const handleProfileButton = () => {
    navigate(`/${user.username}`);
  }

  const handleInbox = () => {
    navigate('/inbox');
  }

  const handleHomeButton = () => {
    navigate('/');
  }

  const handleLogout = () => {
    localStorage.removeItem('uid');
    navigate('/login');
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

  return (
    <div className='navbar--container'>
      <div className='mainpage--navbar'>
          <div className='mainpage--logo'>
            <div className='navbar--logoimg'>
              <img src={logo} className='navbar--image' onClick={handleHomeButton} alt='instagram logo' />
            </div>
          </div>

          <div onClick={handleHomeButton} className='mainpage--link'>
            <i className='fa-sharp fa-solid fa-house fa-xl'/>
            <span className='navbar--link'>Strona główna</span>
          </div>
    
          <div className='mainpage--link' onClick={handleSearchBar}>
            <i className='fa-solid fa-magnifying-glass fa-xl'/>
            <span className='navbar--link'>Szukaj</span>
          </div>
          
          <div className='mainpage--link'>
            <i className='fa-regular fa-compass fa-xl'/>
            <span className='navbar--link'>Eksploruj</span>
          </div>
          
          <div className='mainpage--link'>
            <i className="fa-solid fa-film fa-xl"></i>
            <span className='navbar--link'>Reels</span>
          </div>
          
          <div onClick={handleInbox} className='mainpage--link'>
            <i className='fa-regular fa-envelope fa-xl'/>
            <span className='navbar--link'>Wiadomości</span>
          </div>
          
          <div className='mainpage--link' onClick={handleNotifications}>
            <i className='fa-regular fa-heart fa-xl'/>
            <span className='navbar--link'>Powiadomienia</span>
          </div>
          
          <div className='mainpage--link' onClick={handleAddPost}>
            <i className='fa-regular fa-square-plus fa-xl'/>
            <span className='navbar--link'>Utwórz</span>
          </div>
          
          <div onClick={handleProfileButton} className='mainpage--link'>
            <img src={user.picture} className='navbar--profileimg' alt='zdjęcie profilowe' />
            <span className='navbar--link'>Profil</span>
          </div>
        
          <div onClick={handleLogout} className='mainpage--link'>
            <i className='fa-solid fa-arrow-right-from-bracket fa-xl'/>
            <span className='navbar--link'>Wyloguj</span>
          </div>
      </div>
      {isSearchBar && <SearchBar handleSearchBar={handleSearchBar} />}
      {isNotification && <Notifications handleNotifications={handleNotifications} />}
      {isAddPost && <AddPost handleAddPost={handleAddPost} />}
    </div>
  )
}
