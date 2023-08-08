import React, { useEffect, useState } from 'react'
import InboxUser from './InboxUser'
import Navbar from './Navbar'
import fetchInboxChats from '../methods/fetchInboxChats'
import InboxChat from './InboxChat';
import LoadingScreen from '../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';

export default function Inbox() {
    const [inboxChats, setInboxChats] = useState(null);
    const [actualChat, setActualChat] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getChats = async () => {
            const inboxChats = await fetchInboxChats();
            setInboxChats(inboxChats);
            setIsLoading(false);
        }
        getChats();
    }, [])

    const handleInboxChat = (id) => {
        setActualChat(id);
        navigate(`/inbox/c/${id}`);
    }

    const showInboxChats = inboxChats?.sort((a,b) => b.data.timeStamp - a.data.timeStamp).map((chat, i) => {
        return (
            <div key={i}>
              <InboxUser id={chat.id} handleInboxChat={handleInboxChat}/>
            </div>
        )
    })

  return (
    <>
    {isLoading ? (
        <LoadingScreen />
    ) : (
        <div className='mainpage--container'>
        <Navbar />
        <div className='mainpage--content'>
            <div className='mainpage--wrapper'>
                <div className='mainpage--left'></div>
                <div className='inbox--container'>
                    <div className='inbox--leftwrapper'>
                        <p className='inbox--title'>Wiadomości</p>
                        {showInboxChats}
                    </div>
                    <div className='inbox--rightwrapper'>
                        {actualChat && <InboxChat />}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )}
    </>
  )
}
