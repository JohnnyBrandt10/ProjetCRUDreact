import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../reducers/post.slice';
import { isEmpty } from './FormatDate';
import Card from './Post/Card';

export default function Thread() {
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setCount((prev) => prev + 5);
    }
  };

  useEffect(() => {
    dispatch(getPosts(count));
  }, [count, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, []);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => (
            <Card post={post} key={post._id} />
          ))}
      </ul>
    </div>
  );
}
