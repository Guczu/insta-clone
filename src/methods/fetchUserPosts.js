import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default async function fetchUsers(id) {
    const postRef = collection(db, "posts");
    const q2 = query(postRef, where("author", "==", id));
    const querySnapshot2 = await getDocs(q2);

    const posts = [];

    querySnapshot2.forEach(async (doc) => {
        posts.push(doc.data())
    });

    return posts;
}
