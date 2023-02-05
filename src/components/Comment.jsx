import React, { useEffect, useState } from 'react'
import fetchOneUserById from '../methods/fetchOneUserById'
import getDate from '../methods/getDate'

export default function Comment(props) {
    const [commentAuthor, setCommentAuthor] = useState(null);
    const [commentDate, setCommentDate] = useState("");
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

  return (
    <div className='comments--container'>
        <div className='comments--image'>
            <img src={commentAuthor !== null ? commentAuthor.picture : avatar} className="clickable" onClick={() => props.changeRoute(`/${props.comment.data.username}`)}></img>
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
