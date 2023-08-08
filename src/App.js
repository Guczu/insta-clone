import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import RegisterPage from './components/RegisterPage';
import { db } from './firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useDispatch } from 'react-redux';
import { setUser } from './reducers/userSlice';
import { useEffect } from 'react';
import Inbox from './components/Inbox';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const dispatch = useDispatch();

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
    }
    getUserData();
  }, []);

  return (
    <div className="app-container">
        <Routes>
              <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
              <Route path="/logout" element={<LoginPage />} />
              <Route exact path="/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/inbox" element={<PrivateRoute><Inbox /></PrivateRoute>} />
              <Route path="/inbox/c/:userId" element={<PrivateRoute><Inbox /></PrivateRoute>} />
        </Routes>
    </div>
  );
}
export default App;
