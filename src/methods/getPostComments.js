import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function getPostComments(post) {
    const postRef = collection(db, "posts", post.id, "comments");
    const docSnap = await getDocs(postRef);
    const comments = [];

    docSnap.forEach((doc) => {
       comments.push({id: doc.id, data: doc.data()})
    });
    return comments;
}
