import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Posts from './Posts';
import RightSide from './RightSide';
import { useEffect } from 'react';

export default function MainPage() {
  const navigate = useNavigate();
  const darkmode = useSelector(state => state.theme.theme);

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if(uid === null) {
      navigate('/login');
    }
  },[])

  return (
    <div className={`mainpage--container ${darkmode}`}>
      <Navbar />
      <div className='mainpage--content'>
        <div className='mainpage--wrapper'>
          <div className='mainpage--left'></div>
          <Posts />
          <RightSide />
        </div>
      </div>
    </div>
  )
}
