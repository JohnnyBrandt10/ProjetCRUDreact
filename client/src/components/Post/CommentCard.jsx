import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../FormatDate';

export default function CommentCard({ post }) {
  const [text, setText] = useState('');
  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const handleComments = () => {};

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
          </div>
        );
      })}
    </div>
  );
}
