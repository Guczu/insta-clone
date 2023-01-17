import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import fetchNotifications from '../methods/fetchNotifications';
import NotificationLabel from './NotificationLabel';

export default function Notifications(props) {
  const [notifications, setNotifications] = useState(null);
  const [showNotifications, setShowNotifications] = useState(null);

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

  useEffect(() => {
    setShowNotifications(notifications?.sort((a,b) => b.data.timeStamp - a.data.timeStamp).map((notification, i) => {
      return (
        <div key={i}>
          <NotificationLabel notification={notification} />
        </div>
      )
    }))
  },[notifications])

  return (
    <div className='navbar--searchbar'>
        <div className='navbar--searchbar--close' onClick={props.handleNotifications}>
          X
        </div>
        <p>Powiadomienia</p>
        <hr />
        <p>Ostatnie</p>
        <div className='navbar--searchbar--users'>
          {showNotifications}
        </div>
      </div>
  )
}