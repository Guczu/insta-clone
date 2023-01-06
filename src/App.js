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
import Logout from './components/Logout';

function App() {
  const dispatch = useDispatch();
  //console.log(uid);

  /*async function getLoggedUser() {
    if(uid !== null){
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const user = docSnap.data();
      dispatch(setUser(
        {
        uid: uid,
        name: user.name,
        username: user.username,
        email: user.email
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
  getLoggedUser();*/


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
  }, []);
  const user = useSelector(state => state.user);
  //console.log(user);

  return (
    <div className="app-container">
        <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route exact path="/:id" element={<Profile />} />
        </Routes>
    </div>
  );
}
export default App;
