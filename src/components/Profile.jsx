import React, { useEffect } from 'react'
import Navbar from './Navbar'
import avatar from '../images/storyimg.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AddPost from './AddPost';
import { addDoc, collection, deleteDoc, doc, getDocs, increment, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import PostTile from './PostTile';
import { useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import fetchOneUser from '../methods/fetchOneUser';
import fetchUserPosts from '../methods/fetchUserPosts';
import FollowedUsers from './FollowedUsers';
import FollowingUsers from './FollowingUsers';
import { setFollowed, setFollowing } from '../reducers/userSlice';
import LoadingScreen from './LoadingScreen';
import EditProfile from './EditProfile';
import SendMessage from './SendMessage';

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkmode = useSelector(state => state.theme.theme);
    const {id} = useParams();

    const user = useSelector(state => state.user);
    const dataFetchedRef = useRef(false);
    const [trigger, setTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowed, setIsFollowed] = useState(false);
    const [followData, setFollowData] = useState(null);
    const [followedTrigger, setFollowedTrigger] = useState(false);
    const [followingTrigger, setFollowingTrigger] = useState(false);
    const [messageTrigger, setMessageTrigger] = useState(false);
    const [followedList, setFollowedList] = useState([]);
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        const uid = localStorage.getItem('uid');

        if(uid === null) {
            navigate('/login');
        }

        const getUserData = async () => {
            await setIsLoading(true);

            if(id !== null){
              const posts = await fetchUserPosts(id);
              setUserPosts(posts);

              const user = await fetchOneUser(id);
              setUserData(user);
            }

            await setIsLoading(false);
        }

        //zmienic nazwy funkcji z followed na following i drugą też bo sie to nie pokrywa
        const getFollowedUsers = async () => {
            const followRef = collection(db, "followers");
              const q = query(followRef, where("user_following", "==", id));
              const querySnapshot = await getDocs(q);
    
              querySnapshot.forEach(async (doc) => {
                const userData = await fetchOneUser(doc.data().user_followed);
                setFollowedList(state => [...state, userData]);
              })
        }

        const getFollowingUsers = async () => {
            const followRef = collection(db, "followers");
              const q = query(followRef, where("user_followed", "==", id));
              const querySnapshot = await getDocs(q);
    
              querySnapshot.forEach(async (doc) => {
                const userData = await fetchOneUser(doc.data().user_following);
                setFollowingList(state => [...state, userData]);
              })
        }

        getFollowingUsers();
        getFollowedUsers();
        getUserData();
    }, [])

    //add post
    const handleTrigger = () => {
        if(!trigger) {
            document.querySelector('html').style.overflowY = 'hidden';
          }
          else {
            document.querySelector('html').style.overflowY = 'scroll';
          }
        setTrigger(oldState => !oldState);
    }

    const handleFollowedTrigger = () => {
        if(!followedTrigger) {
            document.querySelector('html').style.overflowY = 'hidden';
          }
          else {
            document.querySelector('html').style.overflowY = 'scroll';
          }
        setFollowedTrigger(oldState => !oldState);
    }
    
    const handleFollowingTrigger = () => {
        if(!followingTrigger) {
            document.querySelector('html').style.overflowY = 'hidden';
          }
          else {
            document.querySelector('html').style.overflowY = 'scroll';
          }
        setFollowingTrigger(oldState => !oldState);
    }

    const handleEditTrigger = () => {
        if(!editTrigger) {
            document.querySelector('html').style.overflowY = 'hidden';
          }
          else {
            document.querySelector('html').style.overflowY = 'scroll';
          }
        setEditTrigger(oldState => !oldState);
    }

    const handleMessageTrigger = () => {
        if(!messageTrigger) {
            document.querySelector('html').style.overflowY = 'hidden';
          }
          else {
            document.querySelector('html').style.overflowY = 'scroll';
          }
        setMessageTrigger(oldState => !oldState);
    }

    const showPosts = userPosts?.sort((a,b) => b.data.timeStamp - a.data.timeStamp).map((post, i) => {
        return (
            <PostTile 
                key={i}
                post={post} 
            />
        )
    })

    const followUser = async () => {
        try {
          await setDoc(doc(db, "followers", nanoid()), {
            user_following: user.username,
            user_followed: id,
            timeStamp: serverTimestamp(),
          });
        }
        catch(err) {
          console.log(err);
        }
        const loggeduser = localStorage.getItem('uid');
        const following_user = userData.id;
        await updateDoc(doc(db, "users", loggeduser), {followed: increment(1)});
        await updateDoc(doc(db, "users", following_user), {following: increment(1)});
        checkFollow(user.username, id);
      };

      useEffect(() => {
        checkFollow(user.username, id);
      },[user])


    const checkFollow = async (user_following, user_followed) => {
          const followRef = collection(db, "followers");
          const q = query(followRef, where("user_following", "==", user_following), where("user_followed", "==", user_followed));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach(async (doc) => {
            setIsFollowed(true);
            setFollowData({id: doc.id, data: doc.data()});
            updateFollows();
          })
    }

    const updateFollows = async () => {
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
        setUserData({id: doc.id, data: doc.data()});
        });
    }

    const unfollowUser = async (user_following, user_followed) => {
        await deleteDoc(doc(db, "followers", followData.id));
        const loggeduser = localStorage.getItem('uid');
        const following_user = userData.id;
        await updateDoc(doc(db, "users", loggeduser), {followed: increment(-1)});
        dispatch(setFollowed(user.followed-1));
        await updateDoc(doc(db, "users", following_user), {following: increment(-1)});
        setIsFollowed(false);
        updateFollows();
    }

  return (
    <>
    {isLoading ? (
        <LoadingScreen />
    ) : (
    <div className={`mainpage--container ${darkmode}`}>
        <Navbar />
        {trigger && <AddPost handleTrigger={handleTrigger}/>}
        {followedTrigger && <FollowedUsers handleFollowedTrigger={handleFollowedTrigger} followedList={followedList} />}
        {followingTrigger && <FollowingUsers handleFollowingTrigger={handleFollowingTrigger} followingList={followingList} />}
        {editTrigger && <EditProfile handleEditTrigger={handleEditTrigger} />}
        {messageTrigger && <SendMessage handleMessageTrigger={handleMessageTrigger} />}

        <div className='mainpage--content'>
        <div className='mainpage--wrapper'>
            <div className='mainpage--left'></div>
            <div className='profile--container'>
                <div className='profile--content'>
                    <div className='profile--avatar'>
                        <img src={userData.data.picture}></img>
                    </div>
                    <div className='profile--info'>
                        <div className='profile--options'>
                            <p>{userData.data.username}</p>

                            {id === user.username ? (
                                <>
                                    <button onClick={handleEditTrigger}>Edytuj profil</button>
                                    <button onClick={handleTrigger}>Dodaj post</button>
                                    <i className="fa-solid fa-gear fa-xl"></i>
                                </>
                            ) : (
                                <>
                                    {!isFollowed ? (
                                        <button className='followbutton' onClick={() => {followUser(user.username, id)}}>Obserwuj</button>
                                    )
                                    : (
                                        <button className='followedbutton' onClick={() => {unfollowUser(user.username, id)}}>Obserwujesz</button>
                                    )}  
                                    <button onClick={handleMessageTrigger}>Wyślij wiadomość</button>
                                    <i className="fa-solid fa-ellipsis fa-xl"></i>
                                </>
                            )
                            }     
                        </div>
                        <div className='profile--stats'>
                            <p>Posty: <span className='bold'>{userData.data.posts}</span></p>
                            <p className='clickable' onClick={handleFollowingTrigger}><span className='bold'>{userData.data.following}</span> obserwujących</p>
                            <p className='clickable' onClick={handleFollowedTrigger}>Obserwowani: <span className='bold'>{userData.data.followed}</span></p>
                        </div>
                        <div className='profile--bio'>
                            <p>{userData.data.bio}</p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='profile--nav'>
                    <div className='profile--navlink'>
                        <i className="fa-solid fa-table-cells fa-xl"></i>
                        <p>POSTY</p>
                    </div>
                    <div className='profile--navlink'>
                        <i className="fa-regular fa-bookmark fa-xl"></i>
                        <p>ZAPISANE</p>
                    </div>
                    <div className='profile--navlink'>
                        <i className="fa-solid fa-image-portrait fa-xl"></i>
                        <p>Z OZNACZENIEM</p>
                    </div>
                </div>
                <div className='profile--posts'>
                    { userData.data.posts < 1 && id === user.username ? (
                    <>
                        <div className='profile--img'>
                            <i className="fa-solid fa-camera fa-4x clickable" onClick={handleTrigger}></i>
                        </div>
                        <div className='profile--poststext'>
                            <p className='title'>Udostępnij zdjęcia</p>
                            <p className='sizeup'>Gdy udostępnisz zdjęcia, pojawiają się one na Twoim profilu.</p>
                            <p className='clickable blue' onClick={handleTrigger}>Udostępnij swoje pierwsze zdjęcie</p>
                        </div>
                    </>
                        ) : (
                            <div className='profile--gridposts'>
                                {showPosts}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
    )}
    </>
  )
}
