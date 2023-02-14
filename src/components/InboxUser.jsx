import React, { useEffect, useState } from 'react'
import fetchOneUserById from '../methods/fetchOneUserById';

export default function InboxUser(props) {
    const [user, setUser] = useState(null);
    const avatar = "https://firebasestorage.googleapis.com/v0/b/instaclone-cb003.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=37a6fba9-330d-43f7-852a-e3ac79b41556";
    
    useEffect(() => {
        const getUser = async () => {
            const user = await fetchOneUserById(props.id);
            setUser(user);
        }
        getUser();
    }, [])

  return (
        <>
            <div className='inboxuser--container' onClick={() => props.handleInboxChat(props.id)}>
                <img src={user !== null ? user.picture : avatar}></img>
                <p>{user !== null && user.username}</p>
            </div>
        </>
  )
}
