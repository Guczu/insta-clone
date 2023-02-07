import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fetchOneUserById from '../methods/fetchOneUserById'
import getDate from '../methods/getDate'

export default function Comment(props) {
    const [commentAuthor, setCommentAuthor] = useState(null);
    const [commentDate, setCommentDate] = useState("");
    const navigate = useNavigate();
    const avatar = "https://firebasestorage.googleapis.com/v0/b/instaclone-cb003.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=37a6fba9-330d-43f7-852a-e3ac79b41556";
    
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
        window.location.reload();
    }

  return (
    <div className='comments--container'>
        <div className='comments--image'>
            <img src={commentAuthor !== null ? commentAuthor.picture : avatar} className="clickable" onClick={() => handleRoute(`/${props.comment.data.username}`)}></img>
        </div>
        <div className='comments--frame'>
            <div className='comments--content'>
                <span className='clickable' onClick={() => handleRoute(`/${props.comment.data.username}`)}>{props.comment.data.username}</span>
                <span>{props.comment.data.content}</span>
            </div>
            <div className='comments--date'>
                <span>{commentDate}</span>
            </div>
        </div>
    </div>
  )
}
