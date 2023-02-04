import React, { useEffect, useState } from 'react'
import image from '../images/storyimg.jpg'
import fetchOneUserById from '../methods/fetchOneUserById'
import getDate from '../methods/getDate'

export default function Comment(props) {
    const [commentAuthor, setCommentAuthor] = useState(null);
    const [commentDate, setCommentDate] = useState("");
    
    useEffect(() => {
        const timestamp = props.comment.data.timeStamp.toDate().toISOString();
        setCommentDate(getDate(timestamp))

        const getAuthor = async () => {
            const user = await fetchOneUserById(props.comment.data.id);
            setCommentAuthor(user);
        }
        getAuthor();
    },[props])

  return (
    <div className='comments--container'>
        <div className='comments--image'>
            <img src={commentAuthor !== null ? commentAuthor.picture : image} className="clickable" onClick={() => props.changeRoute(`/${props.comment.data.username}`)}></img>
        </div>
        <div className='comments--frame'>
            <div className='comments--content'>
                <span className='clickable' onClick={() => props.changeRoute(`/${props.comment.data.username}`)}>{props.comment.data.username}</span>
                <span>{props.comment.data.content}</span>
            </div>
            <div className='comments--date'>
                <span>{commentDate}</span>
            </div>
        </div>
    </div>
  )
}
