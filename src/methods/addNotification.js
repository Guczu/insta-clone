import { nanoid } from "@reduxjs/toolkit";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import fetchOneUserById from '../methods/fetchOneUserById'

export default async function addNotification(user_data, type) {
    const logged_id = localStorage.getItem('uid');
    const user_id = user_data.id;
    const user = await fetchOneUserById(logged_id);
    const id = nanoid();
    await setDoc(doc(db, "users", user_id, "notifications", id), {
        id: id,
        username: user.username,
        user_id: logged_id,
        type: type,
        timeStamp: serverTimestamp()
    });
}
