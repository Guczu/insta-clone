import { nanoid } from '@reduxjs/toolkit';
import { collection, doc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import fetchOneUserById from '../methods/fetchOneUserById';

export default function UserLabel(props) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid');

    useEffect(() => {
        const getUserData = async () => {
            const user = await fetchOneUserById(props.userData.id);
            setUser(user);
        }
        getUserData();
    },[props])

    const addRecentSearches = async () => {
        const checkIfRecent = () => {
            let res = false;
            props.recentUsers.forEach((user) => {
                if(user.id === props.userData.id) {
                    res = true;
                }
            })
            return res;
        }
        const isRecent = checkIfRecent();

        if(!isRecent) {
            await setDoc(doc(db, "search-history", nanoid()), {
                logged_id: uid,
                found_id: props.userData.id,
                username: user.username,
                timeStamp: serverTimestamp()
            });
        }
        else {
            const searchRef = collection(db, "search-history");
            const docSnap = await getDocs(searchRef);
            let doc_id;

            docSnap.forEach((doc) => {
                if(doc.data().found_id === props.userData.id) {
                    doc_id = doc.id;
                }
            })
            await updateDoc(doc(db, "search-history", doc_id), {
                timeStamp: serverTimestamp()
            });
        }

        navigate(`/${user.username}`);
    }

  return (
    <button className='userlabel--container' onClick={addRecentSearches}>
        {user && (
            <div className='userlabel--user'>
                <div className='userlabel--image'>
                <img src={user.picture} alt='zdjęcie profilowe' />
                </div>
                <div className='userlabel--names'>
                    <div className='userlabel--username'>
                        <p className='bold'>{user.username}</p>
                    </div>
                    <div className='userlabel--fullname'>
                        <p>{user.name}</p>
                    </div>
                </div>
            </div>
        )}
    </button>
  )
}
