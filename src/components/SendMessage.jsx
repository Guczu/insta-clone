import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import sendMessage from '../methods/sendMessage';
import fetchOneUser from '../methods/fetchOneUser';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function SendMessage(props) {
const {id} = useParams();
const navigate = useNavigate();
const [message, setMessage] = useState("");
const [userData, setUserData] = useState(null);
const user = useSelector(state => state.user);

useEffect(() => {
    const getUserData = async () => {
        if(id !== null){
          const user = await fetchOneUser(id);
          setUserData(user);
        }
    }
    getUserData();
}, [])

const send = async () => {
    await sendMessage(userData.id, message);
    navigate(`/inbox/c/${userData.id}`);
}

  return (
    <div className='editprofile--container'>
        <div className='editprofile--form'>
            <button className='editprofile--close' onClick={props.handleMessageTrigger}>X</button>
            <div className='editprofile--title'>
                <p>Wyślij wiadomość</p>
                <hr></hr>
            </div>
            <div className='editprofile--description'>
                <textarea onChange={e => setMessage(e.target.value)}></textarea>
            </div>
            <button className='editprofile--button' onClick={send}>Wyślij</button>
        </div>
    </div>
  )
}
