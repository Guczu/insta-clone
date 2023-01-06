import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import storyimg from '../images/storyimg.jpg'
import useChangeRoute from '../methods/useChangeRoute';

export default function Navbar() {
  const user = useSelector(state => state.user);
  const changeRoute = useChangeRoute();

  const handleProfileButton = () => {
    //navigate(`/${user.username}`, { replace: true });
    changeRoute(`/${user.username}`);
    window.location.reload();
  }

  const handleHomeButton = () => {
    changeRoute('/');
    window.location.reload();
  }

  return (
    <div className='mainpage--navbar'>
        <div className='mainpage--logo'>
          <div onClick={handleHomeButton}>
            <img src={logo}></img>
          </div>
        </div>

        <div onClick={handleHomeButton} className='mainpage--link'>
          <i className="fa-sharp fa-solid fa-house fa-xl"></i>
          <span className='navbar--link'><b>Strona główna</b></span>
        </div>
  
        <div className='mainpage--link'>
          <i className="fa-solid fa-magnifying-glass fa-xl"></i>
          <a href="#">Szukaj</a>
        </div>
        
        <div className='mainpage--link'>
          <i className="fa-regular fa-compass fa-xl"></i>
          <a href="#">Eksploruj</a>
        </div>
        
        <div className='mainpage--link'>
          <i className="fa-solid fa-film fa-xl"></i>
          <a href="#">Reels</a>
        </div>
        
        <div className='mainpage--link'>
          <i className="fa-regular fa-envelope fa-xl"></i>
          <a href="#">Wiadomości</a>
        </div>
        
        <div className='mainpage--link'>
          <i className="fa-regular fa-heart fa-xl"></i>
          <a href="#">Powiadomienia</a>
        </div>
        
        <div className='mainpage--link'>
          <i className="fa-regular fa-square-plus fa-xl"></i>
          <a href="#">Utwórz</a>
        </div>
        
        <div onClick={handleProfileButton} className='mainpage--link'>
          <img src={user.picture} className='navbar--profileimg'></img>
          <span className='navbar--link'>Profil</span>
        </div>
      
        <Link to='/logout' className='mainpage--link'>
          <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
          <span className='navbar--link'>Wyloguj</span>
        </Link>
        
        <div className='mainpage--morecontainer'>
          <div className='mainpage--more'>
            <i className="fa-solid fa-bars fa-xl"></i>
            <a href="#">Więcej</a>
          </div>
        </div>
    </div>
  )
}
