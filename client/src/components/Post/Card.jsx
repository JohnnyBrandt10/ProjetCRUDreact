import React from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../FormatDate';
import FolloeHandler from '../Profile/FolloeHandler';
import Like from './Like';

export default function Card({ post }) {
  const usersData = useSelector((state) => state.user.users);
  //const userData = useSelector((state) => state.user.user);

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
                    else return null
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
                      else return null
                    })}
                </h3>
                {post.posterID !== usersData._id && (
                  <FolloeHandler idToFollow={post.posterID} type={'card'} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            <p>{post.message}</p>
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
            <div className="card-footer">
                <div className="comment-icon">
                    <img src="./img/icons/message1.svg" alt="comment" />
                    <span>{post.comments.length}</span>
                </div>
                <Like post={post}/>
                <img src="./img/icons/share.svg" alt="share" />
            </div>
          </div>
        </>
      )}
    </li>
  );
}
