import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import fetchOneUserById from '../methods/fetchOneUserById';
import InboxMessage from './InboxMessage';
import sendMessage from '../methods/sendMessage';

export default function InboxChat() {
    const { userId } = useParams();
    const location = useLocation();
    const uid = localStorage.getItem('uid');
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const messagesEndRef = useRef(null);
    const avatar = "https://firebasestorage.googleapis.com/v0/b/instaclone-cb003.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=37a6fba9-330d-43f7-852a-e3ac79b41556";

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
        const chat = document.querySelector('.inboxchat--messages');
        chat.scrollTop = chat.scrollHeight;
        requestAnimationFrame(() => {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        });
    }, [messages])

    const sendMess = async () => {
        document.querySelector('.inputContent').value = "";
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
                    <img src={user !== null ? user.picture : avatar}></img>
                    <p>{user !== null && user.username}</p>
                </div>
                <div className='inboxchat--messages'>
                    {showMessages}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className='inboxchat--send'>
                    <input type="text" className="inputContent" onKeyDown={handleKeyPress} onChange={(e) => setContent(e.target.value)}></input>
                    <button onClick={sendMess}>Send Message</button>
                </div>
        </div>
    )
}
