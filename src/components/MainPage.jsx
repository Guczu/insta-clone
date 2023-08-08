import React from 'react'
import Navbar from './Navbar';
import Posts from './Posts';
import RightSide from './RightSide';

export default function MainPage() {
  return (
    <div className='mainpage--container'>
      <Navbar />
      <div className='mainpage--content'>
        <div className='mainpage--wrapper'>
          <div className='mainpage--left' />
          <Posts />
          <RightSide />
        </div>
      </div>
    </div>
  )
}
