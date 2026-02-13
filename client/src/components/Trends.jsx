import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from './FormatDate';
import { getTrends } from '../../reducers/trend.slice';
import { NavLink } from 'react-router-dom';

export default function Trends() {
  const usersData = useSelector((state) => state.user.users);
  const trends = useSelector((state) => state.trend.trends);
  const posts = useSelector((state) => state.post.allPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      const sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 3;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink to="/trending">
        <ul>
          {trends.length &&
            trends.map((post) => {
              return (
                <li key={post._id}>
                  <div>
                    {post.picture && (
                      <img src={post.picture} alt="trending-pic" />
                    )}
                    {post.video && (
                      <iframe
                        width="500"
                        height="300"
                        src={post.video}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                        title={post._id}
                      ></iframe>
                    )}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                        <img src={usersData[0] && usersData.map((user) => {
                            if (user._id === post.posterID) return user.picture;
                            else return null;
                        }).join("")} alt="trend-pic"/>
                    )}
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                    <span>Like{post.likers.length > 1 ? 's' : ''}: {post.likers.length}</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
}
