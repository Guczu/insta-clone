import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage, ref, uploadBytes, getDownloadURL, db } from '../firebase';
import { nanoid } from '@reduxjs/toolkit';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPost(props) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [description, setDescription] = useState("");
    const user = useSelector(state => state.user);
    const [postId, setPostId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setPostId(nanoid());
    }, [])
    
    const handleImageChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }

        const imageRef = ref(storage, `/posts/${postId}`);
        uploadBytes(imageRef, e.target.files[0]).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url);
            }).catch(error => {
                console.log(error.message);
            })
        }).catch(error => {
            console.log(error.message);
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await setDoc(doc(db, "posts", postId), {
            author: user.username,
            imgurl: url,
            likes: 0,
            comments: 0,
            description: description,
            timeStamp: serverTimestamp(),
          });
        }
        catch(err) {
          console.log(err);
        }

        const uid = localStorage.getItem('uid');
        await updateDoc(doc(db, "users", uid), {posts: user.posts+1})
        window.location.reload();
      };

  return (
    <div className='addpost--container'>
        <div className='addpost--form'>
            <button className='addpost--button' onClick={props.handleTrigger}>X</button>
            <div className='addpost--title'>
                <p>Utwórz nowy post</p>
                <hr></hr>
            </div>
            <div className='addpost-description'>
                <p className='bold'>Opis</p>
                <textarea onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div className='addpost--upload'>
                <input type="file" id="files" className='hidden' onChange={handleImageChange}></input>
                {image !== null ? <img src={url}></img> : <label htmlFor="files" className='addpost--label'>+</label>}
                <button onClick={handleSubmit}>Dodaj post</button>
            </div>
        </div>
    </div>
  )
}
