import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import fetchUsers from '../methods/fetchUsers';
import useChangeRoute from '../methods/useChangeRoute';
import UserLabel from './UserLabel';
import fetchOneUserById from '../methods/fetchOneUserById'

export default function SearchBar(props) {
    const [userList, setUserList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [foundUser, setFoundUser] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
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
                    const response = await fetchOneUserById(doc.data().found_id);
                    searches.push({id: doc.data().found_id, data: response});
                }
            });
            
            setRecentSearches(searches);
        }
        getRecentSearches();
    },[])
    
    useEffect(() => {
        const findUser = () => {
                const findUsers = userList.filter(user => {
                    if(user.data.username.includes(searchText)) {
                        return user;
                    }
                })
                setFoundUser(findUsers);
        }
        findUser();
    },[searchText])


    const searchUser = async (e) => {
        await setSearchText(e.target.value);
    }

    const showFoundUsers = foundUser.length !== 0 && (foundUser.map((user, i) => {
        return (
            <div key={i}>
                <UserLabel userData={user} checkProfile={changeRoute} />
            </div>
        )
    }))

    const showRecentUsers = recentSearches !== 0 && (recentSearches.map((user, i) => {
        console.log(recentSearches)
        return (
            <div key={i}>
                <UserLabel userData={user} checkProfile={changeRoute} />
            </div>
        )
    }))

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
//{foundUser.length !== 0 && searchText !== "" && showFoundUsers}