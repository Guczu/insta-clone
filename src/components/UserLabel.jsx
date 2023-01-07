import { nanoid } from '@reduxjs/toolkit';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../firebase';

export default function UserLabel(props) {

    const addRecentSearches = async () => {
        const uid = localStorage.getItem('uid');
        await setDoc(doc(db, "search-history", nanoid()), {
            logged_id: uid,
            found_id: props.userData.id,
            username: props.userData.data.username,
            timeStamp: serverTimestamp()
        });
        props.checkProfile(`/${props.userData.data.username}`);
        window.location.reload();
    }

  return (
    <div className='userlabel--container' onClick={addRecentSearches}>
        <div className='userlabel--user'>
            <div className='userlabel--image'>
            <img src={props.userData.data.picture} className="clickable" onClick={() => {props.checkProfile(`/${props.userData.data.username}`)}}></img>
            </div>
            <div className='userlabel--names'>
                <div className='userlabel--username'>
                    <p className='bold' onClick={() => {props.checkProfile(`/${props.userData.data.username}`)}}>{props.userData.data.username}</p>
                </div>
                <div className='userlabel--fullname'>
                    <p>{props.userData.data.name}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
