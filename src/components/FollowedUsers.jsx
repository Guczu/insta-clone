import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FollowedUsers(props) {
    const navigate = useNavigate();
    
    const showFollowers = props.followedList.map((follower, i) => {
      return (
        <div key={i} className='followedusers--tile'>
          <img src={follower.data.picture} alt='zdjęcie profilowe' />
          <p onClick={() => {checkProfile(follower.data.username)}} className='clickable'>{follower.data.username}</p>
        </div>
      )
    });

    function checkProfile(user) {
      props.handleFollowedTrigger();
      navigate(`/${user}`, { replace: true });
    }

  return (
    <div className='followedusers--container'>
        <div className='followedusers--frame'>
          <button className='followedusers--close' onClick={props.handleFollowedTrigger}>
            <span className='sr-only'>Zamknij okno</span>
            <span aria-hidden='true'>X</span>
          </button>
          <div className='followedusers--title'>
            <p>Obserwowani:</p>
          </div>
          <hr/>
          <div className='followedusers--list'>
            {showFollowers}
          </div>
        </div>
    </div>
  )
}
