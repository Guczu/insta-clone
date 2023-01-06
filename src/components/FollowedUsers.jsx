import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchProfilePicture from '../methods/fetchProfilePicture';

export default function FollowedUsers(props) {
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  const showFollowers = props.followedList.map((follower, i) => {

    const getPicture = async () => {
      const pic = await fetchProfilePicture(follower.user_followed);
      setPicture(pic);
    }
    getPicture();

    return (
      <div key={i} className='followedusers--tile'>
        <img src={picture}></img>
        <p onClick={() => {checkProfile(follower.user_followed)}} className='clickable'>{follower.user_followed}</p>
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
