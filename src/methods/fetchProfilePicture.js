import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default async function fetchProfilePicture(id) {
    const userRef = collection(db, "users");
    const q = query(userRef, where("username", "==", id));
    const querySnapshot = await getDocs(q);
    const user = [];

    querySnapshot.forEach(async (doc) => {
        user.push(doc.data().picture);
    });

    return user[0];
}
