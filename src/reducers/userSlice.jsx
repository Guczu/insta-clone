import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: null,
    name: null,
    username: null,
    email: null,
    posts: null,
    followed: null, // user followed that amount of people
    following: null, // that amount of people is following user
    followers: [],
    picture: null,
    bio: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.posts = action.payload.posts;
            state.followed = action.payload.followed;
            state.following = action.payload.following;
            state.followers = action.payload.followers;
            state.picture = action.payload.picture;
            state.bio = action.payload.bio;
        },
        setFollowed: (state, action) => {
            return (
                {
                    ...state,
                    followed: action.payload
                }            
            )
        },
        setFollowing: (state, action) => {
            return (
                {
                    ...state,
                    following: action.payload
                }            
            )
        },
        setPicture: (state, action) => {
            return (
                {
                    ...state,
                    picture: action.payload
                }
            )
        },
        setBio: (state, action) => {
            return (
                {
                    ...state,
                    bio: action.payload
                }
            )
        }
    }
})

export const { setUser, setFollowed, setFollowing, setPicture } = userSlice.actions;
export default userSlice.reducer;