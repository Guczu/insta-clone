import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { storage, ref, uploadBytes, getDownloadURL, db } from '../firebase';
import { nanoid } from '@reduxjs/toolkit';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function AddPost(props) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [description, setDescription] = useState("");
    const user = useSelector(state => state.user);
    const [postId, setPostId] = useState(nanoid());
    const navigate = useNavigate();
    
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
        navigate(0);
    };

  return (
    <div className='addpost--container'>
        <div className='addpost--form'>
            <button className='addpost--button' onClick={props.handleAddPost}>
                <span className='sr-only'>Zamknij okno</span>
                <span aria-hidden='true'>X</span>
            </button>
            <div className='addpost--title'>
                <p>Utwórz nowy post</p>
                <hr/>
            </div>
            <div className='addpost-description'>
                <label htmlFor='description' className='bold'>Opis</label>
                <textarea id='description' onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div className='addpost--upload'>
                <input type='file' id='files' className='hidden' onChange={handleImageChange} />
                {image ? <img src={url} alt='zdjęcie' /> : <label htmlFor='files' className='addpost--label'>+</label>}
                {image && <button onClick={handleSubmit}>Dodaj post</button>}
            </div>
        </div>
    </div>
  )
}
