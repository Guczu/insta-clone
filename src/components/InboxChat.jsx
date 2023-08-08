import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import fetchOneUserById from '../methods/fetchOneUserById';
import InboxMessage from './InboxMessage';
import sendMessage from '../methods/sendMessage';
import {default_avatar_url} from '../constants';

export default function InboxChat() {
    const { userId } = useParams();
    const location = useLocation();
    const uid = localStorage.getItem('uid');
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const chatRef = useRef(null);
    const messageInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const messagesRef = collection(db, "users", uid, "inbox", userId, "messages");

        const getUser = async () => {
            const user = await fetchOneUserById(userId);
            setUser(user);
        }
        getUser();

        const unsubscribe = onSnapshot(messagesRef,(refSnapshot) => {
            const messageArray = [];
            refSnapshot.forEach((doc) => {
                messageArray.push({id: doc.id, data: doc.data()});
            });

            setMessages(messageArray.sort((a,b) => a.data.timeStamp - b.data.timeStamp));
        });
    return () => unsubscribe();
    }, [location])

    useEffect(() => {
        chatRef.scrollTop = chatRef.scrollHeight;
        requestAnimationFrame(() => {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        });
    }, [messages])

    const sendMess = async () => {
        messageInputRef.current.value = "";
        await sendMessage(userId, content);
    }

    const showMessages = messages.map((message, i) => {
        return(
            <div key={i}>
                <InboxMessage message={message} />
            </div>
        )
    })

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          sendMess();
        }
    };

    return (
        <div className='inboxchat--container'>
            <div className='inboxchat--toplabel'>
                <img src={user ? user.picture : default_avatar_url} alt='zdjęcie profilowe' />
                <p>{user && user.username}</p>
            </div>
            <div className='inboxchat--messages' ref={chatRef}>
                {showMessages}
                <div ref={messagesEndRef}></div>
            </div>
            <div className='inboxchat--send'>
                <label title='message content' htmlFor='message'></label>
                <input type='text' className='inputContent' ref={messageInputRef} id='message' onKeyDown={handleKeyPress} onChange={(e) => setContent(e.target.value)} />
                <button onClick={sendMess}>Wyślij</button>
            </div>
        </div>
    )
}
