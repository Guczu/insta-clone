import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import storyimg from '../images/storyimg.jpg'
import getDate from '../methods/getDate';

export default function PostTemplate(props) {
    const [postDate, setPostDate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timestamp = props.post.timeStamp.toDate().toISOString();
        setPostDate(getDate(timestamp))
    }, [])

    const checkProfile = (user) => {
      navigate(`/${user}`, { replace: true });
      window.location.reload();
    }
    
  return (
    <div className='mainpage--post'>
                <div className='mainpage--author'>
                    <img src={storyimg}></img>
                    <p onClick={() => {checkProfile(props.post.author)}}>{props.post.author}</p>
                    <i className="fa-solid fa-ellipsis fa-xl"></i>
                </div>

                <div className='mainpage--image'>
                    <img src={props.post.imgurl}></img>
                </div>

                <div className='mainpage--options'>
                  <i className="fa-regular fa-heart fa-xl"></i>
                  <i className="fa-regular fa-comment fa-xl"></i>
                  <i className="fa-regular fa-paper-plane fa-xl"></i>
                  <div className="mainpage--bookmark">
                    <i className="fa-regular fa-bookmark fa-xl"></i>
                  </div>
                </div>

                <div className='mainpage--likes'>
                  <p>Liczba polubień: {props.post.likes}</p>
                </div>

                <div className='mainpage--comments'>
                  <p className='bold'>username</p>
                  <p>Random comment</p>
                  <span>więcej</span>
                </div>

                <div className='mainpage--morecomments'>
                  <span>Zobacz wszystkie komentarze: {props.post.comments}</span>
                </div>

                <div className='mainpage--date'>
                  <span>{postDate}</span>
                </div>
                <hr></hr>
                <div className='mainpage--addcomment'>
                  <i className="fa-regular fa-face-smile fa-2x"></i>
                  <input type="text" placeholder='Dodaj komentarz...'></input>
                  <button>Opublikuj</button>
                </div>
            </div>
  )
}
