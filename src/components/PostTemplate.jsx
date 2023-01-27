import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import storyimg from '../images/storyimg.jpg'
import getDate from '../methods/getDate';
import addLikeToPost from '../methods/addLikeToPost';
import removeLikeFromPost from '../methods/removeLikeFromPost';
import getPostLikes from '../methods/getPostLikes';
import addComment from '../methods/addComment';
import PostPreview from './PostPreview';
import fetchOneUser from '../methods/fetchOneUser';

export default function PostTemplate(props) {
    const [postDate, setPostDate] = useState(null);
    const [liked, setLiked] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [commentsAmount, setCommentsAmount] = useState(props.post.data.comments);
    const [previewTrigger, setPreviewTrigger] = useState(false);
    const [postAuthor, setPostAuthor] = useState(null);
    const [likesAmount, setLikesAmount] = useState(props.post.data.likes);
    const uid = localStorage.getItem('uid');
    const navigate = useNavigate();

    useEffect(() => {
        const timestamp = props.post.data.timeStamp.toDate().toISOString();
        setPostDate(getDate(timestamp))

        const checkIfLiked = async () => {
          console.log(props.post)
          const post_data = props.post;
          const isLiked = await getPostLikes(uid, post_data);
          console.log(isLiked)
          if(isLiked) {
            setLiked(true);
          }
          setLikesAmount(props.post.data.likes);
          setCommentsAmount(props.post.data.comments);
        }
        checkIfLiked(props.post);

        const getPostAuthor = async () => {
          const user = await fetchOneUser(props.post.data.author);
          setPostAuthor(user);
        }
        getPostAuthor();
    }, [props.post])

    const addCommentToPost = async () => {
      await addComment(uid, props.post, commentContent);
      setCommentsAmount(state => state + 1);
      setCommentContent("");
    }

    const checkProfile = (user) => {
      navigate(`/${user}`, { replace: true });
      window.location.reload();
    }

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

    const handlePreviewTrigger = () => {
      setPreviewTrigger(oldState => !oldState);
    }

  return (
    <div className='mainpage--post'>
                {previewTrigger && <PostPreview handleTrigger={handlePreviewTrigger} post={props.post}/>}
                <div className='mainpage--author'>
                    <img src={postAuthor !== null ? postAuthor.data.picture : storyimg}></img>
                    <p onClick={() => {checkProfile(props.post.data.author)}}>{props.post.data.author}</p>
                    <i className="fa-solid fa-ellipsis fa-xl"></i>
                </div>

                <div className='mainpage--image'>
                    <img src={props.post.data.imgurl}></img>
                </div>

                <div className='mainpage--options'>
                  <i className={!liked ? "fa-regular fa-heart fa-xl" : "fa-solid fa-heart fa-xl red--heart"} onClick={handleLike}></i>
                  <i className="fa-regular fa-comment fa-xl"></i>
                  <i className="fa-regular fa-paper-plane fa-xl"></i>
                  <div className="mainpage--bookmark">
                    <i className="fa-regular fa-bookmark fa-xl"></i>
                  </div>
                </div>

                <div className='mainpage--likes'>
                  <p>Liczba polubień: {likesAmount}</p>
                </div>

                <div className='mainpage--comments'>
                  <p className='bold'>{props.post.data.author}</p>
                  <p>{props.post.data.description}</p>
                </div>

                <div className='mainpage--morecomments'>
                  <span onClick={handlePreviewTrigger}>Zobacz wszystkie komentarze: {commentsAmount}</span>
                </div>

                <div className='mainpage--date'>
                  <span>{postDate}</span>
                </div>
                <hr></hr>
                <div className='mainpage--addcomment'>
                  <i className="fa-regular fa-face-smile fa-2x"></i>
                  <input type="text" value={commentContent} placeholder='Dodaj komentarz...' onChange={e => setCommentContent(e.target.value)}></input>
                  <button onClick={addCommentToPost}>Opublikuj</button>
                </div>
            </div>
  )
}
