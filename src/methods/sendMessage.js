import { nanoid } from "@reduxjs/toolkit";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function sendMessage(targetUserId, content) {
    const logged_id = localStorage.getItem('uid');
    const id = nanoid();
    await setDoc(doc(db, "users", logged_id, "inbox", targetUserId), {
        timeStamp: serverTimestamp()
    });

    await setDoc(doc(db, "users", targetUserId, "inbox", logged_id), {
        timeStamp: serverTimestamp()
    });

    await setDoc(doc(db, "users", logged_id, "inbox", targetUserId, "messages", id), {
        content: content,
        user_id: logged_id,
        timeStamp: serverTimestamp()
    });

    await setDoc(doc(db, "users", targetUserId, "inbox", logged_id, "messages", id), {
        content: content,
        user_id: logged_id,
        timeStamp: serverTimestamp()
    });
}
