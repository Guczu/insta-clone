import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setUserData({...userData, [name]: value});
  };

  const register = async (e) => {
    e.preventDefault();
    if(userData.name === undefined || userData.name.length < 5 || userData.username === undefined || userData.username.length < 3 ) {
      setErrorMessage("Nazwa użytkownika lub imię i nazwisko jest za krótkie");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        ...userData,
        posts: 0,
        followed: 0,
        following: 0,
        picture: "https://firebasestorage.googleapis.com/v0/b/instaclone-cb003.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=37a6fba9-330d-43f7-852a-e3ac79b41556",
        bio: "Biografia",
        theme: "light",
        timeStamp: serverTimestamp()
      });
      navigate("/login");
    }
    catch(err) {
      console.log(err.code);
      switch(err.code) {
        case "auth/email-already-in-use":
          setErrorMessage("Email jest już w użyciu");
        break;
        case "auth/invalid-email":
          setErrorMessage("Email jest nieprawidłowy");
        break;
        case "auth/weak-password":
          setErrorMessage("Hasło jest za słabe");
        break;
        default:
          setErrorMessage("Błąd podczas rejestracji");
      }
    }
  };

  return (
    <div className='registerpage--container'>
      <div className='registerpage--register'>
        <div className='registerpage--form'>
          <img src={logo}></img>
          <p className='bold gray'>Zarejestruj się, aby przeglądać zdjęcia i filmy znajomych.</p>
          <hr></hr>
          <input type="text" placeholder='Adres email' name="email" onChange={handleInput}></input>
          <input type="text" placeholder='Imię i nazwisko' name="name" onChange={handleInput}></input>
          <input type="text" placeholder='Nazwa użytkownika' name="username" onChange={handleInput}></input>
          <input type="password" placeholder='Hasło' name="password" onChange={handleInput}></input>
          
          <p>{errorMessage}</p>
          
          <p className='gray'>Osoby korzystające z naszej usługi mogły przesłać Twoje informacje kontaktowe do Instagramu.</p>
          <p className='blue clickable'>Dowiedz się więcej</p>
          <p className='gray'>Rejestrując się, akceptujesz <span className='blue clickable'>Regulamin.</span> Informacje o tym, jak zbieramy, wykorzystujemy i udostępniamy Twoje dane, zawierają nasze <span className='blue clickable'>Zasady dotyczące plików cookie.</span> O wykorzystaniu plików cookie i podobnych technologii informują <span className='blue clickable'>Zasady dotyczące plików cookie.</span></p>
          <button onClick={register}>Dalej</button>

          <p className='padding gray'>
            Masz konto? 
            <span className='blue clickable'>
              <Link to="/login" className='link'>Zaloguj się</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
