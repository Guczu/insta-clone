import React from 'react';
import {default_avatar_url} from '../constants';

export default function Stories() {
  return (
    <div className='mainpage--stories'>
      <div className='mainpage--story'>
        <img src={default_avatar_url} alt='zdjęcie profilowe' />
        <p>Name</p>
      </div>
      
      <div className='mainpage--story'>
        <img src={default_avatar_url} alt='zdjęcie profilowe' />
        <p>Name</p>
      </div>

      <div className='mainpage--story'>
        <img src={default_avatar_url} alt='zdjęcie profilowe' />
        <p>Name</p>
      </div>

      <div className='mainpage--story'>
        <img src={default_avatar_url} alt='zdjęcie profilowe' />
        <p>Name</p>
      </div>
      
      <div className='mainpage--story'>
        <img src={default_avatar_url} alt='zdjęcie profilowe' />
        <p>Name</p>
      </div>
    </div>
  )
}
