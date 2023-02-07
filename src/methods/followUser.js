import { nanoid } from "@reduxjs/toolkit";
import { deleteDoc, doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function followUser(user_id, logged_username, target_username) {
    const loggeduser = localStorage.getItem('uid');
    await setDoc(doc(db, "followers", nanoid()), {
        user_following: logged_username,
        user_followed: target_username,
        timeStamp: serverTimestamp(),
    });
    await updateDoc(doc(db, "users", loggeduser), {followed: increment(1)});
    await updateDoc(doc(db, "users", user_id), {following: increment(1)});
}
