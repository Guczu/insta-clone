import { deleteDoc, doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import fetchOneUserById from '../methods/fetchOneUserById'

export default async function removeLikeFromPost(user_id, post) {
    const user = await fetchOneUserById(user_id);
    await deleteDoc(doc(db, "posts", post.id, "likes", user_id));

    await updateDoc(doc(db, "posts", post.id), {
        likes: increment(-1)
      });
}
