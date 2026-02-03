import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestamp } from '../FormatDate';
import FollowHandler from '../Profile/FolloeHandler';
import { addComment } from '../../../reducers/post.slice';
import EditDeleteComment from './EditDeleteComment';

export default function CommentCard({ post }) {
  const [text, setText] = useState('');
  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const handleComments = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        addComment({
          postId: post._id,
          commenterID: userData?._id,
          commenterPseudo: userData?.pseudo,
          text: text
        })
      );
      setText('');
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterID === userData?._id
                ? 'comment-container client'
                : 'comment-container'
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterID) return user.picture;
                      else return null;
                    })
                    .join('')
                }
                alt="comment-user"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterID !== userData?._id && (
                    <FollowHandler idToFollow={comment.commenterID} type={"card"}/>
                  )}
                </div>
                <span>{timestamp(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData?._id && (
        <form action="" onSubmit={handleComments} className='comment-form'>
          <input
            type="text"
            placeholder="Commenter..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
}
