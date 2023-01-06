import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import profileimg from '../images/storyimg.jpg'
import RecommendedUser from './RecommendedUser';
import useChangeRoute from '../methods/useChangeRoute';
import fetchUsers from '../methods/fetchUsers';

export default function RightSide() {

  const [users, setUsers] = useState([]);
  const dataFetchedRef = useRef(false);
  const user = useSelector(state => state.user);
  const changeRoute = useChangeRoute();

  useEffect(() => {
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
    /*
    const getUsers = async () => {
      const loggedUser = await getDoc(doc(db, 'users', uid));
      const username = loggedUser.data().username;
      const ref = collection(db, "users");
      const docSnap = await getDocs(ref);
  
      docSnap.forEach((doc) => {
        if(doc.data().username !== username) {
          setUsers(state => [...state, doc.data()]);
        }
      });
    }*/
    async function fetchData() {
      const users = await fetchUsers();
      setUsers(users);
    }
    fetchData();
  },[])

  const showUsers = users.map((user,i) => {
    return(
    <div key={i}>
      <RecommendedUser userData={user} checkProfile={changeRoute}/>
    </div>
    )
  })

  return (
    <div className='mainpage--right'>
            <div className='mainpage--info'>
              <img src={user.picture}></img>
              <div className='mainpage--names'>
                <p className='bold' onClick={() => changeRoute(`/${user.username}`)}>{user.username}</p>
                <p className='gray'>{user.name}</p>
              </div>
              <button className='clickable'>Przełącz</button>
            </div>

            <div className='mainpage--recommendedinfo'>
              <p className='gray bold'>Propozycje dla Ciebie</p>
              <p className='bold clickable'>Zobacz wszystkich</p>
            </div>

            {showUsers}
            
            <div className='mainpage--recommendedfooter'>
              <p className='gray'>&copy; 2022 INSTAGRAM FROM X</p>
            </div>

          </div>
  )
}
