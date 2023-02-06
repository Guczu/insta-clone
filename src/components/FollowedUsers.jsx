import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className='followedusers--container' onClick={props.handleFollowedTrigger}>
        <div className='followedusers--frame' onClick={(e) => { e.stopPropagation(); return false; }}>
          <button className='followedusers--close' onClick={props.handleFollowedTrigger}>X</button>
            <div className='followedusers--title'>
              <p>Obserwowani:</p>
            </div>
            <hr></hr>
            <div className='followedusers--list'>
              {showFollowers}
            </div>
        </div>
    </div>
  )
}
