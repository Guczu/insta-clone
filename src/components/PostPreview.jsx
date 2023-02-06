import React, { useEffect } from 'react'
import { useState } from 'react';
import getDate from '../methods/getDate';
import getPostLikes from '../methods/getPostLikes';
import addLikeToPost from '../methods/addLikeToPost';
import removeLikeFromPost from '../methods/removeLikeFromPost';
import Comment from './Comment';
import fetchOneUser from '../methods/fetchOneUser';
import useChangeRoute from '../methods/useChangeRoute'
import addComment from '../methods/addComment';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function PostPreview(props) {
    const [postDate, setPostDate] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likesAmount, setLikesAmount] = useState(props.post.data.likes);
    const [commentContent, setCommentContent] = useState("");
    const [postAuthor, setPostAuthor] = useState(null);
    const [comments, setComments] = useState();
    const uid = localStorage.getItem('uid');
    const changeRoute = useChangeRoute();
    const avatar = "https://firebasestorage.googleapis.com/v0/b/instaclone-cb003.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=37a6fba9-330d-43f7-852a-e3ac79b41556";

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
                <Comment comment={comment} changeRoute={changeRoute}/>
            </div>
        )
    })

  return (
    <div className='postpreview--container' onClick={props.handleTrigger}>
        <div className='postpreview--frame' onClick={(e) => { e.stopPropagation(); return false; }}>
        <button className='addpost--button' onClick={props.handleTrigger}>X</button>
            <div className='postpreview--image'>
                <img src={props.post.data.imgurl}></img>
            </div>
            <div className='postpreview--rightside'>
                <div className='postpreview--author'>
                    <img src={postAuthor !== null ? postAuthor.data.picture : avatar} onClick={() => changeRoute(`/${postAuthor.data.username}`)}></img>
                    <span className='bold clickable' onClick={() => changeRoute(`/${postAuthor.data.username}`)}>{props.post.data.author}</span>
                </div>
                <hr></hr>
                <div className='postpreview--description'>
                    <img src={postAuthor !== null ? postAuthor.data.picture : avatar} onClick={() => changeRoute(`/${postAuthor.data.username}`)}></img>
                    <span className='bold clickable' onClick={() => changeRoute(`/${postAuthor.data.username}`)}>{props.post.data.author}</span>
                    <span>{props.post.data.description}</span>
                </div>
                <div className='postpreview--comments'>
                    {showComments}
                </div>
                <hr></hr>
                <div className='postpreview--stats'>
                    <div className='postpreview--options'>
                        <i className={!liked ? "fa-regular fa-heart fa-xl" : "fa-solid fa-heart fa-xl red--heart"} onClick={handleLike}></i>
                        <i className="fa-regular fa-comment fa-xl"></i>
                        <i className="fa-regular fa-paper-plane fa-xl"></i>
                        <div className="postpreview--bookmark">
                            <i className="fa-regular fa-bookmark fa-xl"></i>
                        </div>
                    </div>
                    <div className='postpreview--likes'>
                        <p>Liczba polubień: {likesAmount}</p>
                    </div>
                    <div className='postpreview--date'>
                        <span>{postDate}</span>
                    </div>
                    <hr></hr>
                    <div className='postpreview--addcomment'>
                        <i className="fa-regular fa-face-smile fa-2x"></i>
                        <input type="text" value={commentContent} placeholder='Dodaj komentarz...' onChange={e => setCommentContent(e.target.value)}></input>
                        <button onClick={addCommentToPost}>Opublikuj</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
