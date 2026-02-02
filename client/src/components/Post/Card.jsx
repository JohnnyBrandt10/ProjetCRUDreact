import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../FormatDate';
import FolloeHandler from '../Profile/FolloeHandler';
import Like from './Like';
import { updatePost } from '../../../reducers/post.slice';
import DeleteCard from './DeleteCard';
import CommentCard from './CommentCard';

export default function Card({ post }) {
  const usersData = useSelector((state) => state.user.users);
  const [isUpdated, setIsUpdate] = useState(false);
  const [textUpdated, setTextUpdated] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const updateItem = async () => {
    if (textUpdated) {
      dispatch(updatePost({ postId: post._id, message: textUpdated }));
    }
    setIsUpdate(false);
  };

  const isLoading = isEmpty(usersData[0]);

  return (
    <li key={post._id} className="card-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterID) return user.picture;
                    else return null;
                  })
                  .join('')
              }
              alt="user"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterID) return user.pseudo;
                      else return null;
                    })}
                </h3>
                {post.posterID !== userData?._id && (
                  <FolloeHandler idToFollow={post.posterID} type={'card'} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated === true && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdated(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="post-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {userData?._id === post.posterID && (
              <div className="button-container">
                <div onClick={() => setIsUpdate(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <Like post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CommentCard post={post} />}
          </div>
        </>
      )}
    </li>
  );
}
