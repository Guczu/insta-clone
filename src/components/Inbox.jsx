import React, { useEffect, useState } from 'react'
import InboxUser from './InboxUser'
import Navbar from './Navbar'
import fetchInboxChats from '../methods/fetchInboxChats'
import InboxChat from './InboxChat';
import useChangeRoute from '../methods/useChangeRoute';
import { useSelector } from 'react-redux';

export default function Inbox() {
    const [inboxChats, setInboxChats] = useState(null);
    const [showInboxChats, setShowInboxChats] = useState(null);
    const [actualChat, setActualChat] = useState(null);
    const darkmode = useSelector(state => state.theme.theme);
    const changeRoute = useChangeRoute();

    useEffect(() => {
        const getChats = async () => {
            const inboxChats = await fetchInboxChats();
            setInboxChats(inboxChats);
            setShowInboxChats(inboxChats?.sort((a,b) => b.data.timeStamp - a.data.timeStamp).map((chat, i) => {
                return (
                    <div key={i}>
                      <InboxUser id={chat.id} handleInboxChat={handleInboxChat}/>
                    </div>
                  )
            }))
        }
        getChats();
    }, [])

    const handleInboxChat = (id) => {
        setActualChat(id);
        changeRoute(`/inbox/c/${id}`);
    }

  return (
    <div className={`mainpage--container ${darkmode}`}>
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
                        {actualChat === null ? (
                            <p></p>
                        ) : (
                            <InboxChat />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
