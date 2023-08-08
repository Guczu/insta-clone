import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchOneUserById from '../methods/fetchOneUserById';
import {default_avatar_url} from '../constants';

export default function InboxMessage(props) {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

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
            <img src={user ? user.picture : default_avatar_url} alt='zdjęcie profilowe' />
            <p className='inboxmessage--text'>{props.message.data.content}</p>
        </div>
    </div>
  )
}
