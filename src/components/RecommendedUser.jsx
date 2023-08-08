import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import followUser from '../methods/followUser';
import { Link } from 'react-router-dom';

export default function RecommendedUser(props) {
  const user = useSelector(state => state.user);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const checkFollow = () => {
      if(user.followers !== undefined) {
        user.followers.forEach((follow) => {
          if(follow.user_followed === props.userData.data.username) {
            setIsFollowed(true);
          }
        })
      }
    }
    checkFollow();
  },[props])

  const checkIfFollowed = () => {
    followUser(props.userData.id, user.username, props.userData.data.username);
    setIsFollowed(true);
  }

  return (
    <div className='mainpage--recommendeduser'>
        <div className='rightside--image'>
          <img src={props.userData.data.picture} className="clickable" alt='zdjęcie profilowe' onClick={() => {props.checkProfile(`/${props.userData.data.username}`)}} />
        </div>
        <div className='rightside--names'>
            <Link to={`/${props.userData.data.username}`}>{props.userData.data.username}</Link>
            <span className='gray'>Użytkownik Instagrama</span>
        </div>
        <div className='rightside--button'>
          {isFollowed ? (
            <button className='gray unclickable'>Obserwujesz</button>
          ) : (
            <button onClick={checkIfFollowed}>Obserwuj</button>
          )}
        </div>
    </div>
  )
}
