import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fetchProfilePicture from '../methods/fetchProfilePicture';

export default function FollowingUsers(props) {
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();
  const showFollowers = props.followingList.map((follower, i) => {

    const getPicture = async () => {
      const pic = await fetchProfilePicture(follower.user_following);
      setPicture(pic);
    }
    getPicture();

    return (
      <div key={i} className='followedusers--tile'>
        <img src={picture}></img>
        <p onClick={() => {checkProfile(follower.user_following)}} className='clickable'>{follower.user_following}</p>
      </div>
    )
  });

  const checkProfile = (user) => {
    navigate(`/${user}`, { replace: true });
    window.location.reload();
  }

  return (
    <div className='followedusers--container'>
        <div className='followedusers--frame'>
          <button className='followedusers--close' onClick={props.handleFollowingTrigger}>X</button>
            <div className='followedusers--title'>
              <p>Obserwujący:</p>
            </div>

            <hr></hr>

            {showFollowers}

        </div>
    </div>
  )
}
