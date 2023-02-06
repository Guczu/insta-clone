import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Posts from './Posts';
import RightSide from './RightSide';

export default function MainPage() {
  const darkmode = useSelector(state => state.theme.theme);

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
