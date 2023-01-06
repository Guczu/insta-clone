import React, { useEffect } from 'react'
import { useState } from 'react';
import logo from '../images/storyimg.jpg'
import getDate from '../methods/getDate';

export default function PostPreview(props) {
    const [postDate, setPostDate] = useState(null);

    useEffect(() => {
        const timestamp = props.postData.timeStamp.toDate().toISOString();
        setPostDate(getDate(timestamp))
    }, [])

  return (
    <div className='postpreview--container'>
        <button className='addpost--button' onClick={props.handleTrigger}>X</button>
        <div className='postpreview--frame'>
            <div className='postpreview--image'>
                <img src={props.postData.imgurl}></img>
            </div>
            <div className='postpreview--rightside'>
                <div className='postpreview--author'>
                    <img src={logo}></img>
                    <span className='bold clickable'>{props.postData.author}</span>
                </div>
                <hr></hr>
                <div className='postpreview--description'>
                    <img src={logo}></img>
                    <span className='bold clickable'>{props.postData.author}</span>
                    <span>{props.postData.description}</span>
                </div>
                <div className='postpreview--comments'>
                    <span>Comments section</span>
                </div>
                <hr></hr>
                <div className='postpreview--stats'>
                    <div className='postpreview--options'>
                        <i className="fa-regular fa-heart fa-xl"></i>
                        <i className="fa-regular fa-comment fa-xl"></i>
                        <i className="fa-regular fa-paper-plane fa-xl"></i>
                        <div className="postpreview--bookmark">
                            <i className="fa-regular fa-bookmark fa-xl"></i>
                        </div>
                    </div>
                    <div className='postpreview--likes'>
                        <p>Liczba polubień: {props.postData.likes}</p>
                    </div>
                    <div className='postpreview--date'>
                        <span>{postDate}</span>
                    </div>
                    <hr></hr>
                    <div className='postpreview--addcomment'>
                        <i className="fa-regular fa-face-smile fa-2x"></i>
                        <input type="text" placeholder='Dodaj komentarz...'></input>
                        <button className='bold'>Opublikuj</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
