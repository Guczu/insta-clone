import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useRef, useState, useEffect } from 'react'
import { db } from '../firebase';
import LoadingScreen from './LoadingScreen';
import PostTemplate from './PostTemplate';
import Stories from './Stories';
import fetchOneUserById from '../methods/fetchOneUserById'

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [showFollowersPosts, setShowFollowersPosts] = useState(null);
  const [loggedUserFollows, setLoggedUserFollows] = useState(null);
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    const getUser = async () => {
      const oneUser = await fetchOneUserById(uid);
      setLoggedUserFollows(oneUser.followed);
    }
    getUser();

    const getPostsData = async () => {
        const loggedUser = await getDoc(doc(db, 'users', uid));
        const user = loggedUser.data().username;
        const followedUsers = [];
        const posts = [];

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
              posts.push({id: doc.id, data: doc.data()});
            })

        setShowFollowersPosts(posts?.sort((a,b) => b.data.timeStamp - a.data.timeStamp).map((post, i) => {
          return (
            <div key={i}>
              <PostTemplate post={post} />
            </div>
          )
        }));

        setIsLoading(false);
        })
    }
    getPostsData();
  },[])

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
