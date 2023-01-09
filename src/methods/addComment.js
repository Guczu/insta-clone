import { nanoid } from "@reduxjs/toolkit";
import { doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import fetchOneUserById from '../methods/fetchOneUserById'

export default async function addComment(user_id, post, comment) {
    const user = await fetchOneUserById(user_id);
    await setDoc(doc(db, "posts", post.id, "comments", nanoid()), {
        id: user_id,
        username: user.username,
        content: comment,
        timeStamp: serverTimestamp()
    });

    await updateDoc(doc(db, "posts", post.id), {
        comments: increment(1)
      });
}
