import React from 'react'
import storyimg from '../images/storyimg.jpg';

export default function Stories() {
  return (
    <div className='mainpage--stories'>
              <div className='mainpage--story'>
                <img src={storyimg}></img>
                <p>Name</p>
              </div>
              
              <div className='mainpage--story'>
                <img src={storyimg}></img>
                <p>Name</p>
              </div>

              <div className='mainpage--story'>
                <img src={storyimg}></img>
                <p>Name</p>
              </div>

              <div className='mainpage--story'>
                <img src={storyimg}></img>
                <p>Name</p>
              </div>
              
              <div className='mainpage--story'>
                <img src={storyimg}></img>
                <p>Name</p>
              </div>
    </div>
  )
}
