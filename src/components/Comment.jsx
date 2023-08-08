import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetchOneUserById from '../methods/fetchOneUserById';
import getDate from '../methods/getDate';
import {default_avatar_url} from '../constants';

export default function Comment(props) {
    const [commentAuthor, setCommentAuthor] = useState(null);
    const [commentDate, setCommentDate] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(props.comment.data.timeStamp) {
            const timestamp = props.comment.data.timeStamp.toDate().toISOString();
            setCommentDate(getDate(timestamp))
        }

        const getAuthor = async () => {
            const user = await fetchOneUserById(props.comment.data.id);
            setCommentAuthor(user);
        }
        getAuthor();
    },[props])

    const handleRoute = (route) => {
        navigate(route);
    }

  return (
    <div className='comments--container'>
        <div className='comments--image'>
            <img src={commentAuthor ? commentAuthor.picture : default_avatar_url} className="clickable" alt='zdjęcie profilowe' onClick={() => handleRoute(`/${props.comment.data.username}`)} />
        </div>
        <div className='comments--frame'>
            <div className='comments--content'>
                <Link to={`/${props.comment.data.username}`}>{props.comment.data.username}</Link>
                <span>{props.comment.data.content}</span>
            </div>
            <div className='comments--date'>
                <span>{commentDate}</span>
            </div>
        </div>
    </div>
  )
}
