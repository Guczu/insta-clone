import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { db, getDownloadURL, ref, storage, uploadBytes } from '../firebase';

export default function EditProfile(props) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState(null);
  const user = useSelector(state => state.user);
  const [showButton, setShowButton] = useState(true);

  const handleImageChange = (e) => {
    setShowButton(false);
    if(e.target.files[0]) {
        setImage(e.target.files[0]);
    }

    const imageRef = ref(storage, `/profile-pictures/${user.username}`);
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
    window.location.reload();
  };

  return (
    <div className='editprofile--container'>
        <div className='editprofile--form'>
            <button className='editprofile--close' onClick={props.handleEditTrigger}>X</button>
            <div className='editpost--title'>
                <p>Edytuj profil</p>
                <hr></hr>
            </div>
            <div className='editpost--upload'>
                <p className='bold'>Zmień zdjęcie profilowe</p>
                <input type="file" id="files" className='hidden' onChange={handleImageChange}></input>
                {image !== null ? "Przesłano" : <label htmlFor="files" className='editpost--label'>+</label>}
            </div>
            <div className='addpost-description'>
                <p className='bold'>Biografia</p>
                <textarea onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            {showButton ? <button className='editprofile--button' onClick={handleSubmit}>Zapisz</button>: <p>Ładowanie...</p>}
        </div>
    </div>
  )
}
