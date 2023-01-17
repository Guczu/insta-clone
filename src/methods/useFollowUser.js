import { nanoid } from "@reduxjs/toolkit";
import { doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import addNotification from "./addNotification";


export default function useFollowUser() {
    const uid = localStorage.getItem('uid');
    async function followUser(loggeduser, usertofollow) {
        try {
            await setDoc(doc(db, "followers", nanoid()), {
              user_following: loggeduser.username,
              user_followed: usertofollow.data.username,
              timeStamp: serverTimestamp(),
            });
          }
          catch(err) {
            console.log(err);
          }
          await updateDoc(doc(db, "users", uid), {followed: increment(1)});
          await updateDoc(doc(db, "users", usertofollow.id), {following: increment(1)});
          //checkFollow(user.username, id);
          addNotification(usertofollow, "follow");
    }

    return followUser;
}