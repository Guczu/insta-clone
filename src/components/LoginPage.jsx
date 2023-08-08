import React from 'react'
import instagrambanner from '../images/2.png';
import logo from '../images/logo.png';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        .then((userCredential) => {
          const id = userCredential.user.uid;
          localStorage.setItem('uid', id);

          const getUserData = async () => {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            
            if(docSnap.exists()) {
              const user = docSnap.data();
              dispatch(setUser({
                uid: id,
                name: user.name,
                username: user.username,
                email: user.email,
                posts: user.posts,
                picture: user.picture,
                bio: user.bio,
                }));
            } else {
              console.log("No such document!");
            }
          }
          getUserData();
          navigate('/');
        });
      }
      catch(err) {
        setErrorMessage("Podano błędny email lub hasło");
      }
    };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      login(event);
    }
  };

  return (
    <div className='loginpage--container'>
      <div className='loginpage--content'>
        <div className='loginpage--image'>
          <img src={instagrambanner} alt='instagram banner' />
        </div>
        <div className='loginpage--login'>
          <div className='loginpage--form'>
            <img src={logo} alt='instagram logo' />
            <label htmlFor='email'>
              <span className='sr-only'>Wpisz email</span>
            </label>
            <input type='text' id='email' onKeyDown={handleKeyPress} placeholder='Adres email' onChange={e => setEmail(e.target.value)} />
            <label htmlFor='password'>
              <span className='sr-only'>Wpisz hasło</span>
            </label>
            <input type='password' id='password' onKeyDown={handleKeyPress} placeholder='Hasło' onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Zaloguj się</button>
            <p>{errorMessage}</p>
            <hr/>
            <a href='#'>Zaloguj się przez Facebooka</a>
            <a href='#'>Nie pamiętasz hasła?</a>

            <span>
              Nie masz konta?
              <Link to='/register' className='link'>Zarejestuj się</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
