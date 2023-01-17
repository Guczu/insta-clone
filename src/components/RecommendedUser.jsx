import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import useFollowUser from '../methods/useFollowUser';

export default function RecommendedUser(props) {
  const user = useSelector(state => state.user);
  const followUser = useFollowUser();
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
  },[])

  const checkIfFollowed = (loggeduser, usertofollow) => {
    followUser(loggeduser, usertofollow);
    setIsFollowed(true);
  }

  return (
    <div className='mainpage--recommendeduser'>
        <div className='rightside--image'>
          <img src={props.userData.data.picture} className="clickable" onClick={() => {props.checkProfile(`/${props.userData.data.username}`)}}></img>
        </div>
        <div className='rightside--names'>
            <p className='bold' onClick={() => {props.checkProfile(`/${props.userData.data.username}`)}}>{props.userData.data.username}</p>
            <span className='gray'>Użytkownik Instagrama</span>
        </div>
        <div className='rightside--button'>
          {isFollowed ? (
            <button className='gray unclickable'>Obserwujesz</button>
          ) : (
            <button onClick={() => {checkIfFollowed(user, props.userData)}}>Obserwuj</button>
          )}
        </div>
    </div>
  )
}
