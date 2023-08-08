import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function FollowingUsers(props) {
    const navigate = useNavigate();

    const showFollowers = props.followingList.map((follower, i) => {
      return (
        <div key={i} className='followedusers--tile'>
          <img src={follower.data.picture} alt='zdjęcie profilowe' />
          <p onClick={() => {checkProfile(follower.data.username)}} className='clickable'>{follower.data.username}</p>
        </div>
      )
    });

    const checkProfile = (user) => {
      props.handleFollowingTrigger();
      navigate(`/${user}`, { replace: true });
    }

  return (
    <div className='followedusers--container'>
        <div className='followedusers--frame'>
          <button className='followedusers--close' onClick={props.handleFollowingTrigger}>
            <span className='sr-only'>Zamknij okno</span>
            <span aria-hidden='true'>X</span>
          </button>
          <div className='followedusers--title'>
            <p>Obserwujący:</p>
          </div>
          <hr/>
          <div className='followedusers--list'>
            {showFollowers}
          </div>
        </div>
    </div>
  )
}
