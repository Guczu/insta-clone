import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function unfollowUser(user_id, follow_id) {
    const loggeduser = localStorage.getItem('uid');
    await deleteDoc(doc(db, "followers", follow_id));
    await updateDoc(doc(db, "users", loggeduser), {followed: increment(-1)});
    await updateDoc(doc(db, "users", user_id), {following: increment(-1)});
}
