import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchInboxMessages from '../methods/fetchInboxMessages';
import fetchOneUserById from '../methods/fetchOneUserById';
import avatar from '../images/storyimg.jpg'
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import InboxMessage from './InboxMessage';
import sendMessage from '../methods/sendMessage';

export default function InboxChat() {
    const { userId } = useParams();
    const uid = localStorage.getItem('uid');
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState(null);
    const [showMessages, setShowMessages] = useState(null);
    const [content, setContent] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const messagesRef = collection(db, "users", uid, "inbox", userId, "messages");
        const unsubscribe = onSnapshot(messagesRef,(refSnapshot) => {

            const messageArray = [];
            refSnapshot.forEach((doc) => {
                messageArray.push({id: doc.id, data: doc.data()});
            });
            setMessages(messageArray);

            setShowMessages(messageArray?.sort((a,b) => a.data.timeStamp - b.data.timeStamp).map((message, i) => {
                return(
                    <div key={i}>
                        <InboxMessage message={message} />
                    </div>
                )
            }))
        });

    return () => unsubscribe();
    }, [])

    useEffect(() => {
        const getUser = async () => {
            const user = await fetchOneUserById(userId);
            setUser(user);
        }
        getUser();

        const getMessages = async () => {
            const messages = await fetchInboxMessages(userId);
            setMessages(messages);

            setShowMessages(messages?.sort((a,b) => a.data.timeStamp - b.data.timeStamp).map((message, i) => {
                return (
                    <div key={i}>
                        <InboxMessage message={message} />
                    </div>
                )
            }))
        }
        getMessages();
    }, [])

    useEffect(() => {
        requestAnimationFrame(() => {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
          });
    }, [showMessages])

    const sendMess = async () => {
        await sendMessage(userId, content);
    }

    return (
        <div className='inboxchat--container'>
                <div className='inboxchat--toplabel'>
                    <img src={user !== null ? user.picture : avatar}></img>
                    <p>{user !== null && user.username}</p>
                </div>
                <div className='inboxchat--messages'>
                    {showMessages !== null && showMessages}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className='inboxchat--send'>
                    <input type="text" onChange={(e) => setContent(e.target.value)}></input>
                    <button onClick={sendMess}>Send Message</button>
                </div>
        </div>
    )
}
