import React from 'react'
import loadingscreen from '../images/loadingscreen.png'

export default function LoadingScreen() {
  return (
    <div className='loadingscreen--container'>
        <div className='loadingscreen--image'>
            <img src={loadingscreen}></img>
        </div>
    </div>
  )
}
