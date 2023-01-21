import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../images/storyimg.jpg';
import fetchOneUserById from '../methods/fetchOneUserById';

export default function InboxMessage(props) {
    const { userId } = useParams();
    const message = props.message;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const user = await fetchOneUserById(message.data.user_id);
            setUser(user);
        }
        getUser();
    }, [])

  return (
    <div className={message.data.user_id === userId ? 'inboxmessage--containerleft' : 'inboxmessage--containerright'}>
        <div className={message.data.user_id === userId ? 'inboxmessage--contentleft' : 'inboxmessage--contentright'}>
            <img src={user !== null ? user.picture : avatar}></img>
            <p className='inboxmessage--text'>{props.message.data.content}</p>
        </div>
    </div>
  )
}
