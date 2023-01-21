import React, { useEffect, useState } from 'react'
import fetchOneUserById from '../methods/fetchOneUserById';
import LoadingScreen from './LoadingScreen';
import avatar from '../images/storyimg.jpg'

export default function InboxUser(props) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getUser = async () => {
            const user = await fetchOneUserById(props.id);
            setUser(user);
            setIsLoading(false);
        }
        getUser();
    }, [])

  return (
    isLoading ? (
        <LoadingScreen />
    ) : (
        <div>
            <div className='inboxuser--container' onClick={() => props.handleInboxChat(props.id)}>
                <img src={user !== null ? user.picture : avatar}></img>
                <p>{user !== null && user.username}</p>
            </div>
        </div>
    )
  )
}
