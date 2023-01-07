import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function getPostLikes(user_id, post) {
    const postRef = collection(db, "posts", post.id, "likes");
    const docSnap = await getDocs(postRef);
    let isLiked = false;

    docSnap.forEach((doc) => {
        if(doc.id === user_id) {
            isLiked = true;
        }
        else {
            isLiked = false;
        }
    });
    return isLiked;
}
