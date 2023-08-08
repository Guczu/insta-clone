import React, { useEffect, useState } from 'react'
import fetchOneUserById from '../methods/fetchOneUserById';
import {default_avatar_url} from '../constants';

export default function InboxUser(props) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const getUser = async () => {
            const user = await fetchOneUserById(props.id);
            setUser(user);
        }
        getUser();
    }, [])

  return (
        <div className='inboxuser--container'>
            <button onClick={() => props.handleInboxChat(props.id)}>
                <img src={user ? user.picture : default_avatar_url} alt='zdjęcie profilowe' />
                <p>{user && user.username}</p>
            </button>
        </div>
  )
}
