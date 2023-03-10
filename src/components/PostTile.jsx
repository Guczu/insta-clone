import React from 'react'
import { useState } from 'react';
import PostPreview from './PostPreview';

export default function PostTile(props) {
  const [trigger, setTrigger] = useState(false);

  const handleTrigger = () => {
    if(!trigger) {
      document.querySelector('html').style.overflowY = 'hidden';
    }
    else {
      document.querySelector('html').style.overflowY = 'scroll';
    }
    setTrigger(state => !state);
  }

  return (
    <>
    {trigger && <PostPreview handleTrigger={handleTrigger} post={props.post} />}
    <div onClick={handleTrigger} className='posttile--container'>
        <div className='posttile--hovered'>
          <div className='posttile--likes'>
            <i className="fa-solid fa-heart fa-xl"></i>
            <p className='bold'>{props.post.data.likes}</p>
          </div>
          <div className='posttile--likes'>
            <i className="fa-solid fa-comment fa-xl"></i>
            <p className='bold'>{props.post.data.comments}</p>
          </div>
        </div>
        <img src={props.post.data.imgurl}></img>
    </div>
    </>
  )
}
