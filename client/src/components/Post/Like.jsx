import React, { useContext } from 'react'
import { UserContext } from '../AppContext';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../../reducers/post.slice';

export default function Like({ post }) {
  const uid = useContext(UserContext);
  const dispatch = useDispatch();

  const liked = post.likers.includes(uid);

  const like = () => {
    dispatch(likePost({ postId: post._id, userId: uid }));
  };

  const unlike = () => {
    dispatch(unlikePost({ postId: post._id, userId: uid }));
  };

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}

      {uid && !liked && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}

      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}

      <span>{post.likers.length}</span>
    </div>
  );
}
