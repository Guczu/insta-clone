import React from 'react'

export default function Stories() {
  const avatar = "https://firebasestorage.googleapis.com/v0/b/instaclone-cb003.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=37a6fba9-330d-43f7-852a-e3ac79b41556";
  return (
    <div className='mainpage--stories'>
      <div className='mainpage--story'>
        <img src={avatar}></img>
        <p>Name</p>
      </div>
      
      <div className='mainpage--story'>
        <img src={avatar}></img>
        <p>Name</p>
      </div>

      <div className='mainpage--story'>
        <img src={avatar}></img>
        <p>Name</p>
      </div>

      <div className='mainpage--story'>
        <img src={avatar}></img>
        <p>Name</p>
      </div>
      
      <div className='mainpage--story'>
        <img src={avatar}></img>
        <p>Name</p>
      </div>
    </div>
  )
}
