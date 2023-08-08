import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { db, getDownloadURL, ref, storage, uploadBytes } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function EditProfile(props) {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState(null);
    const user = useSelector(state => state.user);
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const imageRef = ref(storage, `/profile-pictures/${user.username}`);
        
        setShowButton(false);
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
        setShowButton(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uid = localStorage.getItem('uid');

        if(url !== null) {
            await updateDoc(doc(db, "users", uid), {picture: url});
        }
        if(description !== "") {
            await updateDoc(doc(db, "users", uid), {bio: description});
        }
        navigate(0);
    };

  return (
    <div className='editprofile--container'>
        <div className='editprofile--form'>
            <button className='editprofile--close' onClick={props.handleEditTrigger}>
                <span className='sr-only'>Zamknij okno</span>
                <span aria-hidden='true'>X</span>
            </button>
            <div className='editprofile--title'>
                <p>Edytuj profil</p>
                <hr/>
            </div>
            <div className='editprofile--upload'>
                <p className='bold'>Zmień zdjęcie profilowe</p>
                <input type='file' id='files' className='hidden' onChange={handleImageChange} />
                {image ? 'Przesłano' : <label htmlFor='files' className='editprofile--label'>+</label>}
            </div>
            <div className='editprofile--description'>
                <label className='bold' htmlFor='biography'>Biografia</label>
                <textarea id='biography' onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            {showButton ? <button className='editprofile--button' onClick={handleSubmit}>Zapisz</button> : <p>Ładowanie...</p>}
        </div>
    </div>
  )
}
