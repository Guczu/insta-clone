import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function fetchUsers() {
    const users = [];

    const uid = localStorage.getItem('uid');
    const loggedUser = await getDoc(doc(db, 'users', uid));
    const username = loggedUser.data().username;

    const userRef = collection(db, "users");
    const docSnap = await getDocs(userRef);
  
    docSnap.forEach((doc) => {
        if(doc.data().username !== username) {
            users.push({id: doc.id, data: doc.data()});
        }
    });
    
    return users;
}
