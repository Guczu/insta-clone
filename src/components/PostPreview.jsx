import React, { useEffect } from 'react'
import { useState } from 'react';
import getDate from '../methods/getDate';
import getPostLikes from '../methods/getPostLikes';
import addLikeToPost from '../methods/addLikeToPost';
import removeLikeFromPost from '../methods/removeLikeFromPost';
import Comment from './Comment';
import fetchOneUser from '../methods/fetchOneUser';
import addComment from '../methods/addComment';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import {default_avatar_url} from '../constants';

export default function PostPreview(props) {
    const [postDate, setPostDate] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likesAmount, setLikesAmount] = useState(props.post.data.likes);
    const [commentContent, setCommentContent] = useState("");
    const [postAuthor, setPostAuthor] = useState({data: {username: "User"}});
    const [comments, setComments] = useState();
    const uid = localStorage.getItem('uid');
    const navigate = useNavigate();
    
    useEffect(() => {
        const commentRef = collection(db, "posts", props.post.id, "comments");
        const unsubscribe = onSnapshot(commentRef,(refSnapshot) => {
            const commentsArray = [];
            refSnapshot.forEach((doc) => {
                commentsArray.push({id: doc.id, data: doc.data()});
            });

            setComments(commentsArray.sort((a,b) => b.data.timeStamp - a.data.timeStamp));
        });
    return () => unsubscribe();
    }, [])

    useEffect(() => {
        if(props.post.data.timeStamp) {
            const timestamp = props.post.data.timeStamp.toDate().toISOString();
            setPostDate(getDate(timestamp));
        }

        const checkIfLiked = async () => {
            const user_id = localStorage.getItem('uid');
            const post_data = props.post;
            const isLiked = await getPostLikes(user_id, post_data);
            if(isLiked) {
              setLiked(true);
            }
        }
        checkIfLiked(props.post);

        const getPostAuthor = async () => {
            const user = await fetchOneUser(props.post.data.author);
            setPostAuthor(user);
        }
        getPostAuthor();
    }, [props])

    const handleLike = async () => {
        const logged_user = uid;
        const post_data = props.post;
  
        if(!liked) {
          addLikeToPost(logged_user, post_data);
          setLiked(state => !state);
          setLikesAmount(state => state + 1);
        }
        else {
          removeLikeFromPost(logged_user, post_data);
          setLiked(state => !state);
          setLikesAmount(state => state - 1);
        }
    }

    const addCommentToPost = async () => {
        setCommentContent("");
        if(commentContent !== "") {
            await addComment(uid, props.post, commentContent);
        }
    }

    const showComments = comments?.sort((a,b) => b.data.timeStamp - a.data.timeStamp).map((comment, i) => {
        return (
            <div key={i}>
                <Comment comment={comment} />
            </div>
        )
    })

  return (
    <div className='postpreview--container'>
        <div className='postpreview--frame'>
        <button className='addpost--button' onClick={props.handleTrigger}>
            <span className='sr-only'>Zamknij okno</span>
            <span aria-hidden='true'>X</span>
        </button>
            <div className='postpreview--image'>
                <img src={props.post.data.imgurl} alt='zdjęcie posta' />
            </div>
            <div className='postpreview--rightside'>
                <div className='postpreview--author'>
                    <img src={postAuthor ? postAuthor.data.picture : default_avatar_url} alt='zdjęcie profilowe' onClick={() => navigate(`/${postAuthor.data.username}`)} />
                    <Link to={`/${postAuthor.data.username}`}>{props.post.data.author}</Link>
                </div>
                <hr/>
                <div className='postpreview--description'>
                    <img src={postAuthor ? postAuthor.data.picture : default_avatar_url} alt='zdjęcie profilowe' onClick={() => navigate(`/${postAuthor.data.username}`)} />
                    <Link to={`/${postAuthor.data.username}`}>{props.post.data.author}</Link>
                    <span>{props.post.data.description}</span>
                </div>
                <div className='postpreview--comments'>
                    {showComments}
                </div>
                <hr/>
                <div className='postpreview--stats'>
                    <div className='postpreview--options'>
                        <i className={!liked ? 'fa-regular fa-heart fa-xl' : 'fa-solid fa-heart fa-xl red--heart'} onClick={handleLike} />
                        <i className='fa-regular fa-comment fa-xl' />
                        <i className='fa-regular fa-paper-plane fa-xl' />
                        <div className='postpreview--bookmark'>
                            <i className='fa-regular fa-bookmark fa-xl' />
                        </div>
                    </div>
                    <div className='postpreview--likes'>
                        <p>Liczba polubień: {likesAmount}</p>
                    </div>
                    <div className='postpreview--date'>
                        <span>{postDate}</span>
                    </div>
                    <hr/>
                    <div className='postpreview--addcomment'>
                        <i className='fa-regular fa-face-smile fa-2x'></i>
                        <label htmlFor='commentPreview'>
                            <span className='sr-only'>Dodaj komentarz</span>
                        </label>
                        <input type='text' value={commentContent} placeholder='Dodaj komentarz...' id='commentPreview' onChange={e => setCommentContent(e.target.value)} />
                        <button onClick={addCommentToPost}>Opublikuj</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
