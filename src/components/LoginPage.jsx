import React from 'react'
import img from '../images/2.png';
import logo from '../images/logo.png';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setTheme } from '../reducers/themeSlice';

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
                dispatch(setTheme(user.theme))
                localStorage.setItem('darkmode', user.theme);

                if(user.theme === "light") {
                  document.querySelector('html').style.backgroundColor = '#fafafa';
                  dispatch(setTheme("light"))
                }
                else if(user.theme === "dark") {
                  document.querySelector('html').style.backgroundColor = '#0f0f0f';
                  dispatch(setTheme("dark"))
                }
                
            } else {
              console.log("No such document!");
            }
          }
          getUserData();
          navigate('/');
        });
      }
      catch(err) {
        //console.log(err);
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
          <img src={img}></img>
        </div>
        <div className='loginpage--login'>
          <div className='loginpage--form'>
            <img src={logo}></img>
            <input type="text" onKeyDown={handleKeyPress} placeholder='Adres email' onChange={e => setEmail(e.target.value)}></input>
            <input type="password" onKeyDown={handleKeyPress} placeholder='Hasło' onChange={e => setPassword(e.target.value)}></input>
            <button onClick={login}>Zaloguj się</button>
            <p>{errorMessage}</p>
            <hr></hr>
            <a href="#">Zaloguj się przez Facebooka</a>
            <a href="#">Nie pamiętasz hasła?</a>

            <span>
              Nie masz konta?
              <Link to="/register" className='link'>Zarejestuj się</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
