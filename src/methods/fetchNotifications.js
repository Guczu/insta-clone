import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function fetchNotifications() {
    const logged_user_id = localStorage.getItem('uid');

    const postRef = collection(db, "users", logged_user_id, "notifications");
    const docSnap = await getDocs(postRef);
    const notifications = [];

    docSnap.forEach((doc) => {
       notifications.push({id: doc.id, data: doc.data()})
    });
    return notifications;
}
