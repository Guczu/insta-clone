import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import NotificationLabel from './NotificationLabel';

export default function Notifications(props) {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const refreshNotifications = () => {
      const uid = localStorage.getItem('uid');
      const notificationsRef = collection(db, "users", uid, "notifications");
      onSnapshot(notificationsRef,(refSnapshot) => {
          const notificationsArray = [];
          refSnapshot.forEach((doc) => {
              notificationsArray.push({id: doc.id, data: doc.data()});
          });
          setNotifications(notificationsArray);
      });
    }
    refreshNotifications();
  }, [])

  const showNotifications = notifications?.sort((a,b) => b.data.timeStamp - a.data.timeStamp).map((notification, i) => {
    return (
      <div key={i}>
        <NotificationLabel notification={notification} />
      </div>
    )
  })

  return (
    <div className='navbar--searchbar'>
        <button className='navbar--searchbar--close' onClick={props.handleNotifications}>
          <span className='sr-only'>Zamknij okno</span>
          <span aria-hidden='true'>X</span>
        </button>
        <p>Powiadomienia</p>
        <hr/>
        <p>Ostatnie</p>
        <div className='navbar--searchbar--users'>
          {showNotifications}
        </div>
    </div>
  )
}