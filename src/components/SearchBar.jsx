import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import fetchUsers from '../methods/fetchUsers';
import useChangeRoute from '../methods/useChangeRoute';
import UserLabel from './UserLabel';

export default function SearchBar(props) {
    const [userList, setUserList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [foundUser, setFoundUser] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentUsers, setShowRecentUsers] = useState(null);
    const changeRoute = useChangeRoute();

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetchUsers();
            setUserList(response);
        }
        getUsers();

        const getRecentSearches = async () => {
            const searches = [];

            const uid = localStorage.getItem('uid');
            const searchRef = collection(db, "search-history");
            const docSnap = await getDocs(searchRef);
        
            docSnap.forEach(async (doc) => {
                if(doc.data().logged_id === uid) {
                    searches.push({id: doc.data().found_id, timeStamp: doc.data().timeStamp});
                }
            });
            setRecentSearches(searches);

            setShowRecentUsers(searches?.sort((a,b) => b.timeStamp - a.timeStamp).map((user, i) => {
                return (
                    <div key={i}>
                        <UserLabel userData={user} checkProfile={changeRoute} recentUsers={searches}/>
                    </div>
                )
            }))
        }
        getRecentSearches();
    },[])

    const searchUser = (e) => {
        setSearchText(e.target.value);
        const findUsers = userList.filter(user => {
            if(user.data.username.includes(e.target.value)) {
                return user;
            }
        })
        setFoundUser(findUsers);
    }

    const showFoundUsers = foundUser.map((user, i) => {
        return (
            <div key={i}>
                <UserLabel userData={user} checkProfile={changeRoute} recentUsers={recentSearches}/>
            </div>
        )
    })

  return (
    <div className='navbar--searchbar'>
        <div className='navbar--searchbar--close' onClick={props.handleSearchBar}>
          X
        </div>
        <p>Szukaj</p>
        <input type="text" placeholder='Szukaj' onKeyUp={(e) => searchUser(e)}></input>
        <hr />
        <div className='navbar--searchbar--users'>
            {searchText === "" ? (
                <div className='navbar--searchbar--users'>
                    <p>Ostatnie</p>
                    {showRecentUsers}
                </div>
            ) : (
                <div className='navbar--searchbar--users'>
                    <p>Znalezieni użytkownicy</p>
                    {foundUser.length !== 0 && showFoundUsers}
                    {foundUser.length === 0 && <p className='navbar--searchbar--notfound'>Brak</p>}
                </div>
            )}
        </div>
      </div>
  )
}