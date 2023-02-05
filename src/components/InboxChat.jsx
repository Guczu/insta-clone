import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchInboxMessages from '../methods/fetchInboxMessages';
import fetchOneUserById from '../methods/fetchOneUserById';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import InboxMessage from './InboxMessage';
import sendMessage from '../methods/sendMessage';

export default function InboxChat() {
    const { userId } = useParams();
    const location = useLocation();
    const uid = localStorage.getItem('uid');
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState(null);
    const [showMessages, setShowMessages] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const avatar = "https://firebasestorage.googleapis.com/v0/b/instaclone-cb003.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=37a6fba9-330d-43f7-852a-e3ac79b41556";

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
    }, [location])

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
            setLoading(false);
        }
        getMessages();
    }, [location])

    useEffect(() => {
        requestAnimationFrame(() => {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
          });
    }, [showMessages])

    const sendMess = async () => {
        document.querySelector('.inputContent').value = "";
        await sendMessage(userId, content);
    }

    return (
        <div className='inboxchat--container'>
                <div className='inboxchat--toplabel'>
                    <img src={user !== null ? user.picture : avatar}></img>
                    <p>{user !== null && user.username}</p>
                </div>
                <div className='inboxchat--messages'>
                    {loading ? (
                        <p>Ładowanie...</p>
                    ):(
                        showMessages !== null && showMessages
                    )}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className='inboxchat--send'>
                    <input type="text" className="inputContent" onChange={(e) => setContent(e.target.value)}></input>
                    <button onClick={sendMess}>Send Message</button>
                </div>
        </div>
    )
}
