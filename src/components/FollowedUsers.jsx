import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchProfilePicture from '../methods/fetchProfilePicture';

export default function FollowedUsers(props) {
  const navigate = useNavigate();
  
  const showFollowers = props.followedList.map((follower, i) => {

    return (
      <div key={i} className='followedusers--tile'>
        <img src={follower.data.picture}></img>
        <p onClick={() => {checkProfile(follower.data.username)}} className='clickable'>{follower.data.username}</p>
      </div>
    )
  });

  function checkProfile(user) {
    navigate(`/${user}`, { replace: true });
    window.location.reload();
  }

  return (
    <div className='followedusers--container'>
        <div className='followedusers--frame'>
          <button className='followedusers--close' onClick={props.handleFollowedTrigger}>X</button>
            <div className='followedusers--title'>
              <p>Obserwowani:</p>
            </div>

            <hr></hr>

            {showFollowers}

        </div>
    </div>
  )
}
