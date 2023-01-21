import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function fetchInboxMessages(id) {
    const logged_user_id = localStorage.getItem('uid');

    const inboxRef = collection(db, "users", logged_user_id, "inbox", id, "messages");
    const docSnap = await getDocs(inboxRef);
    const messages = [];

    docSnap.forEach((doc) => {
       messages.push({id: doc.id, data: doc.data()})
    });
    return messages;
}
