import React from 'react'
import { useState } from 'react';
import PostPreview from './PostPreview';

export default function PostTile(props) {
  const [Trigger, setTrigger] = useState(false);

  const handleTrigger = () => {
    setTrigger(state => !state);
  }

  return (
    <>
    {Trigger && <PostPreview handleTrigger={handleTrigger} postData={props.posts} />}
    <div onClick={handleTrigger} className='posttile--container'>
        <div className='posttile--hovered'>
          <div className='posttile--likes'>
            <i className="fa-solid fa-heart fa-xl"></i>
            <p className='bold'>{props.posts.likes}</p>
          </div>
          <div className='posttile--likes'>
            <i className="fa-solid fa-comment fa-xl"></i>
            <p className='bold'>{props.posts.comments}</p>
          </div>
        </div>
        <img src={props.posts.imgurl}></img>
    </div>
    </>
  )
}
