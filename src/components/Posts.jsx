import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../firebase';
import LoadingScreen from './LoadingScreen';
import PostTemplate from './PostTemplate';
import Stories from './Stories';
import fetchOneUserById from '../methods/fetchOneUserById'

export default function Posts() {

  const [posts, setPosts] = useState([]);
  const dataFetchedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.user);
  //const loggedUserFollowers = user.followed;
  const [loggedUserFollows, setLoggedUserFollows] = useState(null);
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    async function getUser() {
      const uid = localStorage.getItem('uid');
      const oneUser = await fetchOneUserById(uid);
      setLoggedUserFollows(oneUser.followed);
    }
    getUser();
  },[]) 

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const getPostsData = async () => {
        const loggedUser = await getDoc(doc(db, 'users', uid));
        const user = loggedUser.data().username;
        const followedUsers = [];
        const unsortedPosts = [];

        const followRef = collection(db, "followers");
        const q = query(followRef, where("user_following", "==", user));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          followedUsers.push(doc.data().user_followed);
        })

        followedUsers.forEach(async (followedUser) => {
            const postRef = collection(db, "posts");
            const postQuery = query(postRef, where("author", "==", followedUser));
            const querySnapshot2 = await getDocs(postQuery);
            querySnapshot2.forEach(async (doc) => {
              //setPosts(state => [...state, doc.data()]);
              //unsortedPosts.push(doc.data());
              unsortedPosts.push({id: doc.id, data: doc.data()});
            })
            const sortedPosts = unsortedPosts.sort((a, b) => {
              const timeStampA = a.data.timeStamp.seconds;
              const timeStampB = b.data.timeStamp.seconds;
              if (timeStampA < timeStampB) {
                return 1;
              }
              if (timeStampA > timeStampB) {
                return -1;
              }
              return 0;
            });
        setPosts(sortedPosts);
        await setIsLoading(false);
        })
    }
    getPostsData();
  },[])

  const showFollowersPosts = posts.map((post, i) => {
      return (
        <div key={i}>
          <PostTemplate post={post} />
        </div>
      )
  })

  return (
    <>
      <div className='mainpage--middle'>
          <Stories />
          {
            loggedUserFollows === 0 ? (
              <div className='posts--loadingposts'>
                  <p>Nikogo nie obserwujesz!</p>
                  <span>Zaobserwuj kogoś, aby zobaczyć jego posty.</span>
              </div>
            ) : (
              isLoading ? (
                <LoadingScreen />
              ) : (
                <div>
                    {showFollowersPosts}
                </div>
              )
            )
          }
      </div>
    </>
  )
}
