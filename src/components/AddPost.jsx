import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { storage, ref, uploadBytes, getDownloadURL, db } from '../firebase';
import { nanoid } from '@reduxjs/toolkit';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

export default function AddPost(props) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [description, setDescription] = useState("");
    const user = useSelector(state => state.user);
    const [postId, setPostId] = useState(nanoid());
    
    const handleImageChange = (e) => {
        const imageRef = ref(storage, `/posts/${postId}`);
        
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }

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
            author_id: user.uid,
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

        await updateDoc(doc(db, "users", user.uid), {posts: user.posts+1})
        window.location.reload();
    };

  return (
    <div className='addpost--container' onClick={props.handleAddPost}>
        <div className='addpost--form' onClick={(e) => { e.stopPropagation(); return false; }}>
            <button className='addpost--button' onClick={props.handleAddPost}>X</button>
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
                {image !== null && <button onClick={handleSubmit}>Dodaj post</button>}
            </div>
        </div>
    </div>
  )
}
