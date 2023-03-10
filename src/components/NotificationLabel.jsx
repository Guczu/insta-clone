import React, { useEffect, useState } from 'react';
import fetchOneUserById from '../methods/fetchOneUserById';
import getDate from '../methods/getDate';
import { useNavigate } from 'react-router-dom';

export default function NotificationLabel(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [notificationDate, setNotificationDate] = useState(null);

    useEffect(() => {
        if(props.notification.data.timeStamp) {
            const timestamp = props.notification.data.timeStamp.toDate().toISOString();
            setNotificationDate(getDate(timestamp))
        }

        const getUser = async () => {
            const user = await fetchOneUserById(props.notification.data.user_id);
            setUser(user);
        }
        getUser();
    },[props])

    const handleRoute = (route) => {
        navigate(route);
        window.location.reload();
    }

  return (
    <div className='notificationlabel--container' onClick={() => {handleRoute(`/${user.username}`)}}>
        <div className='notificationlabel--user'>
            <div className='notificationlabel--image'>
                {user !== null && (
                    <img src={user.picture}></img>
                )}
            </div>
            <div className='notificationlabel--names'>
                <div className='notificationlabel--username'>
                    <span className="bold">{props.notification.data.username + " "}</span>
                    <span>zaczął/zaczęła Cię obserwować.</span>
                    <span className='notificationlabel--date'>{notificationDate}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
