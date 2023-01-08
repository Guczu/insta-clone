import React, { useEffect } from 'react'
import { useState } from 'react';
import logo from '../images/storyimg.jpg'
import getDate from '../methods/getDate';
import getPostLikes from '../methods/getPostLikes';
import addLikeToPost from '../methods/addLikeToPost';
import removeLikeFromPost from '../methods/removeLikeFromPost';

export default function PostPreview(props) {
    const [postDate, setPostDate] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likesAmount, setLikesAmount] = useState(props.post.data.likes);
    const uid = localStorage.getItem('uid');

    useEffect(() => {
        const timestamp = props.post.data.timeStamp.toDate().toISOString();
        setPostDate(getDate(timestamp))

        const checkIfLiked = async () => {
            const user_id = localStorage.getItem('uid');
            const post_data = props.post;
            const isLiked = await getPostLikes(user_id, post_data);
            if(isLiked) {
              setLiked(true);
            }
          }
          checkIfLiked(props.post);
    }, [])

    const handleLike = async () => {
        const logged_user = uid;
        const post_data = props.post;
  
        if(!liked) {
          addLikeToPost(logged_user, post_data);
          setLiked(state => !state);
          setLikesAmount(state => state + 1);
        }
        else {
          removeLikeFromPost(logged_user, post_data);
          setLiked(state => !state);
          setLikesAmount(state => state - 1);
        }
      }

  return (
    <div className='postpreview--container'>
        <button className='addpost--button' onClick={props.handleTrigger}>X</button>
        <div className='postpreview--frame'>
            <div className='postpreview--image'>
                <img src={props.post.data.imgurl}></img>
            </div>
            <div className='postpreview--rightside'>
                <div className='postpreview--author'>
                    <img src={logo}></img>
                    <span className='bold clickable'>{props.post.data.author}</span>
                </div>
                <hr></hr>
                <div className='postpreview--description'>
                    <img src={logo}></img>
                    <span className='bold clickable'>{props.post.data.author}</span>
                    <span>{props.post.data.description}</span>
                </div>
                <div className='postpreview--comments'>
                    <span>Comments section</span>
                </div>
                <hr></hr>
                <div className='postpreview--stats'>
                    <div className='postpreview--options'>
                        <i className={!liked ? "fa-regular fa-heart fa-xl" : "fa-solid fa-heart fa-xl red--heart"} onClick={handleLike}></i>
                        <i className="fa-regular fa-comment fa-xl"></i>
                        <i className="fa-regular fa-paper-plane fa-xl"></i>
                        <div className="postpreview--bookmark">
                            <i className="fa-regular fa-bookmark fa-xl"></i>
                        </div>
                    </div>
                    <div className='postpreview--likes'>
                        <p>Liczba polubień: {likesAmount}</p>
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
