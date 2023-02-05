import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchOneUserById from '../methods/fetchOneUserById';

export default function InboxMessage(props) {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const avatar = "https://firebasestorage.googleapis.com/v0/b/instaclone-cb003.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=37a6fba9-330d-43f7-852a-e3ac79b41556";

    useEffect(() => {
        const getUser = async () => {
            const user = await fetchOneUserById(props.message.data.user_id);
            setUser(user);
        }
        getUser();
    }, [props])

  return (
    <div className={props.message.data.user_id === userId ? 'inboxmessage--containerleft' : 'inboxmessage--containerright'}>
        <div className={props.message.data.user_id === userId ? 'inboxmessage--contentleft' : 'inboxmessage--contentright'}>
            <img src={user !== null ? user.picture : avatar}></img>
            <p className='inboxmessage--text'>{props.message.data.content}</p>
        </div>
    </div>
  )
}
