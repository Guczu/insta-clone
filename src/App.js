import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import RegisterPage from './components/RegisterPage';
import { db } from './firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useDispatch } from 'react-redux';
import { setUser } from './reducers/userSlice';
import { useEffect, useState } from 'react';
import Inbox from './components/Inbox';
import { setTheme } from './reducers/themeSlice';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const darkmode = localStorage.getItem('darkmode');

  useEffect(() => {
    if(darkmode === "light") {
      document.querySelector('html').style.backgroundColor = '#fafafa';
      dispatch(setTheme("light"))
    }
    else if(darkmode === "dark") {
      document.querySelector('html').style.backgroundColor = '#0f0f0f';
      dispatch(setTheme("dark"))
    }
    const getUserData = async () => {
      const uid = localStorage.getItem('uid');
      if(uid !== null){
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();

        const followRef = collection(db, "followers");
        const followQuery = query(followRef, where("user_following", "==", user.username));
        const followQuerySnapshot = await getDocs(followQuery);
        const followedList = [];
    
        followQuerySnapshot.forEach(async (doc) => {
          followedList.push({...doc.data(), timeStamp: doc.data().timeStamp.seconds});
        })
        
        if (docSnap.exists()) {
          dispatch(setUser(
            {
            uid: uid,
            name: user.name,
            username: user.username,
            email: user.email,
            posts: user.posts,
            followed: user.followed,
            following: user.following,
            followers: followedList,
            picture: user.picture
            }
          ));
        } else {
          console.log("No such document!");
        }
        }
    }
    getUserData();
  }, [darkmode]);

  return (
    <div className="app-container">
        <Routes>
              <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<LoginPage />} />
              <Route exact path="/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/inbox" element={<PrivateRoute><Inbox /></PrivateRoute>} />
              <Route path="/inbox/c/:userId" element={<PrivateRoute><Inbox /></PrivateRoute>} />
        </Routes>
    </div>
  );
}
export default App;
