import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecommendedUser from './RecommendedUser';
import fetchUsers from '../methods/fetchUsers';
import { useNavigate } from 'react-router-dom';

export default function RightSide() {
  const [showUsers, setShowUsers] = useState(null);
  const dataFetchedRef = useRef(false);
  const user = useSelector(state => state.user);
  const darkmode = useSelector(state => state.theme.theme);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

    async function fetchData() {
      const users = await fetchUsers();
      setShowUsers(users.sort((a,b) => 0.5 - Math.random()).slice(0,4).map((user,i) => {
          return(
            <div key={i}>
              <RecommendedUser userData={user} checkProfile={navigate}/>
            </div>
          )
      }))
    }
    fetchData();
  },[user])

  return (
    <div className={`mainpage--right ${darkmode}`}>
      <div className='mainpage--info'>
        <img src={user.picture}></img>
        <div className='mainpage--names'>
          <p className='bold' onClick={() => navigate(`/${user.username}`)}>{user.username}</p>
          <p className='gray'>{user.name}</p>
        </div>
        <button className='clickable'>Przełącz</button>
      </div>

      <div className='mainpage--recommendedinfo'>
        <p className='gray bold'>Propozycje dla Ciebie</p>
        <p className='bold clickable'>Zobacz wszystkich</p>
      </div>

      {showUsers !== null && showUsers}
      
      <div className='mainpage--recommendedfooter'>
        <p className='gray'>&copy; 2022 INSTAGRAM FROM X</p>
      </div>
    </div>
  )
}
