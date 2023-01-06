import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default async function fetchUsers(id) {
    const userRef = collection(db, "users");
    const q = query(userRef, where("username", "==", id));
    const user = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
        user.push({id: doc.id, data: doc.data()});
    });

    return user[0];
}
