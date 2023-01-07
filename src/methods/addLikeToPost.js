import { doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import fetchOneUserById from '../methods/fetchOneUserById'

export default async function getPostLikes(user_id, post) {
    const user = await fetchOneUserById(user_id);
    await setDoc(doc(db, "posts", post.id, "likes", user_id), {
        username: user.username,
        timeStamp: serverTimestamp()
    });

    await updateDoc(doc(db, "posts", post.id), {
        likes: increment(1)
      });
}
