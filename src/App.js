import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import RegisterPage from './components/RegisterPage';
import { db } from './firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userSlice';
import { useEffect } from 'react';
import Inbox from './components/Inbox';
import { setTheme } from './reducers/themeSlice';

function App() {
  const dispatch = useDispatch();
  const darkmode = localStorage.getItem('darkmode');

  useEffect(() => {

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
        else {
          console.log("its null");
        }
    }
    getUserData();

    const handleTheme = async () => {
      console.log("e")
      console.log(darkmode)
      if(darkmode === "light") {
        document.querySelector('body').style.backgroundColor = '#fafafa';
        await dispatch(setTheme("light"))
      }
      else {
        document.querySelector('body').style.backgroundColor = '#0f0f0f';
        await dispatch(setTheme("dark"))
      }
    }
    handleTheme();

  }, []);

  return (
    <div className="app-container">
        <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<LoginPage />} />
              <Route exact path="/:id" element={<Profile />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/inbox/c/:userId" element={<Inbox />} />
        </Routes>
    </div>
  );
}
export default App;
